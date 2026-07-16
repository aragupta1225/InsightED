import React from 'react';
import { Bell, Menu } from 'lucide-react';
import Avatar from '../common/Avatar';
import Badge from '../common/Badge';
import { teacherData } from '../../data/mockData';

const Topbar = ({ onMenuClick }) => {
  return (
    <div className="h-[90px] flex items-center justify-between sticky top-0 bg-paper/80 backdrop-blur-lg z-10 -mx-4 px-4 md:-mx-8 md:px-8 mb-8">
      
      <button 
        onClick={onMenuClick}
        className="lg:hidden p-2 text-text-secondary hover:text-navy hover:bg-paper-light rounded-xl transition-colors"
      >
        <Menu size={24} />
      </button>

      {/* Spacer to push right content if menu button is shown */}
      <div className="flex-1 hidden lg:block"></div>

      <div className="flex items-center gap-4 md:gap-6 ml-auto">
        <button className="relative p-2 text-text-secondary hover:text-navy hover:bg-paper-light rounded-xl transition-colors">
          <Bell size={24} />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-danger rounded-full border-2 border-paper"></span>
        </button>
        
        <div className="h-8 w-px bg-border-subtle hidden md:block"></div>

        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-navy">{teacherData.name}</p>
            <p className="text-xs text-text-secondary">{teacherData.role}</p>
          </div>
          <div className="relative">
            <Avatar name={teacherData.name} size="md" className="group-hover:ring-2 ring-gold transition-all" />
            <Badge variant="success" className="absolute -bottom-1 -right-1 w-4 h-4 !p-0 border-2 border-white text-[0px]">Active</Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
