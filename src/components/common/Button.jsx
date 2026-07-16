import React from 'react';
import LoadingSpinner from './LoadingSpinner';

const Button = ({ children, variant = 'primary', className = '', onClick, type = 'button', disabled = false, isLoading = false, ...props }) => {
  
  const baseStyles = `btn-${variant} ${className} flex items-center justify-center gap-2 relative`;
  const disabledStyles = disabled || isLoading ? 'opacity-60 cursor-not-allowed active:scale-100 hover:brightness-100' : '';

  return (
    <button 
      type={type}
      className={`${baseStyles} ${disabledStyles}`}
      onClick={onClick}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <LoadingSpinner size={18} className={variant === 'outline' ? 'text-navy' : 'text-white'} />
      )}
      <span className={isLoading ? 'opacity-0' : 'opacity-100 flex items-center gap-2'}>
        {children}
      </span>
      {/* If loading, keep the text for width but make it invisible, and absolutely position the spinner */}
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner size={18} className={variant === 'outline' ? 'text-navy' : 'text-white'} />
        </span>
      )}
    </button>
  );
};

export default Button;
