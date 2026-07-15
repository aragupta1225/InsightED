import React from 'react';
import { Search, Bell } from 'lucide-react';
import Avatar from '../common/Avatar';
import Badge from '../common/Badge';

const Topbar = () => {
  return (
    <div className="h-[90px] flex items-center justify-between sticky top-0 bg-paper/80 backdrop-blur-lg z-10 -mx-8 px-8 mb-8">
      <div className="flex-1 max-w-md relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
        <input 
          type="text" 
          placeholder="Search students, insights, or reports..." 
          className="input-tactile pl-12"
        />
      </div>

      <div className="flex items-center gap-6 ml-4">
        <button className="relative p-2 text-text-secondary hover:text-navy hover:bg-paper-light rounded-xl transition-colors">
          <Bell size={24} />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-danger rounded-full border-2 border-paper"></span>
        </button>
        
        <div className="h-8 w-px bg-border-subtle"></div>

        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-navy">Dr. Sarah Jenkins</p>
            <p className="text-xs text-text-secondary">Principal</p>
          </div>
          <div className="relative">
            <Avatar name="Sarah Jenkins" size="md" className="group-hover:ring-2 ring-gold transition-all" />
            <Badge variant="success" className="absolute -bottom-1 -right-1 w-4 h-4 !p-0 border-2 border-white text-[0px]">Active</Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
