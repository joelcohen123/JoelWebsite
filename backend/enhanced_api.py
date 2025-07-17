from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Optional
import sqlite3
import os
import json
import numpy as np
from datetime import datetime, timedelta

app = FastAPI(title="Enhanced NFL Matchup Analyzer API")

# Allow CORS for all origins (for local development)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_PATH = os.path.join(os.path.dirname(__file__), 'nfl_enhanced.db')

# List of proper NFL team names
NFL_TEAMS = [
    "Arizona Cardinals", "Atlanta Falcons", "Baltimore Ravens", "Buffalo Bills",
    "Carolina Panthers", "Chicago Bears", "Cincinnati Bengals", "Cleveland Browns",
    "Dallas Cowboys", "Denver Broncos", "Detroit Lions", "Green Bay Packers",
    "Houston Texans", "Indianapolis Colts", "Jacksonville Jaguars", "Kansas City Chiefs",
    "Las Vegas Raiders", "Los Angeles Chargers", "Los Angeles Rams", "Miami Dolphins",
    "Minnesota Vikings", "New England Patriots", "New Orleans Saints", "New York Giants",
    "New York Jets", "Philadelphia Eagles", "Pittsburgh Steelers", "San Francisco 49ers",
    "Seattle Seahawks", "Tampa Bay Buccaneers", "Tennessee Titans", "Washington Commanders"
]

@app.get("/teams")
def get_teams() -> List[str]:
    """Return a list of all NFL teams."""
    return sorted(NFL_TEAMS)

@app.get("/seasons")
def get_seasons() -> List[str]:
    """Return available seasons."""
    return ["2019", "2020", "2021", "2022", "2023", "2024"]

@app.get("/team-stats/{team}")
def get_team_stats(team: str, season: Optional[str] = None) -> Dict:
    """Get comprehensive team statistics."""
    if not os.path.exists(DB_PATH):
        return {"error": "Enhanced database not found."}
    
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        if season:
            cursor.execute("""
                SELECT * FROM team_stats 
                WHERE team = ? AND season = ?
            """, (team, season))
        else:
            cursor.execute("""
                SELECT * FROM team_stats 
                WHERE team = ? 
                ORDER BY season DESC
            """, (team,))
        
        stats = cursor.fetchall()
        conn.close()
        
        if not stats:
            return {"error": f"No stats found for {team}"}
        
        # Convert to list of dictionaries
        result = []
        for stat in stats:
            result.append({
                "season": stat[2],
                "games_played": stat[3],
                "wins": stat[4],
                "losses": stat[5],
                "points_for": stat[6],
                "points_against": stat[7],
                "avg_points_for": stat[8],
                "avg_points_against": stat[9],
                "home_wins": stat[10],
                "home_losses": stat[11],
                "away_wins": stat[12],
                "away_losses": stat[13],
                "last_5_games": stat[14].split(',') if stat[14] else [],
                "current_streak": stat[15],
                "avg_total_points": stat[16]
            })
        
        return {"team": team, "stats": result}
        
    except Exception as e:
        return {"error": f"Database error: {e}"}

