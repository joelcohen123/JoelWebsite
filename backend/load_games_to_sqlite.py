import os
import csv
import sqlite3
from glob import glob

DATA_DIR = os.path.join(os.path.dirname(__file__), 'data')
DB_PATH = os.path.join(os.path.dirname(__file__), 'nfl_matchup.db')

COLUMNS = [
    'season', 'week', 'date', 'home_team', 'away_team',
    'home_score', 'away_score', 'location', 'result_type'
]

def normalize_row(row, season):
    # PFR CSV format: Week,Day,Date,Time,Winner/tie,(blank),Loser/tie,(blank),Pts,Pts,YdsW,TOW,YdsL,TOL
    # Use list(row.values()) to get values by index
    values = list(row.values())
    
    if len(values) < 10:
        return None
    
    week = values[0] if len(values) > 0 else ''
    date = values[2] if len(values) > 2 else ''
    winner = values[4] if len(values) > 4 else ''
    away_indicator = values[5] if len(values) > 5 else ''
    loser = values[6] if len(values) > 6 else ''
    winner_pts = values[8] if len(values) > 8 else ''
    loser_pts = values[9] if len(values) > 9 else ''
    
    # Skip if missing teams
    if not winner or not loser:
        return None
    
    # Determine home/away based on away indicator
    if away_indicator == '@':
        home_team = loser
        away_team = winner
        home_score = loser_pts
        away_score = winner_pts
    else:
        home_team = winner
        away_team = loser
        home_score = winner_pts
        away_score = loser_pts
    
    # Convert scores to integers, handle missing scores
    try:
        home_score_int = int(home_score) if home_score and home_score.isdigit() else None
        away_score_int = int(away_score) if away_score and away_score.isdigit() else None
    except (ValueError, TypeError):
        home_score_int = None
        away_score_int = None
    
    # Determine result type
    result_type = 'final' if home_score_int is not None and away_score_int is not None else 'scheduled'
    
    return {
        'season': season,
        'week': week,
        'date': date,
        'home_team': home_team,
        'away_team': away_team,
        'home_score': home_score_int,
        'away_score': away_score_int,
        'location': '',
        'result_type': result_type
    }

def main():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute(f"""
        CREATE TABLE IF NOT EXISTS games (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            season TEXT,
            week TEXT,
            date TEXT,
            home_team TEXT,
            away_team TEXT,
            home_score INTEGER,
            away_score INTEGER,
            location TEXT,
            result_type TEXT
        )
    """)
    conn.commit()

    # Remove all existing games (idempotent load)
    c.execute("DELETE FROM games")
    conn.commit()

    csv_files = glob(os.path.join(DATA_DIR, '*.csv'))
    summary = {}
    for csv_file in csv_files:
        season = None
        if 'games_' in csv_file:
            season = os.path.basename(csv_file).split('_')[-1].replace('.csv', '')
        elif 'schedule_' in csv_file:
            season = os.path.basename(csv_file).split('_')[-1].replace('.csv', '')
        else:
            season = 'unknown'
        
        print(f"Processing {os.path.basename(csv_file)} for season {season}")
        
        with open(csv_file, newline='', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            count = 0
            for row in reader:
                norm = normalize_row(row, season)
                if not norm:
                    continue
                c.execute(f"""
                    INSERT INTO games (season, week, date, home_team, away_team, home_score, away_score, location, result_type)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, [norm[k] for k in COLUMNS])
                count += 1
            print(f"Loaded {count} games from {os.path.basename(csv_file)}")
            summary[season] = count
            conn.commit()
    
    print("\nLoaded games per season:")
    for season, count in summary.items():
        print(f"  {season}: {count} games")
    
    # Verify teams are loaded
    c.execute("SELECT DISTINCT home_team FROM games WHERE home_team IS NOT NULL AND home_team != ''")
    home_teams = [row[0] for row in c.fetchall()]
    print(f"\nFound {len(home_teams)} unique home teams")
    if home_teams:
        print("Sample teams:", home_teams[:5])
    
    conn.close()

if __name__ == '__main__':
    main() 