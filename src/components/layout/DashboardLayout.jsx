import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex text-text-primary font-sans overflow-x-hidden bg-transparent">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-navy/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex-1 lg:ml-[260px] w-full transition-all duration-300">
        <div className="w-full px-6 md:px-10 lg:px-12 pb-12">
          <Topbar onMenuClick={() => setIsSidebarOpen(true)} />
          <main className="w-full relative animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
