import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Database, BarChart3, CalendarCheck, Settings, LogOut, X } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../common/Button';

const menuItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/classes', icon: Users, label: 'Classes' },
  { path: '/import-data', icon: Database, label: 'Import Data' },
  { path: '/performance', icon: BarChart3, label: 'Performance' },
  { path: '/attendance', icon: CalendarCheck, label: 'Attendance' },
];

const bottomItems = [
  { path: '/settings', icon: Settings, label: 'Settings' },
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      // Clear auth state
      localStorage.removeItem('isLoggedIn');
      setIsLoggingOut(false);
      navigate('/login');
    }, 600);
  };

  const NavItem = ({ item }) => {
    const isActive = location.pathname.startsWith(item.path);
    const Icon = item.icon;

    return (
      <NavLink
        to={item.path}
        onClick={() => setIsOpen(false)} // close sidebar on mobile after click
        className={`relative flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 outline-none ${
          isActive ? 'text-white font-semibold' : 'text-text-muted hover:text-white hover:bg-white/5'
        }`}
      >
        {isActive && (
          <motion.div
            layoutId="activeTab"
            className="absolute inset-0 bg-rose rounded-2xl -z-10"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        )}
        <Icon size={22} className={isActive ? 'text-white' : ''} />
        <span>{item.label}</span>
      </NavLink>
    );
  };

  return (
    <div className={`fixed left-0 top-0 h-screen w-[260px] bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] flex flex-col z-40 transition-transform duration-300 overflow-hidden ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
      
      {/* Subtle texture/glow for premium depth */}
      <div className="absolute top-[-10%] left-[-20%] w-[150%] h-[40%] bg-white/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="pt-10 pb-6 flex items-start justify-center relative z-10 px-4">
        <img src="/logo.png" alt="InsightED Logo" className="w-[180px] h-auto object-contain mx-auto" />
        <button onClick={() => setIsOpen(false)} className="lg:hidden absolute right-4 top-6 p-2 text-text-muted hover:text-white hover:bg-white/10 rounded-xl transition-all">
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 px-4 py-2 flex flex-col gap-2 overflow-y-auto mt-2">
        {menuItems.map(item => <NavItem key={item.path} item={item} />)}
      </div>

      <div className="p-4 flex flex-col gap-2 border-t border-white/10">
        {bottomItems.map(item => <NavItem key={item.path} item={item} />)}
        <Button 
          variant="ghost"
          onClick={handleLogout}
          isLoading={isLoggingOut}
          className="flex items-center justify-start gap-3 px-4 py-3 rounded-2xl text-text-muted hover:text-danger hover:bg-white/5 transition-all duration-300 w-full"
        >
          <LogOut size={22} />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
