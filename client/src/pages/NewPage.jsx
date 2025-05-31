import React from 'react';
import Layout from '../components/layout/Layout';
import ConfessionList from '../components/confessions/ConfessionList';
import { confessions } from '../data/mockData';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

const NewPage = () => {
  // Sort confessions by date
  const newConfessions = [...confessions].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
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
          <Clock size={24} className="text-primary-500 mr-2" />
          <h1 className="text-2xl font-bold">Latest Confessions</h1>
        </motion.div>

        <ConfessionList confessions={newConfessions} />
      </div>
    </Layout>
  );
};

export default NewPage;