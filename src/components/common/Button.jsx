import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center gap-2 transition-all duration-200 outline-none disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'btn-primary',
    gold: 'btn-gold',
    outline: 'btn-outline',
    ghost: 'bg-transparent text-text-secondary hover:text-navy hover:bg-border-subtle px-4 py-2 rounded-xl font-medium active:scale-[0.98]',
  };

  return (
    <button className={`${baseClasses} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
