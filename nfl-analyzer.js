// Enhanced NFL Matchup Analyzer JavaScript

// Global variables
let nflTeams = [];
let availableSeasons = [];
const API_BASE_URL = 'http://localhost:8001'; // Enhanced API

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add event listener for the NFL analyzer button
    const nflButton = document.getElementById('open-nfl-analyzer-btn');
    if (nflButton) {
        nflButton.addEventListener('click', function() {
            openNflAnalyzer();
        });
    }
});

// Open NFL Analyzer modal
function openNflAnalyzer() {
    const modal = document.getElementById('nfl-analyzer-modal');
    modal.style.display = 'flex';
    
    // Load teams and seasons if not already loaded
    if (nflTeams.length === 0) {
        loadTeams();
        loadSeasons();
    } else {
        populateTeamSelects();
        populateSeasonSelect();
    }
}

// Close NFL Analyzer modal
function closeNflAnalyzer() {
    const modal = document.getElementById('nfl-analyzer-modal');
    modal.style.display = 'none';
    
    // Clear results
    document.getElementById('nfl-results').style.display = 'none';
    document.getElementById('nfl-loading').style.display = 'none';
    document.getElementById('nfl-error').style.display = 'none';
}

// Load teams from API
async function loadTeams() {
    try {
        const response = await fetch(`${API_BASE_URL}/teams`);
        if (!response.ok) {
            throw new Error('Failed to load teams');
        }
        
        nflTeams = await response.json();
        populateTeamSelects();
    } catch (error) {
        console.error('Error loading teams:', error);
        showError('Failed to load teams. Please check if the enhanced backend server is running on port 8001.');
    }
}

// Load seasons from API
async function loadSeasons() {
    try {
        const response = await fetch(`${API_BASE_URL}/seasons`);
        if (!response.ok) {
            throw new Error('Failed to load seasons');
        }
        
        availableSeasons = await response.json();
        populateSeasonSelect();
    } catch (error) {
        console.error('Error loading seasons:', error);
        availableSeasons = ['2019', '2020', '2021', '2022', '2023', '2024'];
        populateSeasonSelect();
    }
}

// Populate team select dropdowns
function populateTeamSelects() {
    const team1Select = document.getElementById('team1-select');
    const team2Select = document.getElementById('team2-select');
    
    // Clear existing options
    team1Select.innerHTML = '<option value="">Select a team...</option>';
    team2Select.innerHTML = '<option value="">Select a team...</option>';
    
    // Add team options
    nflTeams.forEach(team => {
        const option1 = document.createElement('option');
        option1.value = team;
        option1.textContent = team;
        team1Select.appendChild(option1);
        
        const option2 = document.createElement('option');
        option2.value = team;
        option2.textContent = team;
        team2Select.appendChild(option2);
    });
}

// Populate season select dropdown
function populateSeasonSelect() {
    const seasonSelect = document.getElementById('season-select');
    if (seasonSelect) {
        seasonSelect.innerHTML = '<option value="">All Seasons</option>';
        
        availableSeasons.forEach(season => {
            const option = document.createElement('option');
            option.value = season;
            option.textContent = season;
            seasonSelect.appendChild(option);
        });
    }
}

// Analyze matchup between selected teams
async function analyzeMatchup() {
    const team1 = document.getElementById('team1-select').value;
    const team2 = document.getElementById('team2-select').value;
    const season = document.getElementById('season-select')?.value || '';
    
    if (!team1 || !team2) {
        showError('Please select both teams.');
        return;
    }
    
    if (team1 === team2) {
        showError('Please select two different teams.');
        return;
    }
    
    // Show loading
    document.getElementById('nfl-loading').style.display = 'block';
    document.getElementById('nfl-results').style.display = 'none';
    document.getElementById('nfl-error').style.display = 'none';
    
    try {
        const url = `${API_BASE_URL}/enhanced-matchup?team1=${encodeURIComponent(team1)}&team2=${encodeURIComponent(team2)}`;
        const finalUrl = season ? `${url}&season=${season}` : url;
        
        const response = await fetch(finalUrl);
        
        if (!response.ok) {
            throw new Error('Failed to analyze matchup');
        }
        
        const data = await response.json();
        
        console.log('API Response:', data); // Debug logging
        
        if (data.error) {
            throw new Error(data.error);
        }
        
        displayEnhancedResults(data, team1, team2, season);
    } catch (error) {
        console.error('Error analyzing matchup:', error);
        showError('Failed to analyze matchup. Please check if the enhanced backend server is running on port 8001.');
    } finally {
        document.getElementById('nfl-loading').style.display = 'none';
    }
}

