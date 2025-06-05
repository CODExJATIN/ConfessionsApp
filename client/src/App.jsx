import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import HomePage from './pages/HomePage';
import CollegePage from './pages/CollegePage';
import AboutPage from './pages/AboutPage';
import TrendingPage from './pages/TrendingPage';
import NewPage from './pages/NewPage';
import AuthPage from './pages/AuthPage';
import { useUser } from './store/useUser';
import axios from 'axios';

function App() {
  const setUser = useUser((state) => state.setUser);

  useEffect(() => {
    if(localStorage.getItem('token')) {
      axios.get(`${import.meta.env.VITE_BASE_URL}/user-routes/current-user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }).then((response) => {
        console.log('User data:', response.data);

        setUser({
          username: response.data.data.Username,
          email: response.data.data.Email,
          fullname: response.data.data.FullName,
          id: response.data.data._id,
        });

      }).catch((error) => {
        console.error('Error fetching user data:', error);
        localStorage.removeItem('token'); // Clear token if error occurs
      });
    }
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/college/:collegeId" element={<CollegePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/trending" element={<TrendingPage />} />
          <Route path="/new" element={<NewPage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;