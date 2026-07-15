import React from 'react';

const Avatar = ({ name, url, size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
    xl: 'w-24 h-24 text-2xl',
  };

  const getInitials = (name) => {
    if (!name) return '??';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className={`relative inline-flex items-center justify-center rounded-full overflow-hidden shrink-0 ${sizes[size]} ${className}`}>
      {url ? (
        <img src={url} alt={name} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-navy-muted text-white font-semibold">
          {getInitials(name)}
        </div>
      )}
    </div>
  );
};

export default Avatar;
