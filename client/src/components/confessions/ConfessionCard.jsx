import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { Button } from '../ui/button';
import { Heart, MessageCircle, Flag, User, School } from 'lucide-react';
import { motion } from 'framer-motion';
import { getTagIcon } from '../../data/mockData';
import { colleges } from '../../data/mockData';



const ConfessionCard = ({
  confession,
  onCommentClick,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(confession.likes);
  const [isExpanded, setIsExpanded] = useState(false);

  const college = colleges.find(c => c.id === confession.collegeId);

  const toggleLike = () => {
    if (isLiked) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }
    setIsLiked((prev) => !prev);
  };

  const handleCommentClick = () => {
    onCommentClick(confession);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card p-4 mb-4"
    >
      <div className="flex items-center mb-3">
        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden mr-3">
          {confession.author.avatar ? (
            <img
              src={confession.author.avatar}
              alt={confession.author.handle || 'Anonymous'}
              className="h-full w-full object-cover"
            />
          ) : (
            <User size={20} className="text-gray-500 dark:text-gray-400" />
          )}
        </div>
        <div className="flex-grow">
          <p className="font-medium">
            {confession.author.isAnonymous
              ? 'Anonymous'
              : `@${confession.author.handle}`}
          </p>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <time className="mr-2">
              {new Date(confession.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </time>
            {college && (
              <>
                <span className="mx-2">•</span>
                <Link 
                  to={`/college/${college.id}`}
                  className="flex items-center hover:text-primary-500 transition-colors"
                >
                  <School size={14} className="mr-1" />
                  {college.name}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mb-3">
        <p
          className={cn(
            'text-gray-800 dark:text-gray-200',
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

      {confession.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {confession.tags.map((tag) => {
            const TagIcon = getTagIcon(tag);
            return (
              <Link
                key={tag}
                to={`/tag/${tag}`}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <TagIcon size={12} className="mr-1" />
                #{tag}
              </Link>
            );
          })}
        </div>
      )}

      <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleLike}
          className={cn(
            'text-gray-600 dark:text-gray-400',
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
          className="text-gray-600 dark:text-gray-400"
        >
          <MessageCircle size={18} className="mr-1" />
          {confession.comments}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="text-gray-600 dark:text-gray-400"
        >
          <Flag size={18} />
        </Button>
      </div>
    </motion.div>
  );
};

export default ConfessionCard;