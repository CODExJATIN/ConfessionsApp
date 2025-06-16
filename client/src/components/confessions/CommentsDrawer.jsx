import React, { useState } from 'react';
import { Button } from '../ui/button';
import { X, User, Send } from 'lucide-react';

import { comments } from '../../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { use } from 'react';

import { useEffect } from 'react';
import { useUser } from '../../store/useUser';
import axios from 'axios';
import { isAbusive } from '../../utils/abuseCheck';


const CommentsDrawer = ({
  confession,
  isOpen,
  onClose,
}) => {
  const [newComment, setNewComment] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = useUser((state) => state.user);
  
  // Filter comments for this confession
  const confessionComments = confession?.Comments;

  const [commentList, setCommentList] = useState(confessionComments || []);

  useEffect(() => {
    if (confession) {
      console.log('Confession Comments:', confessionComments);
    }
  }, [confession, confessionComments]);



  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {

      // Check for abusive language

      if(isAbusive(newComment)) {
        alert("Your comment contains abusive language. Please revise it.");
        return;
      }


      // Post new comment to backend

      axios.post(`${import.meta.env.VITE_BASE_URL}/comment-routes/`, {
        confessionId: confession._id,
        text: newComment,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }).then((response) => {
        console.log('Comment created:', response.data);
        // Update comment list with new comment
        setCommentList((prevComments) => [
          ...prevComments,
          {
            id: response.data.data._id,
            Text: newComment,
            User: {
              Username: user.username,
              FullName: user.fullname,
              isAdmin: user.isAdmin
            },
            createdAt: new Date().toISOString(),
          },
        ]);
        setNewComment('');
      }).catch((error) => {
        console.error('Error creating comment:', error);
      });
    }
  };

    useEffect(() => {

    if(user.username!=""){
      setIsLoggedIn(true);
    }

  },[]);

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
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30 }}
            className="fixed bottom-0 inset-x-0 z-50 bg-white dark:bg-gray-900 rounded-t-xl shadow-lg max-h-[80vh] overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
              <h3 className="font-medium text-lg">Comments ({confessionComments.length})</h3>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X size={20} />
              </Button>
            </div>
            
            <div className="overflow-y-auto flex-grow p-4">
              {commentList.length > 0 ? (
                commentList.map((comment) => (
                  <CommentItem key={comment._id} comment={comment} />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center text-gray-500 dark:text-gray-400">
                  <MessageCircleIcon className="w-12 h-12 mb-3 opacity-20" />
                  <p>No comments yet</p>
                  <p className="text-sm">Be the first to comment!</p>
                </div>
              )}
            </div>
            
            <div className="p-4 mb-20 border-t border-gray-200 dark:border-gray-800">
              {isLoggedIn ? (
                <form onSubmit={handleSubmit} className="flex items-center">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="input flex-grow mr-2"
                  />
                  <Button type="submit" disabled={!newComment.trim()}>
                    <Send size={16} />
                  </Button>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center py-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Log in to join the conversation
                  </p>
                  <Button
                   onClick={() => window.location.href = '/auth'}
                   variant="primary" size="sm">
                    Log In
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const CommentItem = ({ comment }) => {
  return (
    <div className="flex mb-4">
      <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden mr-3 flex-shrink-0">
          <div className="text-gray-800 dark:text-gray-200 font-medium">
            {comment.User.FullName.charAt(0).toUpperCase()}
          </div>
      </div>
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 flex-grow">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">
              @{comment.User.Username}
            </span>
            {comment.User?.isAdmin && (
              <img
                src="/vip.png"
                alt="Admin badge"
                className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
                title="Admin"
              />
            )}
          </div>

          <span className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(comment.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>
        <p className="text-sm text-gray-800 dark:text-gray-200">{comment.Text}</p>
      </div>
    </div>
  );
};

// Custom message circle icon for empty state
const MessageCircleIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

export default CommentsDrawer;