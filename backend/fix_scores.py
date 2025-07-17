import os
import csv
import sqlite3
from glob import glob

DATA_DIR = os.path.join(os.path.dirname(__file__), 'data')
DB_PATH = os.path.join(os.path.dirname(__file__), 'nfl_matchup.db')

def fix_scores():
    """Fix the incorrect scores in the database by re-parsing CSV data correctly."""
    
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    
    # Clear existing data
    c.execute("DELETE FROM games")
    conn.commit()
    
    csv_files = glob(os.path.join(DATA_DIR, '*.csv'))
    
    for csv_file in csv_files:
        season = None
        if 'games_' in csv_file:
            season = os.path.basename(csv_file).split('_')[-1].replace('.csv', '')
        elif 'schedule_' in csv_file:
            season = os.path.basename(csv_file).split('_')[-1].replace('.csv', '')
        else:
            continue  # Skip non-game files
        
        print(f"Processing {os.path.basename(csv_file)} for season {season}")
        
        with open(csv_file, newline='', encoding='utf-8') as f:
            reader = csv.reader(f)
            next(reader)  # Skip header
            
            count = 0
            for row in reader:
                if len(row) < 10:
                    continue
                
                try:
                    week = row[0]
                    date = row[2]
                    winner = row[4]
                    away_indicator = row[5] if len(row) > 5 else ''
                    loser = row[6]
                    winner_pts = row[8]
                    loser_pts = row[9]
                    
                    # Skip if missing teams
                    if not winner or not loser:
                        continue
                    
                    # Determine home/away based on away indicator
                    if away_indicator == '@':
                        home_team = loser
                        away_team = winner
                        home_score = int(loser_pts) if loser_pts.isdigit() else None
                        away_score = int(winner_pts) if winner_pts.isdigit() else None
                    else:
                        home_team = winner
                        away_team = loser
                        home_score = int(winner_pts) if winner_pts.isdigit() else None
                        away_score = int(loser_pts) if loser_pts.isdigit() else None
                    
                    # Skip if scores are invalid
                    if home_score is None or away_score is None:
                        continue
                    
                    # Determine result type
                    result_type = 'final'
                    
                    c.execute("""
                        INSERT INTO games (season, week, date, home_team, away_team, home_score, away_score, location, result_type)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """, (season, week, date, home_team, away_team, home_score, away_score, '', result_type))
                    
                    count += 1
                    
                except (ValueError, IndexError) as e:
                    print(f"Error processing row: {row}, Error: {e}")
                    continue
            
            print(f"Loaded {count} games from {os.path.basename(csv_file)}")
            conn.commit()
    
    # Verify the fix
    print("\nVerifying scores...")
    c.execute("SELECT home_team, away_team, home_score, away_score FROM games WHERE home_score > 50 OR away_score > 50 LIMIT 5")
    high_scores = c.fetchall()
    print("Games with scores > 50:")
    for game in high_scores:
        print(f"  {game[0]} vs {game[1]}: {game[2]}-{game[3]}")
    
    # Show some correct scores
    print("\nSample correct scores:")
    c.execute("SELECT home_team, away_team, home_score, away_score FROM games LIMIT 5")
    sample_scores = c.fetchall()
    for game in sample_scores:
        print(f"  {game[0]} vs {game[1]}: {game[2]}-{game[3]}")
    
    conn.close()
    print("\nScore fix completed!")

if __name__ == "__main__":
    fix_scores() 