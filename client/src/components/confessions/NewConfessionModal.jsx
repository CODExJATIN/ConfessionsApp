import React, { useState } from 'react';
import { Button } from '../ui/button';
import { X, Tag as TagIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
import axios from 'axios';
import { useUser } from '../../store/useUser';
import { isAbusive } from '../../utils/abuseCheck';

const popularTags = ['crush', 'tech', 'hostel', 'food', 'professor', 'exam', 'fail', 'success', 'funny', 'rant'];

const NewConfessionModal = ({
  isOpen,
  onClose,
  collegeId,
  setConfessions
}) => {
  const [confessionText, setConfessionText] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user = useUser((state) => state.user);
  
  const maxCharCount = 280;
  const charactersLeft = maxCharCount - confessionText.length;
  
  const handleTagToggle = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      if (selectedTags.length < 3) {
        setSelectedTags([...selectedTags, tag]);
      }
    }
  };

    const handleSubmit = async (e) => {
    e.preventDefault();
    if (!confessionText.trim()) return;

    setIsSubmitting(true);

    if(isAbusive(confessionText)) {
      alert("Your confession contains abusive language. Please revise it.");
      setIsSubmitting(false);
      return;
    }

    try {
      const body = {
        text: confessionText.trim(),
        collegeName: collegeId,
        tags: selectedTags,
      };

      const url = isAnonymous
        ? '/confession-routes/createAnonymousConfession'
        : '/confession-routes/createConfession';

      const headers = {
        'Content-Type': 'application/json',
      };

      if (!isAnonymous) {
        // Add Authorization header if authenticated
        // Assuming you store JWT token in localStorage or context
        const token = localStorage.getItem('token'); 
        if (!token) {
          alert("You must be logged in to post a confession with your ID!");
          setIsSubmitting(false);
          return;
        }
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await axios.post(import.meta.env.VITE_BASE_URL + url, body, { headers });
      // Handle response
      if (!response || !response.data) {
        throw new Error('No response from server');
      }

      const confession = response.data.data;
      console.log('Confession posted successfully:', confession);

      setConfessions((prev) => [confession, ...prev]); // Update confessions list

      // Success - reset form
      setConfessionText('');
      setSelectedTags([]);
      setIsAnonymous(true);
      onClose();
    } catch (error) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed bottom-16 inset-x-0 z-50 w-full md:top-1/4 md:left-1/2 md:bottom-auto md:right-auto md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-md bg-white dark:bg-gray-900 rounded-t-xl md:rounded-xl shadow-xl"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
              <h3 className="font-medium text-lg">New Confession</h3>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X size={20} />
              </Button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-4 max-h-[80vh] overflow-y-auto">
              <div className="mb-4">
                <textarea
                  value={confessionText}
                  onChange={(e) => setConfessionText(e.target.value)}
                  placeholder="What's on your mind?"
                  rows={5}
                  maxLength={maxCharCount}
                  className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-all"
                />
                <div className="flex justify-end mt-1">
                  <span className={cn(
                    "text-xs",
                    charactersLeft <= 20 ? "text-error-500" : "text-gray-500 dark:text-gray-400"
                  )}>
                    {charactersLeft} characters left
                  </span>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <TagIcon size={16} className="mr-1 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm font-medium">Tags (max 3)</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleTagToggle(tag)}
                      className={cn(
                        "px-2.5 py-1 rounded-full text-xs font-medium transition-colors",
                        selectedTags.includes(tag)
                          ? "bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                      )}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <span className="text-sm font-medium">Post as</span>
                </div>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={isAnonymous}
                      onChange={() => setIsAnonymous(true)}
                      className="mr-2 h-4 w-4 text-primary-500"
                    />
                    <span>Anonymous</span>
                  </label>
                {user.username!="" && <label className="flex items-center">
                  <input
                    type="radio"
                    checked={!isAnonymous}
                    onChange={() => setIsAnonymous(false)}
                    className="mr-2 h-4 w-4 text-primary-500"
                  />
                  <span>@{user.username}</span>
                </label>}
                </div>
              </div>
              
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isSubmitting}
                disabled={!confessionText.trim() || isSubmitting}
                className="w-full"
              >
                Post Confession
              </Button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NewConfessionModal;