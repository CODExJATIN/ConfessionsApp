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
import { useLocation } from 'react-router-dom';
import UserProfile from './pages/ProfilePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfService';
import CommunityGuidelinesPage from './pages/CommunityGuidelinesPage';
import NotFoundPage from './pages/NotFoundPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js');
  });
}



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
          isAdmin: !!response.data.data.isAdmin, 
          college: response.data.data.college ?? null 
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
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/college/:collegeId" element={<CollegePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/trending" element={<TrendingPage />} />
          <Route path="/new" element={<NewPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsOfServicePage/>} />
          <Route path="/guidelines" element={<CommunityGuidelinesPage />} />
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;