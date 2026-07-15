import React from 'react';
import Card from './Card';

const ChartContainer = ({ title, action, children, className = '' }) => {
  return (
    <Card className={`flex flex-col h-full ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-navy">{title}</h3>
        {action && <div>{action}</div>}
      </div>
      <div className="flex-1 w-full relative min-h-[300px]">
        {children}
      </div>
    </Card>
  );
};

export default ChartContainer;
