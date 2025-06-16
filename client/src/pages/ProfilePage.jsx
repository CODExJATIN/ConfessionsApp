import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/layout/Layout';
import ConfessionList from '../components/confessions/ConfessionList';
import { Tabs } from '../components/ui/tabs';
import { User, Heart, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useUser } from '../store/useUser';

const UserProfile = () => {
  const user = useUser((state) => state.user);
  const setUser = useUser((state) => state.setUser);
  const [confessions, setConfessions] = useState([]);
  const [likes, setLikes] = useState([]);
  const [activeTab, setActiveTab] = useState('confessions');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const logoutHandler = () => {
      axios.post(`${import.meta.env.VITE_BASE_URL}/user-routes/logout`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }).then((response) => {
        console.log('Logout successful:', response.data);
        localStorage.removeItem('token');
          setUser({
            username: '',
            email: '',
            fullname: '',
            id: '',
          });
        window.location.href = '/auth'; // Redirect to login page
      }).catch((error) => {
        console.error('Error during logout:', error);
      });
    }

  // Fetch user data + confessions
  useEffect(() => {
    if(localStorage.getItem('token') === null) {
      window.location.href = '/auth'; // Redirect to login if no token
        return;
    }
    
    const fetchUserData = async () => {
      try {
        setLoading(true);
        if(!user || !user.id) {
          setError('User not found');
            setLoading(false);
            return;
        }
        // Fetch user confessions and likes

        console.log('Fetching data for user:', user);
        setError(null);
        const [confessionRes, likedRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_BASE_URL}/confession-routes/user/${user.id}`),
          axios.get(`${import.meta.env.VITE_BASE_URL}/like-routes/user-likes`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }),
        ]);
        console.log('Confessions:', confessionRes.data);
        console.log('Likes:', likedRes.data.data.map(like => like.Confession));
        setConfessions(confessionRes.data.data || []);
        setLikes(likedRes.data.data.map(like => like.Confession) || []);
      } catch (err) {
        console.error(err);
        setError('Failed to load user profile');
        window.location.href = '/auth'; // Redirect to login if error occurs
      } finally {
        setLoading(false);
      }
    };

    if (user &&user.id!=="") fetchUserData();
  }, [user, user.id]);

const tabs = [
  { id: 'confessions', label: <><User size={16} className="mr-1" /> Mine</> },
  { id: 'likes', label: <><Heart size={16} className="mr-1" /> Liked</> }
];


  const renderContent = () => {
    const data = activeTab === 'confessions' ? confessions : likes;
    console.log('Data for active tab:', data);
    if (data.length === 0) {
      return (
        <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-xl shadow-sm">
          <p className="text-gray-600 dark:text-gray-400">No {activeTab === 'confessions' ? 'confessions' : 'likes'} yet</p>
        </div>
      );
    }
    return <ConfessionList confessions={data} />;
  };

  return (
    <Layout>
      <div className="relative">
        <div className="h-48 sm:h-64 bg-gradient-to-r from-blue-600 to-purple-500 dark:from-blue-800 dark:to-purple-800">
          {/* Optionally add a banner or background here */}
          <img
            src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000&auto=format&fit=crop"
            alt="Profile Banner"
            className="w-full h-full object-cover opacity-50"
          />
        </div>

        <div className="container-narrow relative -mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 mb-6"
          >
            <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg mb-4 sm:mb-0 sm:mr-6 bg-gray-200 dark:bg-gray-800"> 
                <div className="flex items-center justify-center h-full w-full text-2xl font-bold text-gray-700 dark:text-gray-300">
                  {user.fullname.charAt(0)}
                </div>
            </div>
            <div className="text-center sm:text-left">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold">
                  {user?.fullname}
                </h1>
                {user?.isAdmin && (
                  <img
                    src="/vip.png"
                    alt="Admin badge"
                    className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
                    title="Admin"
                  />
                )}
              </div>

              <p className="text-gray-600 dark:text-gray-400">@{user?.username}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
              <p className="text-sm text-primary-600 dark:text-primary-400 mt-1">
                {confessions.length} confessions • {likes.length} likes
              </p>
              <button
                onClick={logoutHandler}
                className="inline-flex items-center gap-2 bg-red-600 text-white mt-2 px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
                >
                    <LogOut size={16} />
                Logout
                </button>
            </div>
          </motion.div>

            {/* Logout Button */}
            <div className="mt-4 flex justify-center sm:justify-start">
                
            </div>

          <div className="mb-6">
            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              onChange={(id) => setActiveTab(id)}
            />
          </div>

          {loading ? (
            <div className="text-center py-12 text-gray-600 dark:text-gray-400">Loading...</div>
          ) : error ? (
            <div className="text-center py-12 text-red-500">{error}</div>
          ) : (
            renderContent()
          )}
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;
