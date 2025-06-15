import React from 'react';
import Layout from '../components/layout/Layout';
import ConfessionList from '../components/confessions/ConfessionList';
import { confessions } from '../data/mockData';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { useEffect } from 'react';
import axios from 'axios';
import ConfessionLoader from '../components/loader/Loader';

const NewPage = () => {

    const [confessions, setConfessions] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/confession-routes/`)
      .then((response) => {
        console.log('Confessions fetched:', response.data.data);
          const newConfessions = [...response.data.data].sort((a, b) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          });
        setConfessions(newConfessions || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching confessions:', error);
        setLoading(false);
      });
  }, []);
  


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

        {
          loading? <ConfessionLoader/> : <ConfessionList confessions={confessions} />
        }

      </div>
    </Layout>
  );
};

export default NewPage;