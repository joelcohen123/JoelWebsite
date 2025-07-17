import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [teams, setTeams] = useState([]);
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load teams from backend
    fetch('http://localhost:8000/teams')
      .then(res => res.json())
      .then(data => {
        console.log('Teams loaded:', data);
        setTeams(data.filter(t => t && !t.startsWith('Error')));
      })
      .catch(err => {
        console.error('Error loading teams:', err);
        setTeams([]);
      });
  }, []);

  const fetchMatchup = async () => {
    if (!team1 || !team2 || team1 === team2) {
      setError('Please select two different teams.');
      setResult(null);
      return;
    }
    
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      const res = await fetch(`http://localhost:8000/matchup?team1=${encodeURIComponent(team1)}&team2=${encodeURIComponent(team2)}`);
      const data = await res.json();
      console.log('Matchup data:', data);
      
      if (data.error) {
        setError(data.error);
        setResult(null);
      } else {
        setResult(data);
      }
    } catch (e) {
      console.error('Error fetching matchup:', e);
      setError('Failed to fetch matchup data. Make sure the backend is running.');
      setResult(null);
    }
    setLoading(false);
  };

  return (
    <div style={{
      maxWidth: '800px',
      margin: '2rem auto',
      padding: '2rem',
      backgroundColor: '#f8fbff',
      borderRadius: '12px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ textAlign: 'center', color: '#1e3a8a', marginBottom: '2rem' }}>
        🏈 NFL Matchup Analyzer
      </h1>
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        marginBottom: '2rem',
        flexWrap: 'wrap'
      }}>
        <select 
          value={team1} 
          onChange={e => setTeam1(e.target.value)}
          style={{
            fontSize: '1rem',
            padding: '0.5rem',
            borderRadius: '6px',
            border: '1px solid #bbb',
            minWidth: '150px'
          }}
        >
          <option value="">Select Team 1</option>
          {teams.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        
        <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>vs</span>
        
        <select 
          value={team2} 
          onChange={e => setTeam2(e.target.value)}
          style={{
            fontSize: '1rem',
            padding: '0.5rem',
            borderRadius: '6px',
            border: '1px solid #bbb',
            minWidth: '150px'
          }}
        >
          <option value="">Select Team 2</option>
          {teams.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        
        <button 
          onClick={fetchMatchup} 
          disabled={loading}
          style={{
            fontSize: '1rem',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: loading ? '#aaa' : '#1e90ff',
            color: '#fff',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Loading...' : 'Analyze Matchup'}
        </button>
      </div>
      
      {error && (
        <div style={{
          color: '#b00',
          backgroundColor: '#fee',
          padding: '1rem',
          borderRadius: '6px',
          marginBottom: '1rem'
        }}>
          {error}
        </div>
      )}
      
      {result && (
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '8px',
          padding: '1.5rem',
          marginTop: '1.5rem',
          boxShadow: '0 1px 6px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ color: '#1e3a8a', marginBottom: '1rem' }}>
            Results: {team1} vs {team2}
          </h2>
          
          <div style={{ marginBottom: '0.5rem' }}>
            <strong>Head-to-Head:</strong> {result.head_to_head.team1_wins} - {result.head_to_head.team2_wins} 
            (Total: {result.head_to_head.total_games} games)
          </div>
          
          <div style={{ marginBottom: '0.5rem' }}>
            <strong>Home/Away:</strong> {team1} home games: {result.home_away.home_games}, 
            home wins: {result.home_away.home_wins}
          </div>
          
          <div style={{ marginBottom: '0.5rem' }}>
            <strong>Over/Under 45:</strong> Over: {result.over_under.over_45}, Under: {result.over_under.under_45}
          </div>
          
          <div style={{ marginBottom: '0.5rem' }}>
            <strong>Fun Fact:</strong> {result.fun_fact}
          </div>
          
          <div style={{ marginBottom: '0.5rem' }}>
            <strong>Model Prediction:</strong> {team1} {Math.round(result.prediction.win_prob*100)}% win chance, 
            Expected Score: {team1} {result.prediction.expected_score[team1]}, {team2} {result.prediction.expected_score[team2]}
          </div>
        </div>
      )}
      
      {teams.length === 0 && (
        <div style={{
          textAlign: 'center',
          color: '#666',
          marginTop: '2rem'
        }}>
          Loading teams... (Make sure the backend is running on http://localhost:8000)
        </div>
      )}
    </div>
  );
}

export default App;
