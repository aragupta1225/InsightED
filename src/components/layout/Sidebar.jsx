import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, BarChart3, CalendarCheck, Settings, LogOut, X } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../common/Button';

const menuItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/classes', icon: Users, label: 'Classes' },
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
      // Simulate clearing auth and logging out
      setIsLoggingOut(false);
      navigate('/login');
    }, 1000);
  };

  const NavItem = ({ item }) => {
    const isActive = location.pathname.startsWith(item.path);
    const Icon = item.icon;

    return (
      <NavLink
        to={item.path}
        onClick={() => setIsOpen(false)} // close sidebar on mobile after click
        className={`relative flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 outline-none ${
          isActive ? 'text-navy font-semibold' : 'text-text-secondary hover:text-navy hover:bg-paper-light'
        }`}
      >
        {isActive && (
          <motion.div
            layoutId="activeTab"
            className="absolute inset-0 bg-gold-light rounded-2xl -z-10"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        )}
        <Icon size={22} className={isActive ? 'text-gold' : ''} />
        <span>{item.label}</span>
      </NavLink>
    );
  };

  return (
    <div className={`fixed left-0 top-0 h-screen w-[260px] bg-surface backdrop-blur-md border-r border-border-subtle flex flex-col z-40 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
      <div className="p-8 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-navy flex items-center justify-center shadow-md">
            <span className="text-gold font-bold text-xl">I</span>
          </div>
          <span className="text-xl font-bold text-navy tracking-tight">InsightED</span>
        </div>
        <button onClick={() => setIsOpen(false)} className="lg:hidden p-2 text-text-secondary hover:text-navy hover:bg-paper-light rounded-xl">
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 px-4 py-2 flex flex-col gap-2 overflow-y-auto">
        <div className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2 px-4">Menu</div>
        {menuItems.map(item => <NavItem key={item.path} item={item} />)}
      </div>

      <div className="p-4 flex flex-col gap-2 border-t border-border-subtle">
        {bottomItems.map(item => <NavItem key={item.path} item={item} />)}
        <Button 
          variant="ghost"
          onClick={handleLogout}
          isLoading={isLoggingOut}
          className="flex items-center justify-start gap-3 px-4 py-3 rounded-2xl text-text-secondary hover:text-danger hover:bg-danger-light transition-all duration-300 w-full"
        >
          <LogOut size={22} />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
