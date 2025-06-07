import React from 'react';
import Layout from '../components/layout/Layout';
import ConfessionList from '../components/confessions/ConfessionList';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import { useEffect } from 'react';
import axios from 'axios';
import ConfessionLoader from '../components/loader/Loader';

const TrendingPage = () => {

  const [confessions, setConfessions] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/confession-routes/`)
      .then((response) => {
          // Sort confessions by engagement (likes + comments * 2)
          console.log('Confessions fetched:', response.data.data);
          const trendingConfessions = [...response.data.data].sort((a, b) => {
            const engagementA = a.Likes.length + a.Comments.length * 2;
            const engagementB = b.Likes.length + b.Comments.length * 2;
            return engagementB - engagementA;
          });
        //console.log('Confessions fetched:', response.data.data);
        setConfessions(trendingConfessions || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching confessions:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return(<ConfessionLoader/>);
  }


  return (
    <Layout>
      <div className="container-narrow py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center mb-8"
        >
          <Flame size={24} className="text-primary-500 mr-2" />
          <h1 className="text-2xl font-bold">Trending Confessions</h1>
        </motion.div>

        <ConfessionList confessions={confessions} />
      </div>
    </Layout>
  );
};

export default TrendingPage;