import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../components/common/Button';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // If already logged in, bounce to dashboard
  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      return;
    }

    setIsLoading(true);

    // Simulate network request for auth
    setTimeout(() => {
      setIsLoading(false);
      // For this internal demo, we accept ANY non-empty username and password
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/dashboard', { replace: true });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col items-center justify-center p-6 text-navy relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-gold-light/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[30%] bg-navy/5 rounded-full blur-[80px] pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[440px] z-10"
      >
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-navy flex items-center justify-center shadow-lg mb-6">
            <span className="text-gold font-bold text-3xl">I</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-navy mb-2">InsightED</h1>
          <h2 className="text-lg font-semibold text-text-secondary mb-3">Educational Intelligence Platform</h2>
          <p className="text-sm text-text-secondary max-w-[300px] leading-relaxed">
            Helping teachers identify students who need support and reduce dropout rates.
          </p>
        </div>

        <div className="card-glass p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50">
          
          {error && (
            <div className="mb-6 p-3 rounded-xl bg-danger-light text-danger text-sm text-center font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[13px] font-bold text-navy mb-2 ml-1">Username</label>
              <input 
                type="text" 
                className="input-tactile bg-white/60 focus:bg-white"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-[13px] font-bold text-navy mb-2 ml-1">Password</label>
              <input 
                type="password" 
                className="input-tactile bg-white/60 focus:bg-white"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <Button type="submit" variant="gold" className="w-full mt-2 h-[52px] text-base font-bold shadow-md hover:shadow-lg transition-all" isLoading={isLoading}>
              Sign In
            </Button>
          </form>

        </div>

        <div className="mt-8 text-center text-xs text-text-muted font-medium uppercase tracking-widest">
          For authorized teachers only.
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
