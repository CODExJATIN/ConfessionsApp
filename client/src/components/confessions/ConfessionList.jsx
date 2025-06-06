import React, { useState } from 'react';
import ConfessionCard from './ConfessionCard';
import CommentsDrawer from './CommentsDrawer';


const ConfessionList = ({ confessions }) => {
  const [selectedConfession, setSelectedConfession] = useState(null);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  const handleCommentClick = (confession) => {
    setSelectedConfession(confession);
    setIsCommentsOpen(true);
  };

  const handleCloseComments = () => {
    setSelectedConfession(null);
    setIsCommentsOpen(false);
  };

  return (
    <div>
      {confessions.map((confession) => (
        <ConfessionCard
          key={confession.id}
          confession={confession}
          onCommentClick={handleCommentClick}
        />
      ))}
      
      {selectedConfession && (
        <CommentsDrawer
          confession={selectedConfession}
          isOpen={isCommentsOpen}
          onClose={handleCloseComments}
        />
      )}
    </div>
  );
};

export default ConfessionList;