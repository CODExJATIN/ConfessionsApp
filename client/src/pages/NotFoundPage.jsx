import React from 'react';
import Layout from '../components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container-narrow py-20 text-center">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="text-6xl font-bold text-primary-600 dark:text-primary-400 mb-4"
        >
          404
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-xl text-gray-600 dark:text-gray-400 mb-8"
        >
          Oops! The page you're looking for doesn't exist.
        </motion.p>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-lg text-lg font-medium shadow-sm transition duration-300"
        >
          Go to Home
        </motion.button>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