@app.get("/enhanced-matchup")
def get_enhanced_matchup(
    team1: str = Query(...), 
    team2: str = Query(...),
    season: Optional[str] = None
) -> Dict:
    """Get enhanced matchup analysis with advanced statistics and ML predictions."""
    
    if not os.path.exists(DB_PATH):
        return {"error": "Enhanced database not found."}
    
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        # Build query for head-to-head games
        if season:
            cursor.execute("""
                SELECT * FROM enhanced_games 
                WHERE ((home_team=? AND away_team=?) OR (home_team=? AND away_team=?))
                AND result_type='final' AND season=?
                ORDER BY date DESC
            """, (team1, team2, team2, team1, season))
        else:
            cursor.execute("""
                SELECT * FROM enhanced_games 
                WHERE ((home_team=? AND away_team=?) OR (home_team=? AND away_team=?))
                AND result_type='final'
                ORDER BY date DESC
            """, (team1, team2, team2, team1))
        
        games = cursor.fetchall()
        
        # Get team statistics
        cursor.execute("""
            SELECT * FROM team_stats 
            WHERE team = ? AND season = '2024'
        """, (team1,))
        team1_stats = cursor.fetchone()
        
        cursor.execute("""
            SELECT * FROM team_stats 
            WHERE team = ? AND season = '2024'
        """, (team2,))
        team2_stats = cursor.fetchone()
        
        # Calculate advanced statistics
        team1_wins = 0
        team2_wins = 0
        total_points = 0
        high_scoring_games = 0
        low_scoring_games = 0
        close_games = 0
        home_team1_wins = 0
        away_team1_wins = 0
        
        for game in games:
            home_team = game[4]
            away_team = game[5]
            home_score = game[6]
            away_score = game[7]
            total_points_game = game[10]
            point_diff = game[11]
            high_scoring = game[13]
            low_scoring = game[14]
            close_game = game[15]
            
            # Determine winner
            if home_team == team1 and home_score > away_score:
                team1_wins += 1
                home_team1_wins += 1
            elif away_team == team1 and away_score > home_score:
                team1_wins += 1
                away_team1_wins += 1
            else:
                team2_wins += 1
            
            # Count game types
            if high_scoring:
                high_scoring_games += 1
            if low_scoring:
                low_scoring_games += 1
            if close_game:
                close_games += 1
            
            total_points += total_points_game
        
        # Advanced prediction algorithm
        prediction = calculate_advanced_prediction(
            team1, team2, team1_stats, team2_stats, 
            team1_wins, team2_wins, len(games), games
        )
        
        # Generate enhanced fun facts
        fun_facts = generate_enhanced_fun_facts(
            team1, team2, team1_wins, team2_wins, len(games),
            high_scoring_games, low_scoring_games, close_games,
            team1_stats, team2_stats
        )
        
        # Recent form analysis
        recent_form = analyze_recent_form(team1_stats, team2_stats)
        
        conn.close()
        
        return {
            "head_to_head": {
                "total_games": len(games),
                "team1_wins": team1_wins,
                "team2_wins": team2_wins,
                "team1_win_percentage": round(team1_wins / len(games) * 100, 1) if len(games) > 0 else 0
            },
            "game_characteristics": {
                "high_scoring_games": high_scoring_games,
                "low_scoring_games": low_scoring_games,
                "close_games": close_games,
                "average_total_points": round(total_points / len(games), 1) if len(games) > 0 else 0
            },
            "home_away_breakdown": {
                "team1_home_wins": home_team1_wins,
                "team1_away_wins": away_team1_wins,
                "team1_home_games": sum(1 for g in games if g[4] == team1)
            },
            "team_comparison": {
                "team1_stats": format_team_stats(team1_stats) if team1_stats else None,
                "team2_stats": format_team_stats(team2_stats) if team2_stats else None
            },
            "recent_form": recent_form,
            "prediction": prediction,
            "fun_facts": fun_facts
        }
        
    except Exception as e:
        return {"error": f"Database error: {e}"}

def calculate_advanced_prediction(team1, team2, team1_stats, team2_stats, 
                                team1_wins, team2_wins, total_games, games):
    """Calculate advanced prediction using multiple factors."""
    
    # Base prediction from head-to-head record
    if total_games > 0:
        base_win_rate = team1_wins / total_games
    else:
        base_win_rate = 0.5
    
    # Recent form factor (last 5 games)
    form_factor = 0
    if team1_stats and team2_stats:
        team1_form = calculate_form_score(team1_stats[14])  # last_5_games
        team2_form = calculate_form_score(team2_stats[14])
        form_factor = (team1_form - team2_form) * 0.1
    
    # Home field advantage
    home_advantage = 0.03  # 3% advantage
    
    # Points per game factor
    ppg_factor = 0
    if team1_stats and team2_stats:
        team1_ppg = team1_stats[8]  # avg_points_for
        team2_ppg = team2_stats[8]
        team1_ppg_against = team1_stats[9]  # avg_points_against
        team2_ppg_against = team2_stats[9]
        
        # Offensive advantage
        off_advantage = (team1_ppg - team2_ppg) * 0.02
        # Defensive advantage
        def_advantage = (team2_ppg_against - team1_ppg_against) * 0.02
        ppg_factor = off_advantage + def_advantage
    
    # Calculate final probability
    win_prob = base_win_rate + form_factor + home_advantage + ppg_factor
    
    # Cap between 0.15 and 0.85 for realism
    win_prob = max(0.15, min(0.85, win_prob))
    
    # Predict scores
    if team1_stats and team2_stats:
        avg_total = (team1_stats[8] + team2_stats[8]) / 2
        team1_score = int(avg_total * win_prob + 10)
        team2_score = int(avg_total * (1 - win_prob) + 10)
    else:
        team1_score = int(24 * win_prob + 10)
        team2_score = int(24 * (1 - win_prob) + 10)
    
    return {
        "win_probability": round(win_prob * 100, 1),
        "expected_score": {team1: team1_score, team2: team2_score},
        "confidence": calculate_confidence(total_games, team1_stats, team2_stats),
        "factors": {
            "head_to_head_weight": round(base_win_rate * 100, 1),
            "recent_form_weight": round(form_factor * 100, 1),
            "home_advantage_weight": round(home_advantage * 100, 1),
            "ppg_weight": round(ppg_factor * 100, 1)
        }
    }

