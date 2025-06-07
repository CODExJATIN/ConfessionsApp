import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/layout/Layout';
import ConfessionList from '../components/confessions/ConfessionList';
import NewConfessionModal from '../components/confessions/NewConfessionModal';
import { Tabs } from '../components/ui/tabs';
import { colleges } from '../data/mockData';
import { Flame, Clock, Star, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import ConfessionLoader from '../components/loader/Loader';

const CollegePage = () => {
  const { collegeId } = useParams();
  const [college, setCollege] = useState(null);
  const [confessions, setConfessions] = useState([]);
  const [activeTab, setActiveTab] = useState('trending');
  const [isNewConfessionOpen, setIsNewConfessionOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (collegeId) {
      const foundCollege = colleges.find((c) => c.id === collegeId);
      if (foundCollege) {
        setCollege(foundCollege);
      } else {
        setCollege(null);
      }
    }
  }, [collegeId]);

  useEffect(() => {
    if (!collegeId) return;

    const fetchConfessions = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/confession-routes/college/${collegeId}`);
        setConfessions(response.data.data || []);
        console.log("confessions: ", response.data.data);
      } catch (err) {
        setError('Failed to load confessions');
      } finally {
        setLoading(false);
      }
    };

    fetchConfessions();
    
  }, [collegeId]);

  if (!college) {
    return (
      <Layout>
        <div className="container-narrow py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">College not found</h1>
          <p className="text-gray-600 dark:text-gray-400">
            The college you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </Layout>
    );
  }

  // Filter confessions by college (just in case)
  const collegeConfessions = confessions.filter((c) => c.college === collegeId);

  // Sort confessions based on active tab
  const sortedConfessions = [...collegeConfessions].sort((a, b) => {
    if (activeTab === 'new') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (activeTab === 'top') {
      return (b.Likes?.length || 0) - (a.Likes?.length || 0);
    } else {
      // Trending - combination of recency and engagement
      const recencyA = new Date(a.createdAt).getTime();
      const recencyB = new Date(b.createdAt).getTime();
      const engagementA = (a.Likes?.length || 0) + (a.Comments?.length || 0) * 2;
      const engagementB = (b.Likes?.length || 0) + (b.Comments?.length || 0) * 2;

      const scoreA = engagementA * 0.7 + recencyA * 0.3;
      const scoreB = engagementB * 0.7 + recencyB * 0.3;

      return scoreB - scoreA;
    }
  });

  const tabs = [
    { id: 'trending', label: <><Flame size={16} className="mr-1" /> Trending</> },
    { id: 'new', label: <><Clock size={16} className="mr-1" /> New</> },
    { id: 'top', label: <><Star size={16} className="mr-1" /> Top</> },
  ];

  return (
    <Layout>
      <div className="relative">
        <div className="h-48 sm:h-64 bg-gradient-to-r from-primary-600 to-accent-500 dark:from-primary-800 dark:to-accent-800">
          {college.bannerImage && (
            <img
              src={college.bannerImage}
              alt={college.name}
              className="w-full h-full object-cover opacity-20 mix-blend-overlay"
            />
          )}
        </div>

        <div className="container-narrow relative -mt-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 mb-6"
          >
            <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg mb-4 sm:mb-0 sm:mr-6 flex-shrink-0 bg-white dark:bg-gray-800">
              <img
                src={college.logo}
                alt={college.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold mb-1">{college.name}</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-2">{college.location}</p>
              <p className="text-sm font-medium text-primary-600 dark:text-primary-400">
                {collegeConfessions.length} confessions
              </p>
            </div>
          </motion.div>

          <div className="mb-6">
            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              onChange={(id) => setActiveTab(id)}
            />
          </div>

          {loading ? (
            <ConfessionLoader/>
          ) : error ? (
            <div className="text-center py-12 text-red-500">
              {error}
            </div>
          ) : sortedConfessions.length > 0 ? (
            <ConfessionList confessions={sortedConfessions} />
          ) : (
            <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-xl shadow-sm">
              <p className="text-gray-600 dark:text-gray-400">No confessions yet</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Be the first to confess!</p>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => setIsNewConfessionOpen(true)}
        className="btn-fab"
        aria-label="New confession"
      >
        <Plus size={24} />
      </button>

      <NewConfessionModal
        isOpen={isNewConfessionOpen}
        onClose={() => setIsNewConfessionOpen(false)}
        collegeId={collegeId}
        setConfessions={setConfessions}
      />
    </Layout>
  );
};

export default CollegePage;