// Display enhanced analysis results
function displayEnhancedResults(data, team1, team2, season) {
    console.log('Displaying results for:', team1, 'vs', team2, 'season:', season);
    console.log('Data structure:', data);
    
    const resultsDiv = document.getElementById('nfl-results-content');
    
    const html = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
            
            <!-- Head to Head Record -->
            <div style="background: white; border-radius: 8px; padding: 1.5rem; border: 1px solid #dee2e6;">
                <h4 style="margin-top: 0; color: #333; border-bottom: 2px solid #2196F3; padding-bottom: 0.5rem;">
                    Head to Head Record ${season ? `(${season})` : '(All Time)'}
                </h4>
                <div style="text-align: center; margin: 1rem 0;">
                    <div style="font-size: 2rem; font-weight: bold; color: #2196F3;">${data.head_to_head.total_games}</div>
                    <div style="color: #666; font-size: 0.9rem;">Total Games</div>
                </div>
                <div style="display: flex; justify-content: space-between; margin-top: 1rem;">
                    <div style="text-align: center;">
                        <div style="font-size: 1.5rem; font-weight: bold; color: #4caf50;">${data.head_to_head.team1_wins}</div>
                        <div style="color: #666; font-size: 0.8rem;">${team1} Wins</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 1.5rem; font-weight: bold; color: #f44336;">${data.head_to_head.team2_wins}</div>
                        <div style="color: #666; font-size: 0.8rem;">${team2} Wins</div>
                    </div>
                </div>
                <div style="text-align: center; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #dee2e6;">
                    <div style="font-size: 1.2rem; font-weight: bold; color: #2196F3;">${data.head_to_head.team1_win_percentage}%</div>
                    <div style="color: #666; font-size: 0.8rem;">${team1} Win Rate</div>
                </div>
            </div>
            
            <!-- Advanced Prediction -->
            <div style="background: white; border-radius: 8px; padding: 1.5rem; border: 1px solid #dee2e6;">
                <h4 style="margin-top: 0; color: #333; border-bottom: 2px solid #ff9800; padding-bottom: 0.5rem;">Advanced Prediction</h4>
                <div style="text-align: center; margin: 1rem 0;">
                    <div style="font-size: 2rem; font-weight: bold; color: #ff9800;">${data.prediction.win_probability}%</div>
                    <div style="color: #666; font-size: 0.9rem;">${team1} Win Probability</div>
                    <div style="font-size: 0.9rem; color: #666; margin-top: 0.5rem;">Confidence: ${data.prediction.confidence}%</div>
                </div>
                <div style="background: #f8f9fa; border-radius: 6px; padding: 1rem; margin-top: 1rem;">
                    <div style="font-weight: 500; margin-bottom: 0.5rem;">Expected Score:</div>
                    <div style="display: flex; justify-content: space-between;">
                        <span><strong>${team1}:</strong> ${data.prediction.expected_score[team1]}</span>
                        <span><strong>${team2}:</strong> ${data.prediction.expected_score[team2]}</span>
                    </div>
                </div>
                <div style="margin-top: 1rem; font-size: 0.8rem; color: #666;">
                    <div><strong>Factors:</strong></div>
                    <div>H2H: ${data.prediction.factors.head_to_head_weight}%</div>
                    <div>Form: ${data.prediction.factors.recent_form_weight}%</div>
                    <div>Home: ${data.prediction.factors.home_advantage_weight}%</div>
                    <div>PPG: ${data.prediction.factors.ppg_weight}%</div>
                </div>
            </div>
            
            <!-- Game Characteristics -->
            <div style="background: white; border-radius: 8px; padding: 1.5rem; border: 1px solid #dee2e6;">
                <h4 style="margin-top: 0; color: #333; border-bottom: 2px solid #9c27b0; padding-bottom: 0.5rem;">Game Characteristics</h4>
                <div style="margin: 1rem 0;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                        <span>High Scoring (50+ pts):</span>
                        <span style="font-weight: bold; color: #4caf50;">${data.game_characteristics.high_scoring_games}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                        <span>Low Scoring (<40 pts):</span>
                        <span style="font-weight: bold; color: #f44336;">${data.game_characteristics.low_scoring_games}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                        <span>Close Games (≤7 pts):</span>
                        <span style="font-weight: bold; color: #2196F3;">${data.game_characteristics.close_games}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-top: 1rem; padding-top: 0.5rem; border-top: 1px solid #dee2e6;">
                        <span><strong>Average Total Points:</strong></span>
                        <span style="font-weight: bold; color: #2196F3;">${data.game_characteristics.average_total_points}</span>
                    </div>
                </div>
            </div>
            
            <!-- Recent Form -->
            <div style="background: white; border-radius: 8px; padding: 1.5rem; border: 1px solid #dee2e6;">
                <h4 style="margin-top: 0; color: #333; border-bottom: 2px solid #607d8b; padding-bottom: 0.5rem;">Recent Form</h4>
                <div style="margin: 1rem 0;">
                    ${data.recent_form.error ? 
                        `<div style="color: #666; font-style: italic;">${data.recent_form.error}</div>` :
                        `<div style="margin-bottom: 1rem;">
                            <div style="font-weight: 500; margin-bottom: 0.5rem;">${team1} Last 5:</div>
                            <div style="display: flex; gap: 0.5rem;">
                                ${data.recent_form.team1_recent_form.map(result => 
                                    `<span style="padding: 0.2rem 0.5rem; border-radius: 3px; font-size: 0.8rem; font-weight: bold; background: ${result === 'W' ? '#4caf50' : '#f44336'}; color: white;">${result}</span>`
                                ).join('')}
                            </div>
                            <div style="font-size: 0.9rem; color: #666; margin-top: 0.5rem;">
                                Streak: ${data.recent_form.team1_streak > 0 ? '+' : ''}${data.recent_form.team1_streak}
                            </div>
                        </div>
                        <div>
                            <div style="font-weight: 500; margin-bottom: 0.5rem;">${team2} Last 5:</div>
                            <div style="display: flex; gap: 0.5rem;">
                                ${data.recent_form.team2_recent_form.map(result => 
                                    `<span style="padding: 0.2rem 0.5rem; border-radius: 3px; font-size: 0.8rem; font-weight: bold; background: ${result === 'W' ? '#4caf50' : '#f44336'}; color: white;">${result}</span>`
                                ).join('')}
                            </div>
                            <div style="font-size: 0.9rem; color: #666; margin-top: 0.5rem;">
                                Streak: ${data.recent_form.team2_streak > 0 ? '+' : ''}${data.recent_form.team2_streak}
                            </div>
                        </div>`
                    }
                </div>
            </div>
        </div>
        
        <!-- Team Comparison -->
        ${data.team_comparison.team1_stats && data.team_comparison.team2_stats ? `
        <div style="background: white; border-radius: 8px; padding: 1.5rem; margin-top: 1.5rem; border: 1px solid #dee2e6;">
            <h4 style="margin-top: 0; color: #333; border-bottom: 2px solid #4caf50; padding-bottom: 0.5rem;">2024 Season Comparison</h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                <div>
                    <h5 style="margin-top: 0; color: #333;">${team1}</h5>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; font-size: 0.9rem;">
                        <div><strong>Record:</strong> ${data.team_comparison.team1_stats.wins}-${data.team_comparison.team1_stats.losses}</div>
                        <div><strong>Win %:</strong> ${data.team_comparison.team1_stats.win_percentage}%</div>
                        <div><strong>PPG For:</strong> ${data.team_comparison.team1_stats.avg_points_for}</div>
                        <div><strong>PPG Against:</strong> ${data.team_comparison.team1_stats.avg_points_against}</div>
                        <div><strong>Home:</strong> ${data.team_comparison.team1_stats.home_record}</div>
                        <div><strong>Away:</strong> ${data.team_comparison.team1_stats.away_record}</div>
                    </div>
                </div>
                <div>
                    <h5 style="margin-top: 0; color: #333;">${team2}</h5>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; font-size: 0.9rem;">
                        <div><strong>Record:</strong> ${data.team_comparison.team2_stats.wins}-${data.team_comparison.team2_stats.losses}</div>
                        <div><strong>Win %:</strong> ${data.team_comparison.team2_stats.win_percentage}%</div>
                        <div><strong>PPG For:</strong> ${data.team_comparison.team2_stats.avg_points_for}</div>
                        <div><strong>PPG Against:</strong> ${data.team_comparison.team2_stats.avg_points_against}</div>
                        <div><strong>Home:</strong> ${data.team_comparison.team2_stats.home_record}</div>
                        <div><strong>Away:</strong> ${data.team_comparison.team2_stats.away_record}</div>
                    </div>
                </div>
            </div>
        </div>
        ` : '<div style="background: white; border-radius: 8px; padding: 1.5rem; margin-top: 1.5rem; border: 1px solid #dee2e6;"><div style="color: #666; font-style: italic;">2024 season statistics not available for these teams.</div></div>'}
        
        <!-- Fun Facts -->
        <div style="background: #e3f2fd; border-left: 4px solid #2196F3; padding: 1rem; margin-top: 1.5rem; border-radius: 0 6px 6px 0;">
            <div style="font-weight: 500; color: #1976d2; margin-bottom: 0.5rem;">Key Insights:</div>
            ${Array.isArray(data.fun_facts) ? data.fun_facts.map(fact => `<div style="color: #333; margin-bottom: 0.5rem;">• ${fact}</div>`).join('') : `<div style="color: #333; margin-bottom: 0.5rem;">• ${data.fun_facts}</div>`}
        </div>
    `;
    
    resultsDiv.innerHTML = html;
    document.getElementById('nfl-results').style.display = 'block';
}

// Show error message
function showError(message) {
    const errorDiv = document.getElementById('nfl-error');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    document.getElementById('nfl-results').style.display = 'none';
}

// Add CSS animation for loading spinner
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style); 