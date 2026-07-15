import React from 'react';

const Badge = ({ children, variant = 'info', className = '' }) => {
  const variants = {
    success: 'badge-success',
    danger: 'badge-danger',
    warning: 'badge-warning',
    info: 'badge-info',
    neutral: 'px-3 py-1.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-600',
  };

  return (
    <span className={`inline-flex items-center justify-center ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
