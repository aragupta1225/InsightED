import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../components/common/Button';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      return;
    }

    setIsLoading(true);

    // Simulate network request
    setTimeout(() => {
      setIsLoading(false);
      // Simulate first-time login check
      if (username === 'ananya.maths' && password === 'temp123') {
        navigate('/create-password');
      } else if (username === 'ananya.maths' && password === 'teacher123') {
        navigate('/dashboard');
      } else {
        setError('Invalid username or password.');
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-paper flex flex-col items-center justify-center p-6 text-navy">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[420px]"
      >
        <div className="flex justify-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-navy flex items-center justify-center shadow-md">
            <span className="text-gold font-bold text-3xl">I</span>
          </div>
        </div>

        <div className="card-glass p-8 relative overflow-hidden">
          <div className="mb-8 text-center relative z-10">
            <h2 className="text-2xl font-black tracking-tight mb-2">Teacher Portal</h2>
            <p className="text-text-secondary text-sm font-medium">Sign in to Insight Public School</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-danger-light text-danger text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5 relative z-10">
            <div>
              <label className="block text-[13px] font-bold text-navy mb-2 ml-1">Username</label>
              <input 
                type="text" 
                className="input-tactile"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-[13px] font-bold text-navy mb-2 ml-1">Password</label>
              <input 
                type="password" 
                className="input-tactile"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button type="submit" variant="gold" className="w-full mt-4 h-[52px]" isLoading={isLoading}>
              Login
            </Button>
          </form>

          <div className="mt-6 text-center text-[13px] text-text-secondary font-medium">
            Forgot Password? <span className="text-navy font-bold">Please contact your school administrator.</span>
          </div>

          <div className="mt-8 p-4 rounded-xl bg-gray-50 border border-gray-200 text-[12px] text-text-secondary">
            <span className="font-bold text-navy">Demo Logic:</span><br/>
            temp123 → Triggers new password creation<br/>
            teacher123 → Triggers normal login
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
