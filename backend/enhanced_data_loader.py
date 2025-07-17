import sqlite3
import pandas as pd
import os
from datetime import datetime
import numpy as np

def create_enhanced_database():
    """Create enhanced database with advanced statistics."""
    
    # Create new enhanced database
    conn = sqlite3.connect('nfl_enhanced.db')
    cursor = conn.cursor()
    
    # Create enhanced games table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS enhanced_games (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            season TEXT,
            week TEXT,
            date TEXT,
            home_team TEXT,
            away_team TEXT,
            home_score INTEGER,
            away_score INTEGER,
            location TEXT,
            result_type TEXT,
            total_points INTEGER,
            point_differential INTEGER,
            home_win BOOLEAN,
            high_scoring BOOLEAN,
            low_scoring BOOLEAN,
            close_game BOOLEAN
        )
    ''')
    
    # Create team statistics table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS team_stats (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            team TEXT,
            season TEXT,
            games_played INTEGER,
            wins INTEGER,
            losses INTEGER,
            points_for INTEGER,
            points_against INTEGER,
            avg_points_for REAL,
            avg_points_against REAL,
            home_wins INTEGER,
            home_losses INTEGER,
            away_wins INTEGER,
            away_losses INTEGER,
            last_5_games TEXT,  -- JSON string of last 5 results
            current_streak INTEGER,
            avg_total_points REAL
        )
    ''')
    
    # Create play-by-play statistics table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS play_stats (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            game_id TEXT,
            team TEXT,
            season TEXT,
            total_plays INTEGER,
            rushing_plays INTEGER,
            passing_plays INTEGER,
            total_yards INTEGER,
            rushing_yards INTEGER,
            passing_yards INTEGER,
            turnovers INTEGER,
            sacks INTEGER,
            third_down_conversions INTEGER,
            third_down_attempts INTEGER,
            red_zone_conversions INTEGER,
            red_zone_attempts INTEGER
        )
    ''')
    
    conn.commit()
    return conn

def load_enhanced_game_data():
    """Load and enhance game data with additional statistics."""
    
    conn = create_enhanced_database()
    cursor = conn.cursor()
    
    # Load existing games data
    existing_conn = sqlite3.connect('nfl_matchup.db')
    games_df = pd.read_sql_query("SELECT * FROM games WHERE season != 'unknown'", existing_conn)
    existing_conn.close()
    
    enhanced_games = []
    
    for _, game in games_df.iterrows():
        home_score = game['home_score'] or 0
        away_score = game['away_score'] or 0
        total_points = home_score + away_score
        point_diff = abs(home_score - away_score)
        
        enhanced_game = {
            'season': game['season'],
            'week': game['week'],
            'date': game['date'],
            'home_team': game['home_team'],
            'away_team': game['away_team'],
            'home_score': home_score,
            'away_score': away_score,
            'location': game['location'],
            'result_type': game['result_type'],
            'total_points': total_points,
            'point_differential': point_diff,
            'home_win': home_score > away_score,
            'high_scoring': total_points >= 50,
            'low_scoring': total_points <= 40,
            'close_game': point_diff <= 7
        }
        enhanced_games.append(enhanced_game)
    
    # Insert enhanced games
    for game in enhanced_games:
        cursor.execute('''
            INSERT INTO enhanced_games 
            (season, week, date, home_team, away_team, home_score, away_score, 
             location, result_type, total_points, point_differential, home_win, 
             high_scoring, low_scoring, close_game)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            game['season'], game['week'], game['date'], game['home_team'], 
            game['away_team'], game['home_score'], game['away_score'], 
            game['location'], game['result_type'], game['total_points'], 
            game['point_differential'], game['home_win'], game['high_scoring'], 
            game['low_scoring'], game['close_game']
        ))
    
    conn.commit()
    print(f"Loaded {len(enhanced_games)} enhanced games")
    
    return conn

