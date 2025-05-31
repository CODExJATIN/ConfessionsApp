import React from 'react';
import Layout from '../components/layout/Layout';
import ConfessionList from '../components/confessions/ConfessionList';
import { confessions } from '../data/mockData';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

const TrendingPage = () => {
  // Sort confessions by engagement (likes + comments * 2)
  const trendingConfessions = [...confessions].sort((a, b) => {
    const engagementA = a.likes + a.comments * 2;
    const engagementB = b.likes + b.comments * 2;
    return engagementB - engagementA;
  });

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

        <ConfessionList confessions={trendingConfessions} />
      </div>
    </Layout>
  );
};

export default TrendingPage;