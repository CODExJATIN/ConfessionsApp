import React from 'react';
import CollegeCard from './CollegeCard';



const CollegeGrid = ({ colleges }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {colleges.map((college) => (
        <CollegeCard key={college.id} college={college} />
      ))}
    </div>
  );
};

export default CollegeGrid;