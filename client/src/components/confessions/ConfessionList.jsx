import React, { useState } from 'react';
import ConfessionCard from './ConfessionCard';
import CommentsDrawer from './CommentsDrawer';
import axios from 'axios';
import { toast } from 'react-toastify';

const ConfessionList = ({ confessions,setConfessions }) => {

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

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this confession?");
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/confession-routes/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      alert(res.data.message);

      // Remove the deleted confession from state
      setConfessions((prev) => prev.filter((conf) => conf._id !== id));
    } catch (error) {
      console.error("Error deleting confession:", error);
      alert(error.response?.data?.message || "Failed to delete confession.");
    }
  };

  return (
    <div>
      {confessions.map((confession) => (
        <ConfessionCard
          key={confession._id}
          confession={confession}
          onCommentClick={handleCommentClick}
          onDelete={handleDelete} 
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
