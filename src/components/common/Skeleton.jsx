import React from 'react';

const Skeleton = ({ className = "" }) => {
  return (
    <div className={`animate-pulse bg-navy/10 rounded-xl ${className}`}></div>
  );
};

export default Skeleton;
