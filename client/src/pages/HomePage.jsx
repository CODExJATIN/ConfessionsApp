import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import CollegeGrid from '../components/colleges/CollegeGrid';
import NewConfessionModal from '../components/confessions/NewConfessionModal';
import { Search } from 'lucide-react';
import { colleges } from '../data/mockData';
import { motion } from 'framer-motion';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewConfessionOpen, setIsNewConfessionOpen] = useState(false);
  
  const filteredColleges = colleges.filter((college) =>
    college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    college.location.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <Layout>
      <div className="container-narrow py-8">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent dark:from-primary-400 dark:to-accent-400"
          >
            Confessions 💬
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Share your thoughts, confessions, and stories from college life - anonymously or not, it's up to you!
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative max-w-xl mx-auto mb-12"
        >
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
          <input 
            type="text" 
            placeholder="Search your college..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input pl-12 py-3 h-14 w-full text-lg shadow-sm"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold mb-6">Popular Colleges</h2>
          
          {filteredColleges.length > 0 ? (
            <CollegeGrid colleges={filteredColleges} />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">No colleges found matching "{searchQuery}"</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Try a different search term</p>
            </div>
          )}
        </motion.div>
      </div>
      
      <NewConfessionModal
        isOpen={isNewConfessionOpen}
        onClose={() => setIsNewConfessionOpen(false)}
      />
    </Layout>
  );
};

export default HomePage;