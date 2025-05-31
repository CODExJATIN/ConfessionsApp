import React from 'react';
import { Link } from 'react-router-dom';

import { MapPin, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';



const CollegeCard = ({ college }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="card overflow-hidden"
    >
      <Link to={`/college/${college.id}`} className="block h-full">
        <div className="aspect-video relative overflow-hidden">
          <img 
            src={college.logo} 
            alt={college.name} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 line-clamp-1">{college.name}</h3>
          <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-2">
            <MapPin size={14} className="mr-1" />
            <span>{college.location}</span>
          </div>
          <div className="flex items-center text-primary-500 text-sm font-medium">
            <MessageCircle size={14} className="mr-1" />
            <span>{college.confessionCount} confessions</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CollegeCard;