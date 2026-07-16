import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../components/common/Button';

const CreatePassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!password || !confirmPassword) {
      setError('Please fill out both password fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    
    setIsLoading(true);

    // Simulate network request
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      
      // Delay navigation to show success message
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-paper flex flex-col items-center justify-center p-6 text-navy">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[420px]"
      >
        <div className="card-glass p-8">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-black tracking-tight mb-2">Create Password</h2>
            <p className="text-text-secondary text-sm font-medium">Please set a new secure password to continue.</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-danger-light text-danger text-sm text-center">
              {error}
            </div>
          )}

          {isSuccess && (
            <div className="mb-4 p-3 rounded-xl bg-success-light text-success text-sm text-center font-bold">
              Password successfully set! Redirecting...
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[13px] font-bold text-navy mb-2 ml-1">New Password</label>
              <input 
                type="password" 
                className="input-tactile"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading || isSuccess}
              />
            </div>

            <div>
              <label className="block text-[13px] font-bold text-navy mb-2 ml-1">Confirm New Password</label>
              <input 
                type="password" 
                className="input-tactile"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading || isSuccess}
              />
            </div>

            <Button type="submit" variant="gold" className="w-full mt-4 h-[52px]" isLoading={isLoading} disabled={isSuccess}>
              Set Password & Login
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default CreatePassword;