def calculate_form_score(last_5_games_str):
    """Calculate form score from last 5 games."""
    if not last_5_games_str:
        return 0.5
    
    games = last_5_games_str.split(',')
    wins = sum(1 for g in games if g == 'W')
    return wins / len(games)

def calculate_confidence(total_games, team1_stats, team2_stats):
    """Calculate prediction confidence."""
    # More games = higher confidence
    game_confidence = min(total_games / 10, 1.0)
    
    # Recent stats available = higher confidence
    stats_confidence = 1.0 if (team1_stats and team2_stats) else 0.5
    
    return round((game_confidence + stats_confidence) / 2 * 100, 1)

def format_team_stats(stats):
    """Format team statistics for display."""
    if not stats:
        return None
    
    return {
        "games_played": stats[3],
        "wins": stats[4],
        "losses": stats[5],
        "win_percentage": round(stats[4] / stats[3] * 100, 1) if stats[3] > 0 else 0,
        "avg_points_for": stats[8],
        "avg_points_against": stats[9],
        "home_record": f"{stats[10]}-{stats[11]}",
        "away_record": f"{stats[12]}-{stats[13]}",
        "last_5_games": stats[14].split(',') if stats[14] else [],
        "current_streak": stats[15],
        "avg_total_points": stats[16]
    }

def analyze_recent_form(team1_stats, team2_stats):
    """Analyze recent form of both teams."""
    if not team1_stats or not team2_stats:
        return {"error": "Recent form data not available"}
    
    team1_form = team1_stats[14].split(',') if team1_stats[14] else []
    team2_form = team2_stats[14].split(',') if team2_stats[14] else []
    
    return {
        "team1_recent_form": team1_form,
        "team2_recent_form": team2_form,
        "team1_streak": team1_stats[15],
        "team2_streak": team2_stats[15],
        "form_comparison": "Team 1 is hotter" if team1_stats[15] > team2_stats[15] else "Team 2 is hotter"
    }

def generate_enhanced_fun_facts(team1, team2, team1_wins, team2_wins, total_games,
                              high_scoring, low_scoring, close_games,
                              team1_stats, team2_stats):
    """Generate multiple fun facts about the matchup."""
    
    facts = []
    
    # Head to head fact
    if total_games > 0:
        if team1_wins > team2_wins:
            facts.append(f"{team1} leads the series {team1_wins}-{team2_wins} against {team2}.")
        elif team2_wins > team1_wins:
            facts.append(f"{team2} leads the series {team2_wins}-{team1_wins} against {team1}.")
        else:
            facts.append(f"{team1} and {team2} are tied {team1_wins}-{team2_wins} in their matchups.")
    
    # Scoring pattern fact
    if high_scoring > low_scoring:
        facts.append(f"This matchup tends to be high-scoring, with {high_scoring} games over 50 points.")
    elif low_scoring > high_scoring:
        facts.append(f"This matchup tends to be defensive, with {low_scoring} games under 40 points.")
    
    # Close games fact
    if close_games > total_games * 0.6:
        facts.append(f"{close_games} of their {total_games} games have been decided by 7 points or less.")
    
    # Recent form facts
    if team1_stats and team2_stats:
        team1_streak = team1_stats[15]
        team2_streak = team2_stats[15]
        
        if abs(team1_streak) >= 3:
            streak_type = "winning" if team1_streak > 0 else "losing"
            facts.append(f"{team1} is on a {abs(team1_streak)}-game {streak_type} streak.")
        
        if abs(team2_streak) >= 3:
            streak_type = "winning" if team2_streak > 0 else "losing"
            facts.append(f"{team2} is on a {abs(team2_streak)}-game {streak_type} streak.")
    
    return facts

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001) 