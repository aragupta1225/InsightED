import React from 'react';
import Card from './Card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StatCard = ({ title, value, change, trend, icon: Icon }) => {
  const isUp = trend === 'up';
  
  return (
    <Card hover className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-text-secondary text-sm font-medium">{title}</h3>
        {Icon && (
          <div className="p-2 bg-gold-light rounded-xl text-gold">
            <Icon size={20} />
          </div>
        )}
      </div>
      
      <div className="flex items-end gap-3">
        <span className="text-3xl font-bold text-navy">{value}</span>
        {change && (
          <div className={`flex items-center text-sm font-semibold mb-1 ${isUp ? 'text-success' : 'text-danger'}`}>
            {isUp ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
            <span>{change}</span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatCard;
