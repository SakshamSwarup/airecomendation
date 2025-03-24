# 🎬 AI Movie Recommendation System

[![GitHub Repo](https://img.shields.io/github/stars/SakshamSwarup/airecomendation?style=social)](https://github.com/SakshamSwarup/airecomendation)

An AI-powered movie recommendation system that suggests movies based on user preferences using machine learning and natural language processing.

## 🚀 Features  

✅ AI-based movie recommendations  
✅ User-friendly interface  
✅ Uses machine learning models for recommendations  
✅ Supports multiple genres and preferences  
✅ Fast and scalable  

## 📂 Project Structure  

```bash
/AI-Movie-Recommendation
│── /src               # Source code files  
│   ├── /components    # UI components  
│   ├── /services      # API & data handling  
│   ├── /utils         # Utility functions  
│   └── App.js         # Main application entry  
│── /data              # Movie dataset and ML models  
│── /public            # Static assets  
│── .gitignore         # Files to ignore in Git  
│── README.md          # Documentation  
│── package.json       # Dependencies and scripts  
└── index.js           # Main server/app entry point  
```

## 🛠️ Installation  

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/SakshamSwarup/airecomendation.git
   cd airecomendation
   ```

2. **Install Dependencies**  
   ```bash
   npm install
   ```

3. **Run the Project**  
   ```bash
   npm start
   ```

4. **Deploy the Project**  
   ```bash
   npm run build
   ```

## 🏗️ Code Overview  

### API Keys  
This project uses environment variables to store API keys. Ensure you have a `.env` file with the following keys:

```bash
VITE_API_KEY=your_tmdb_api_key
VITE_AI_API_KEY=your_ai_api_key
```

### Fetching Movies  

The `App.js` component fetches movies from The Movie Database (TMDB) API:

```javascript
const API_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_API_KEY;

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};
```

### Fetching AI Recommendations  

Movies are also fetched from an AI-powered recommendation API:

```javascript
const AI_API_KEY = import.meta.env.VITE_AI_API_KEY;
const options2 = {
  method: "GET",
  headers: {
    'x-rapidapi-key': `${AI_API_KEY}`,
    'x-rapidapi-host': 'ai-movie-recommender.p.rapidapi.com',
  },
};
```

### Debounced Search  

Search queries are debounced using `react-use` to optimize API requests:

```javascript
useDebounce(() => setDebounce(search), 1000, [search]);
```

### Fetching Trending Movies  

Trending movies are fetched on component mount:

```javascript
useEffect(() => {
  TrendingMovies();
}, []);
```

## 🤝 Contributing  

Contributions are welcome! Follow these steps:  

1. Fork the repository  
2. Create a new branch (`git checkout -b feature-branch`)  
3. Commit your changes (`git commit -m "Added new feature"`)  
4. Push to your branch (`git push origin feature-branch`)  
5. Open a Pull Request  


---

## Bug Description
The AI recommendation section is not displaying any movie results. Even when a search query is entered, the API response does not populate the UI.

## Steps to Reproduce
1. Open the application.
2. Enter a movie name in the search bar.
3. Wait for the AI recommendation results.

## Expected Behavior
The AI recommendation section should display movies based on the searched query.

## Actual Behavior
The section remains empty, even after a successful API request.

## Console/Error Log




### ⭐ **If you like this project, don't forget to star it on GitHub!** ⭐
