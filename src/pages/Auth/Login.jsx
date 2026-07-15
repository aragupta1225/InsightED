import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../components/common/Logo';
import { motion } from 'framer-motion';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRobot, setIsRobot] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'ananya.maths' && password === 'teacher123' && isRobot) {
      navigate('/dashboard');
    } else {
      alert('Invalid credentials or verification failed. Use dummy credentials.');
    }
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
          <Logo size="lg" />
        </div>

        <div className="card-glass p-8 relative overflow-hidden">
          {/* Decorative subtle gradient */}
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-gold blur-3xl opacity-[0.08]" />

          <div className="mb-8 text-center relative z-10">
            <h2 className="text-2xl font-black tracking-tight mb-2">Teacher Portal</h2>
            <p className="text-text-secondary text-sm font-medium">Sign in to Insight Public School</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[13px] font-bold text-navy mb-2 ml-1">Username</label>
              <input 
                type="text" 
                className="input-tactile"
                placeholder="ananya.maths"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-[13px] font-bold text-navy mb-2 ml-1">Password</label>
              <input 
                type="password" 
                className="input-tactile"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="bg-paper-light border border-border-subtle rounded-xl p-4 flex items-center gap-3">
              <input 
                type="checkbox" 
                id="robot"
                checked={isRobot}
                onChange={(e) => setIsRobot(e.target.checked)}
                className="w-5 h-5 rounded border-2 border-text-muted accent-navy cursor-pointer"
              />
              <label htmlFor="robot" className="text-sm font-medium cursor-pointer">
                I'm not a robot
              </label>
            </div>

            <button type="submit" className="btn-gold w-full mt-4 h-[52px]">
              Login
            </button>
          </form>

          <div className="mt-6 p-4 rounded-xl bg-blue-50/50 border border-blue-100 text-[12px] text-text-secondary">
            <span className="font-bold text-navy">Demo Credentials:</span><br/>
            Username: ananya.maths<br/>
            Password: teacher123<br/>
            Note: Must check the box.
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
