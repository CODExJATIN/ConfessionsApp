import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { Button } from '../ui/button';
import { Heart, MessageCircle, Flag, User, School } from 'lucide-react';
import { motion } from 'framer-motion';
import { getTagIcon } from '../../data/mockData';
import { colleges } from '../../data/mockData';
import { useUser } from '../../store/useUser';
import axios from 'axios';

const ConfessionCard = ({ confession, onCommentClick }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(confession.Likes?.length || 0);
  const [isExpanded, setIsExpanded] = useState(false);
  const user = useUser((state) => state.user);

  useEffect(() => {
    if (user && confession.Likes) {
      const hasLiked = confession.Likes.some((like) => like.LikedBy._id === user.id);
      setIsLiked(hasLiked);
    }
  }, [user, confession.Likes]);

  const college = colleges.find((c) => c.id === confession.college);

  const toggleLike = () => {
    if (!user || !user.id) {
      alert('Please log in to like confessions');
      return;
    }
    if (isLiked) {
      setLikeCount((prev) => Math.max(prev - 1, 0));
      axios.delete(`${import.meta.env.VITE_BASE_URL}/like-routes/${confession._id}/unlike`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }).then((res) => console.log('Like removed:', res.data))
        .catch((err) => console.error('Error removing like:', err));
    } else {
      setLikeCount((prev) => prev + 1);
      axios.post(`${import.meta.env.VITE_BASE_URL}/like-routes/${confession._id}/like`, {
        confessionId: confession._id,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }).then((res) => console.log('Like added:', res.data))
        .catch((err) => console.error('Error adding like:', err));
    }
    setIsLiked((prev) => !prev);
  };

  const handleCommentClick = () => onCommentClick(confession);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card p-3 sm:p-4 mb-4 rounded-xl shadow-sm bg-white dark:bg-gray-900"
    >
      {/* Avatar + Info Row */}
      <div className="flex gap-3 mb-3">
        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
          {confession.author?.avatar ? (
            <img
              src={confession.author.avatar}
              alt={confession.author.handle || 'Anonymous'}
              className="h-full w-full object-cover"
            />
          ) : (
            <User size={20} className="text-gray-500 dark:text-gray-400" />
          )}
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-sm sm:text-base font-medium text-gray-800 dark:text-gray-200">
            {confession.owner ? `@${confession.ownner.Username}` : 'Anonymous'}
            <time className="text-xs text-gray-500 dark:text-gray-400">
              {new Date(confession.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </time>
          </div>
          {college && (
            <Link
              to={`/college/${college.id}`}
              className="flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-primary-500 transition-colors mt-0.5"
            >
              <School size={14} className="mr-1" />
              {college.name}
            </Link>
          )}
        </div>
      </div>

      {/* Confession Text */}
      <div className="mb-3">
        <p
          className={cn(
            'text-gray-800 dark:text-gray-200 text-sm sm:text-base',
            !isExpanded && confession.text.length > 180 && 'line-clamp-3'
          )}
        >
          {confession.text}
        </p>
        {confession.text.length > 180 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-primary-500 mt-1 hover:underline"
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>

      {/* Tags */}
      {/* Tags */}
{confession.tags?.length > 0 && (
  <div className="flex flex-wrap gap-2 mb-4">
    {confession.tags.map((tag) => {
      const TagIcon = getTagIcon(tag)? getTagIcon(tag) : () => <></>;

      // Define some random tag background color classes
      const bgColors = [
        'bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-100',
        'bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100',
        'bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100',
        'bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-100',
        'bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-100',
        'bg-pink-100 dark:bg-pink-800 text-pink-800 dark:text-pink-100',
        'bg-indigo-100 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-100',
        'bg-orange-100 dark:bg-orange-800 text-orange-800 dark:text-orange-100',
      ];

      // Deterministic color based on hash of tag name
      const colorClass = bgColors[Math.abs([...tag].reduce((acc, ch) => acc + ch.charCodeAt(0), 0)) % bgColors.length];

      return (
        <Link
          key={tag}
          to={`/tag/${tag}`}
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors hover:opacity-90 ${colorClass}`}
        >
          <TagIcon size={12} className="mr-1" />
          #{tag}
        </Link>
      );
    })}
  </div>
)}


      {/* Buttons */}
      <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 border-t border-gray-100 dark:border-gray-800 pt-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleLike}
          className={cn(
            'text-gray-600 dark:text-gray-400 flex-1 sm:flex-none',
            isLiked && 'text-accent-500 dark:text-accent-400'
          )}
        >
          <Heart
            size={18}
            className={cn(
              'mr-1',
              isLiked && 'fill-accent-500 dark:fill-accent-400'
            )}
          />
          {likeCount}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleCommentClick}
          className="text-gray-600 dark:text-gray-400 flex-1 sm:flex-none"
        >
          <MessageCircle size={18} className="mr-1" />
          {confession.Comments?.length || 0}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="text-gray-600 dark:text-gray-400 flex-1 sm:flex-none"
          aria-label="Report confession"
        >
          <Flag size={18} />
        </Button>
      </div>
    </motion.div>
  );
};

export default ConfessionCard;
