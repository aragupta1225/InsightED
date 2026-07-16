import React from 'react';
import { PackageOpen } from 'lucide-react';

const EmptyState = ({ title = "No data found", description = "There is nothing to display here yet.", icon: Icon = PackageOpen }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="w-16 h-16 bg-paper rounded-full flex items-center justify-center mb-4 text-text-muted">
        <Icon size={32} />
      </div>
      <h3 className="text-lg font-bold text-navy mb-1">{title}</h3>
      <p className="text-sm text-text-secondary max-w-sm">{description}</p>
    </div>
  );
};

export default EmptyState;
