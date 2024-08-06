

import './App.css';
import NavBar from './components/NavBar';
import Banner from './components/Banner';
import Movies from './components/Movies';
import WatchList from './components/WatchList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/Signup';
import MovieDetail from './components/MovieDetail';
import { useState } from 'react';

function App() {
  const [searchStr, setSearchStr] = useState('');
  const [searchHistory, setSearchHistory] = useState(JSON.parse(localStorage.getItem('searchHistory')) || []);

  const handleSearchChange = (e) => setSearchStr(e.target.value);

  const handleSearchSubmit = () => {
    const updatedSearchHistory = [...searchHistory, searchStr];
    setSearchHistory(updatedSearchHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedSearchHistory));
    setSearchStr('');
  };

  const deleteSearchHistoryItem = (item) => {
    const updatedSearchHistory = searchHistory.filter(history => history !== item);
    setSearchHistory(updatedSearchHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedSearchHistory));
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.setItem('searchHistory', JSON.stringify([]));
  };

  return (
    <Router>
      <NavBar 
        searchStr={searchStr} 
        handleSearchChange={handleSearchChange} 
        handleSearchSubmit={handleSearchSubmit} 
        searchHistory={searchHistory} 
        deleteSearchHistoryItem={deleteSearchHistoryItem}
        clearSearchHistory={clearSearchHistory}
      />
      <Routes>
        <Route path="/" element={<><Banner /><Movies searchStr={searchStr} searchHistory={searchHistory} handleSearchSubmit={handleSearchSubmit} /></>} />
        <Route path="/watchlist" element={<WatchList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
