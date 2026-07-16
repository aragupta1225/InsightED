import React from 'react';
import Card from './Card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StatCard = ({ title, value, change, trend, icon: Icon, color = 'pink' }) => {
  const isUp = trend === 'up';
  
  const colorStyles = {
    pink: 'bg-pastel-pink text-danger',
    green: 'bg-pastel-green text-success',
    blue: 'bg-pastel-blue text-info',
    brown: 'bg-pastel-brown text-warning',
  };

  const selectedColor = colorStyles[color] || colorStyles.pink;

  return (
    <Card hover className="flex items-center gap-5 p-5">
      {Icon && (
        <div className={`p-4 rounded-[24px] flex-shrink-0 backdrop-blur-md shadow-[inset_0_2px_10px_rgba(255,255,255,0.8)] border border-white/50 ${selectedColor}`}>
          <Icon size={28} className="opacity-80 mix-blend-multiply" />
        </div>
      )}
      
      <div className="flex flex-col flex-1">
        <h3 className="text-text-secondary text-sm font-semibold mb-1">{title}</h3>
        <span className="text-[32px] font-bold text-navy leading-none mb-2">{value}</span>
        
        {change ? (
          <div className={`flex items-center text-xs font-semibold ${isUp ? 'text-success' : 'text-danger'}`}>
            {isUp ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
            <span>{change}</span>
          </div>
        ) : (
          <div className="flex items-center text-xs font-semibold text-text-muted">
            <span className="h-[2px] w-3 bg-text-muted/50 rounded-full mr-2"></span>
            <span>No change</span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatCard;
