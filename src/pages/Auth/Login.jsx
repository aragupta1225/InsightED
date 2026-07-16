import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import Button from '../../components/common/Button';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
        className="w-full max-w-[680px] z-10"
      >
        <div className="flex flex-col items-center mb-2 text-center">
          <img src="/logo.png" alt="InsightED Logo" className="w-[440px] h-auto object-contain mix-blend-multiply" />
        </div>

        <div className="card-glass p-12 shadow-[0_8px_40px_rgba(31,38,135,0.06)] border border-white/60 rounded-[32px] bg-white">
          
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-danger-light text-danger text-sm text-center font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-8">
            <div>
              <label className="block text-[15px] font-bold text-navy mb-2 ml-1">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-secondary">
                  <User size={20} strokeWidth={2.5} className="opacity-80" />
                </div>
                <input 
                  type="text" 
                  className="input-tactile bg-white focus:bg-white w-full rounded-2xl pl-12 py-5 border border-border-subtle shadow-sm text-[15px]"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="block text-[15px] font-bold text-navy mb-2 ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-secondary">
                  <Lock size={20} strokeWidth={2.5} className="opacity-80" />
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="input-tactile bg-white focus:bg-white w-full rounded-2xl pl-12 pr-12 py-5 border border-border-subtle shadow-sm text-[15px]"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-muted cursor-pointer hover:text-navy transition-colors outline-none"
                >
                  {showPassword ? (
                    <EyeOff size={20} strokeWidth={2.5} />
                  ) : (
                    <Eye size={20} strokeWidth={2.5} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-5 bg-white rounded-2xl border border-border-subtle shadow-sm hover:border-[#E89BAA]/30 transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <input 
                  type="checkbox" 
                  id="robot" 
                  className="w-5 h-5 rounded-[6px] border-2 border-text-muted/40 text-[#1E2B59] focus:ring-[#1E2B59] cursor-pointer accent-[#1E2B59]" 
                />
                <label htmlFor="robot" className="text-[15px] font-semibold text-navy cursor-pointer">I'm not a robot</label>
              </div>
              <ShieldCheck size={26} strokeWidth={2} className="text-[#E89BAA]" />
            </div>

            <Button type="submit" className="w-full mt-2 h-16 bg-[#1a1a1a] text-white text-[17px] font-bold shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-lg hover:-translate-y-0.5 transition-all rounded-[14px]" isLoading={isLoading}>
              Sign In
            </Button>
          </form>

        </div>

        <div className="mt-8 text-center text-xs text-text-muted/60 font-semibold tracking-[0.1em]">
          FOR AUTHORIZED TEACHERS ONLY.
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
