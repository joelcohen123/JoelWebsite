from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Optional
import sqlite3
import os

app = FastAPI(title="NFL Matchup Analyzer API")

# Allow CORS for all origins (for local development)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_PATH = os.path.join(os.path.dirname(__file__), 'nfl_matchup.db')

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

@app.get("/matchup")
def get_matchup(team1: str = Query(...), team2: str = Query(...)) -> Dict:
    """Get matchup data between two teams."""
    if not os.path.exists(DB_PATH):
        return {"error": "Database not found. Run the data loader first."}
    
    try:
        conn = sqlite3.connect(DB_PATH)
        c = conn.cursor()
        
        # Get head-to-head games
        c.execute("""
            SELECT * FROM games 
            WHERE ((home_team=? AND away_team=?) OR (home_team=? AND away_team=?))
            AND result_type='final'
            ORDER BY date DESC
        """, (team1, team2, team2, team1))
        games = c.fetchall()
        
        # Calculate stats
        team1_wins = 0
        team2_wins = 0
        total_points = 0
        high_scoring_games = 0  # Games with 50+ total points
        low_scoring_games = 0   # Games with under 40 total points
        
        for game in games:
            home_team = game[4]
            away_team = game[5]
            home_score = game[6] or 0
            away_score = game[7] or 0
            
            # Determine winner
            if home_team == team1 and home_score > away_score:
                team1_wins += 1
            elif away_team == team1 and away_score > home_score:
                team1_wins += 1
            else:
                team2_wins += 1
            
            # Count scoring patterns
            game_total = home_score + away_score
            if game_total >= 50:
                high_scoring_games += 1
            elif game_total <= 40:
                low_scoring_games += 1
            
            total_points += game_total
        
        # Home/away stats for team1
        c.execute("""
            SELECT COUNT(*) FROM games 
            WHERE home_team=? AND away_team=? AND result_type='final'
        """, (team1, team2))
        team1_home_games = c.fetchone()[0]
        
        c.execute("""
            SELECT COUNT(*) FROM games 
            WHERE home_team=? AND away_team=? AND home_score > away_score AND result_type='final'
        """, (team1, team2))
        team1_home_wins = c.fetchone()[0]
        
        # Generate fun fact
        if len(games) > 0:
            if team1_wins > team2_wins:
                fun_fact = f"{team1} has won {team1_wins} of the last {len(games)} matchups vs {team2}."
            elif team2_wins > team1_wins:
                fun_fact = f"{team2} has won {team2_wins} of the last {len(games)} matchups vs {team1}."
            else:
                fun_fact = f"{team1} and {team2} are tied {team1_wins}-{team2_wins} in their last {len(games)} matchups."
        else:
            fun_fact = f"No previous matchups found between {team1} and {team2}."
        
        # Improved prediction calculation
        if len(games) > 0:
            # Base win probability on historical record but cap it realistically
            base_win_rate = team1_wins / len(games)
            
            # Add small home field advantage if team1 is typically home
            home_advantage = 0.05 if team1_home_games > len(games) / 2 else 0
            
            # Cap the probability between 0.25 and 0.75 for realism
            win_prob = max(0.25, min(0.75, base_win_rate + home_advantage))
            
            # Calculate average points per game
            avg_points_per_game = total_points / len(games)
            
            # Predict scores based on average with some variance
            team1_score = int(avg_points_per_game / 2 + (win_prob - 0.5) * 10)
            team2_score = int(avg_points_per_game / 2 - (win_prob - 0.5) * 10)
            
            # Ensure minimum scores
            team1_score = max(10, team1_score)
            team2_score = max(10, team2_score)
        else:
            # Default prediction for teams with no history
            win_prob = 0.5
            team1_score = 24
            team2_score = 21
        
        conn.close()
        
        return {
            "head_to_head": {
                "total_games": len(games),
                "team1_wins": team1_wins,
                "team2_wins": team2_wins
            },
            "home_away": {
                "team1_home_games": team1_home_games,
                "team1_home_wins": team1_home_wins
            },
            "scoring_trends": {
                "high_scoring_games": high_scoring_games,  # 50+ points
                "low_scoring_games": low_scoring_games,    # Under 40 points
                "average_total_points": round(total_points / len(games), 1) if len(games) > 0 else 0
            },
            "fun_fact": fun_fact,
            "prediction": {
                "win_probability": round(win_prob * 100, 1),
                "expected_score": {team1: team1_score, team2: team2_score}
            }
        }
        
    except Exception as e:
        return {"error": f"Database error: {e}"} 