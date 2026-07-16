import React from 'react';
import Card from './Card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StatCard = ({ title, value, change, trend, icon: Icon, color = 'pink' }) => {
  const isUp = trend === 'up';
  
  const colorStyles = {
    pink: {
      bg: 'bg-[#E89BAA]/10',
      iconBg: 'bg-[#E89BAA]/15',
      text: 'text-[#E89BAA]',
    },
    blue: {
      bg: 'bg-[#1E2B59]/10',
      iconBg: 'bg-[#1E2B59]/15',
      text: 'text-[#1E2B59]',
    }
  };

  const selectedColor = colorStyles[color] || colorStyles.pink;

  return (
    <Card hover className={`flex items-center gap-6 p-6 ${selectedColor.bg} border-none shadow-[0_8px_30px_rgba(0,0,0,0.02)]`}>
      {Icon && (
        <div className={`p-4 rounded-3xl flex-shrink-0 ${selectedColor.iconBg} backdrop-blur-sm shadow-[inset_0_2px_10px_rgba(255,255,255,0.4)]`}>
          <Icon size={32} className={`${selectedColor.text}`} />
        </div>
      )}
      
      <div className="flex flex-col flex-1">
        <h3 className="text-text-secondary text-base font-semibold mb-1">{title}</h3>
        <span className="text-[40px] font-bold text-navy leading-none mb-2">{value}</span>
        
        {change && (
          <div className={`flex items-center text-sm font-semibold ${isUp ? 'text-success' : 'text-danger'}`}>
            {isUp ? <ArrowUpRight size={16} className="mr-1" /> : <ArrowDownRight size={16} className="mr-1" />}
            <span>{change}</span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatCard;