def calculate_team_statistics():
    """Calculate comprehensive team statistics."""
    
    conn = sqlite3.connect('nfl_enhanced.db')
    cursor = conn.cursor()
    
    # Get all teams
    cursor.execute("SELECT DISTINCT home_team FROM enhanced_games")
    teams = [row[0] for row in cursor.fetchall()]
    
    for team in teams:
        for season in ['2019', '2020', '2021', '2022', '2023', '2024']:
            # Get all games for this team in this season
            cursor.execute('''
                SELECT * FROM enhanced_games 
                WHERE (home_team = ? OR away_team = ?) AND season = ?
                ORDER BY date
            ''', (team, team, season))
            
            games = cursor.fetchall()
            
            if not games:
                continue
            
            wins = 0
            losses = 0
            home_wins = 0
            home_losses = 0
            away_wins = 0
            away_losses = 0
            points_for = 0
            points_against = 0
            total_points_list = []
            
            for game in games:
                home_team = game[4]
                away_team = game[5]
                home_score = game[6]
                away_score = game[7]
                total_points = game[10]
                
                # Determine if team won
                if home_team == team:
                    if home_score > away_score:
                        wins += 1
                        home_wins += 1
                    else:
                        losses += 1
                        home_losses += 1
                    points_for += home_score
                    points_against += away_score
                else:
                    if away_score > home_score:
                        wins += 1
                        away_wins += 1
                    else:
                        losses += 1
                        away_losses += 1
                    points_for += away_score
                    points_against += home_score
                
                total_points_list.append(total_points)
            
            # Calculate last 5 games
            last_5_results = []
            for game in games[-5:]:
                home_team = game[4]
                away_team = game[5]
                home_score = game[6]
                away_score = game[7]
                
                if home_team == team:
                    last_5_results.append('W' if home_score > away_score else 'L')
                else:
                    last_5_results.append('W' if away_score > home_score else 'L')
            
            # Calculate current streak
            current_streak = 0
            for result in reversed(last_5_results):
                if result == last_5_results[-1]:
                    current_streak += 1 if result == 'W' else -1
                else:
                    break
            
            # Insert team stats
            cursor.execute('''
                INSERT OR REPLACE INTO team_stats 
                (team, season, games_played, wins, losses, points_for, points_against,
                 avg_points_for, avg_points_against, home_wins, home_losses, away_wins,
                 away_losses, last_5_games, current_streak, avg_total_points)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                team, season, len(games), wins, losses, points_for, points_against,
                round(points_for / len(games), 1), round(points_against / len(games), 1),
                home_wins, home_losses, away_wins, away_losses,
                ','.join(last_5_results), current_streak,
                round(np.mean(total_points_list), 1)
            ))
    
    conn.commit()
    print(f"Calculated statistics for {len(teams)} teams across 6 seasons")
    
    return conn

def load_play_by_play_data():
    """Load play-by-play data for advanced statistics."""
    
    conn = sqlite3.connect('nfl_enhanced.db')
    
    # Load 2024 play-by-play data
    pbp_file = 'data/pbp-2024.csv'
    if os.path.exists(pbp_file):
        print("Loading play-by-play data...")
        pbp_df = pd.read_csv(pbp_file)
        
        # Group by game and team to calculate play statistics
        game_stats = pbp_df.groupby(['GameId', 'OffenseTeam']).agg({
            'IsRush': 'sum',
            'IsPass': 'sum',
            'Yards': 'sum',
            'IsInterception': 'sum',
            'IsFumble': 'sum',
            'IsSack': 'sum',
            'IsTouchdown': 'sum'
        }).reset_index()
        
        # Add to database
        for _, row in game_stats.iterrows():
            conn.execute('''
                INSERT INTO play_stats 
                (game_id, team, season, total_plays, rushing_plays, passing_plays, total_yards)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ''', (
                row['GameId'], row['OffenseTeam'], '2024',
                row['IsRush'] + row['IsPass'], row['IsRush'], row['IsPass'], row['Yards']
            ))
        
        conn.commit()
        print("Loaded play-by-play statistics")
    
    return conn

if __name__ == "__main__":
    print("Creating enhanced NFL database...")
    
    # Load enhanced game data
    conn = load_enhanced_game_data()
    
    # Calculate team statistics
    calculate_team_statistics()
    
    # Load play-by-play data
    load_play_by_play_data()
    
    print("Enhanced database created successfully!")
    print("Database: nfl_enhanced.db")
    
    # Show some sample data
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM enhanced_games")
    print(f"Total enhanced games: {cursor.fetchone()[0]}")
    
    cursor.execute("SELECT COUNT(*) FROM team_stats")
    print(f"Total team stat records: {cursor.fetchone()[0]}")
    
    conn.close() 