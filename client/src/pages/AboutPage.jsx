import React from 'react';
import Layout from '../components/layout/Layout';
import { motion } from 'framer-motion';
import { Heart, Shield, Users, MessageCircle } from 'lucide-react';

const AboutPage = () => {
  return (
    <Layout>
      <div className="container-narrow py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">About College Confessions</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Creating a safe space for college students to share their thoughts, confessions, and stories.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card p-6"
          >
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              College life is full of experiences, emotions, and stories that deserve to be shared. 
              Our mission is to provide a platform where students can express themselves freely, 
              connect with peers, and find community through shared experiences.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Whether it's a heartfelt crush confession, a funny incident, or just something you need to get 
              off your chest, we're here to be your digital confidant.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="card p-6"
          >
            <h2 className="text-2xl font-bold mb-4">How It Works</h2>
            <ul className="space-y-4 text-gray-600 dark:text-gray-400">
              <li className="flex">
                <span className="mr-3 text-primary-500">1.</span>
                <span>Find your college from our growing list of institutions</span>
              </li>
              <li className="flex">
                <span className="mr-3 text-primary-500">2.</span>
                <span>Write your confession, add relevant tags, and choose to post anonymously or with your handle</span>
              </li>
              <li className="flex">
                <span className="mr-3 text-primary-500">3.</span>
                <span>Engage with confessions by liking, commenting, and sharing your thoughts</span>
              </li>
              <li className="flex">
                <span className="mr-3 text-primary-500">4.</span>
                <span>Connect with fellow students who relate to your experiences</span>
              </li>
            </ul>
          </motion.div>
        </div>
        
        <h2 className="text-2xl font-bold mb-6 text-center">Our Core Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <CoreValueCard
            icon={<Shield className="w-10 h-10 text-primary-500" />}
            title="Privacy First"
            description="We prioritize your privacy and give you control over how you share your stories."
            delay={0.4}
          />
          <CoreValueCard
            icon={<Heart className="w-10 h-10 text-accent-500" />}
            title="Empathy"
            description="We foster a community built on understanding, compassion, and support."
            delay={0.5}
          />
          <CoreValueCard
            icon={<Users className="w-10 h-10 text-success-500" />}
            title="Community"
            description="We believe in creating spaces where students can find belonging and connection."
            delay={0.6}
          />
          <CoreValueCard
            icon={<MessageCircle className="w-10 h-10 text-warning-500" />}
            title="Expression"
            description="We encourage authentic self-expression and honest conversations."
            delay={0.7}
          />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="card p-8 text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Every college has its unique culture, traditions, and stories. 
            Be part of a platform that celebrates the authentic college experience 
            and connects students across campuses.
          </p>
          <div className="inline-flex rounded-md shadow">
            <a
              href="/"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
            >
              Start Confessing
            </a>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};



const CoreValueCard = ({
  icon,
  title,
  description,
  delay,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="card p-6 text-center"
    >
      <div className="mx-auto mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </motion.div>
  );
};

export default AboutPage;