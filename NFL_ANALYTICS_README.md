# 🏈 NFL AI Analytics & Prediction Platform

A comprehensive AI-powered NFL analytics platform that provides game predictions, team power rankings, and performance insights using machine learning models.

## 🚀 Features

### **AI/ML Capabilities**
- **Game Score Prediction**: Predicts home and away team scores using Random Forest models
- **Win Probability**: Calculates win probability using advanced ML algorithms
- **Team Power Rankings**: Dynamic power ratings based on historical performance
- **Custom Predictions**: Interactive tool for predicting specific matchups
- **Advanced Analytics**: Point spreads, over/under predictions, and more

### **Data & Analytics**
- **Real NFL Data**: Historical game data from multiple seasons
- **Team Statistics**: Comprehensive team performance metrics
- **Player Impact**: Individual player contribution analysis
- **Trend Analysis**: Performance trends and patterns
- **Conference/Division Analysis**: Head-to-head matchup insights

### **User Interface**
- **Interactive Dashboard**: Real-time analytics and predictions
- **Multiple Views**: Dashboard, Predictions, Team Analytics, Custom Predictions
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Live data integration
- **Fallback Mode**: Works offline with simulated data

## 🏗️ Architecture

### **Backend (Python/FastAPI)**
```
backend/
├── nfl_api.py              # FastAPI server with ML endpoints
├── nfl_data_collector.py   # Data collection from NFL APIs
├── train_nfl_models.py     # ML model training pipeline
├── start_nfl_backend.py    # Startup script
└── models/                 # Trained ML models
```

### **Frontend (JavaScript)**
```
nfl-analytics.js            # Enhanced frontend with API integration
```

### **Data Flow**
1. **Data Collection**: ESPN API → SQLite Database
2. **Feature Engineering**: Historical data → ML features
3. **Model Training**: Features → Trained models
4. **API Endpoints**: Models → FastAPI server
5. **Frontend**: API → Interactive UI

## 🛠️ Installation & Setup

### **Prerequisites**
- Python 3.8+
- Node.js (for frontend)
- Internet connection (for data collection)

### **Backend Setup**

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Activate virtual environment:**
   ```bash
   source ../venv/bin/activate  # On macOS/Linux
   # or
   ../venv/Scripts/activate     # On Windows
   ```

3. **Install dependencies:**
   ```bash
   pip install fastapi uvicorn pandas numpy scikit-learn requests joblib
   ```

4. **Start the backend:**
   ```bash
   python start_nfl_backend.py
   ```

   This will:
   - Check dependencies
   - Collect NFL data (if not exists)
   - Train ML models (if not exists)
   - Start FastAPI server on http://localhost:8000

### **Frontend Integration**

The frontend is already integrated into your portfolio website. The NFL Analytics project will automatically connect to the backend when available, or use fallback data if the backend is offline.

## 📊 API Endpoints

### **Core Endpoints**
- `GET /` - Health check
- `GET /teams` - Get all NFL teams
- `GET /teams/stats` - Get team statistics
- `GET /dashboard` - Get dashboard summary data
- `GET /predictions/batch?count=5` - Get batch predictions
- `POST /predict` - Make custom prediction
- `POST /train` - Retrain models

### **Example API Usage**
```bash
# Get team statistics
curl http://localhost:8000/teams/stats

# Make a prediction
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{"home_team": "KC", "away_team": "BUF"}'

# Get dashboard data
curl http://localhost:8000/dashboard
```

## 🤖 ML Models

### **Score Prediction Models**
- **Home Score Model**: Random Forest Regressor
- **Away Score Model**: Random Forest Regressor
- **Total Points Model**: Random Forest Regressor

### **Win Probability Model**
- **Algorithm**: Logistic Regression + Random Forest
- **Features**: Team performance, power ratings, historical data
- **Output**: Win probability (0-1)

### **Advanced Models**
- **Point Spread Model**: Ridge Regression
- **Over/Under Model**: Random Forest Classifier

