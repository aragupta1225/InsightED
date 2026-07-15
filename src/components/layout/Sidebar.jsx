import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, UserSquare, Brain, PieChart, FileText, Settings, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

const menuItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/students', icon: Users, label: 'Students' },
  { path: '/insights', icon: Brain, label: 'Learning Insights' },
  { path: '/analytics', icon: PieChart, label: 'Analytics' },
  { path: '/reports', icon: FileText, label: 'Reports' },
];

const bottomItems = [
  { path: '/settings', icon: Settings, label: 'Settings' },
];

const Sidebar = () => {
  const location = useLocation();

  const NavItem = ({ item }) => {
    const isActive = location.pathname.startsWith(item.path);
    const Icon = item.icon;

    return (
      <NavLink
        to={item.path}
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
    <div className="fixed left-0 top-0 h-screen w-[260px] bg-surface backdrop-blur-md border-r border-border-subtle flex flex-col z-20">
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-navy flex items-center justify-center shadow-md">
          <Brain className="text-gold" size={24} />
        </div>
        <span className="text-xl font-bold text-navy tracking-tight">InsightED</span>
      </div>

      <div className="flex-1 px-4 py-2 flex flex-col gap-2 overflow-y-auto">
        <div className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2 px-4">Menu</div>
        {menuItems.map(item => <NavItem key={item.path} item={item} />)}
      </div>

      <div className="p-4 flex flex-col gap-2 border-t border-border-subtle">
        {bottomItems.map(item => <NavItem key={item.path} item={item} />)}
        <button className="flex items-center gap-3 px-4 py-3 rounded-2xl text-text-secondary hover:text-danger hover:bg-danger-light transition-all duration-300 w-full">
          <LogOut size={22} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