### **Feature Engineering**
- Team win/loss records
- Points for/against averages
- Power ratings
- Conference matchups
- Week progression
- Historical performance

## 📈 Data Sources

### **Primary Sources**
- **ESPN API**: Live game data and team information
- **Pro Football Reference**: Historical statistics
- **NFL.com**: Official team data

### **Data Types**
- **Game Results**: Scores, winners, dates
- **Team Statistics**: Offense/defense rankings
- **Player Performance**: Key player metrics
- **Historical Data**: Multiple seasons of data

## 🎯 Usage Guide

### **Dashboard View**
- View AI-generated predictions
- See top teams by power rating
- Quick statistics overview
- Connection status indicator

### **Predictions View**
- Detailed game predictions
- Confidence scores
- Win probabilities
- Generate new predictions

### **Team Analytics View**
- Team performance metrics
- Power ratings
- Offensive/defensive rankings
- Search and filter teams

### **Custom Prediction View**
- Select specific teams
- Get personalized predictions
- View detailed analysis
- Compare team strengths

## 🔧 Configuration

### **Environment Variables**
```bash
# API Configuration
API_BASE_URL=http://localhost:8000
FALLBACK_MODE=true

# Database Configuration
DB_PATH=nfl_data.db

# Model Configuration
MODEL_PATH=models/
```

### **Customization Options**
- **Data Sources**: Modify `nfl_data_collector.py` for different APIs
- **ML Models**: Adjust parameters in `train_nfl_models.py`
- **UI Styling**: Customize CSS in `nfl-analytics.js`
- **API Endpoints**: Add new endpoints in `nfl_api.py`

## 🚀 Advanced Features

### **Real-time Updates**
- Live game data integration
- Real-time predictions
- Dynamic power rankings
- Live score updates

### **Advanced Analytics**
- Player injury impact
- Weather factor analysis
- Betting line predictions
- Social media sentiment

### **User Features**
- User accounts and favorites
- Prediction history
- Custom alerts
- Export functionality

## 🐛 Troubleshooting

### **Common Issues**

1. **Backend won't start:**
   ```bash
   # Check dependencies
   pip list | grep -E "(fastapi|uvicorn|pandas|sklearn)"
   
   # Check port availability
   lsof -i :8000
   ```

2. **Data collection fails:**
   ```bash
   # Check internet connection
   curl https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams
   
   # Use fallback data
   # The system will automatically use simulated data
   ```

3. **Models not training:**
   ```bash
   # Check data exists
   ls -la nfl_data.db
   
   # Re-train models
   rm -rf models/
   python train_nfl_models.py
   ```

### **Logs and Debugging**
- Backend logs: Check terminal output
- Frontend logs: Check browser console (F12)
- API logs: Visit http://localhost:8000/docs

## 📝 Development

### **Adding New Features**
1. **Backend**: Add endpoints in `nfl_api.py`
2. **Frontend**: Add UI components in `nfl-analytics.js`
3. **Models**: Add new models in `train_nfl_models.py`
4. **Data**: Extend data collection in `nfl_data_collector.py`

### **Testing**
```bash
# Test API endpoints
curl http://localhost:8000/teams

# Test predictions
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{"home_team": "KC", "away_team": "BUF"}'
```

## 📄 License

This project is part of Joel Cohen's portfolio website. The NFL Analytics platform demonstrates advanced AI/ML capabilities and full-stack development skills.

## 🤝 Contributing

This is a portfolio project showcasing:
- **AI/ML Development**: Advanced machine learning models
- **Full-Stack Development**: Frontend + Backend integration
- **API Development**: RESTful API with FastAPI
- **Data Engineering**: Data collection and processing
- **UI/UX Design**: Interactive analytics dashboard

## 📞 Contact

For questions about this NFL Analytics platform or Joel Cohen's portfolio, please reach out through the contact information provided on the main website.

---

**🏈 Built with ❤️ using AI/ML and modern web technologies** 