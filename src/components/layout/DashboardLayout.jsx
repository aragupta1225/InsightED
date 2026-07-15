import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex bg-paper text-text-primary font-sans">
      <Sidebar />
      <div className="flex-1 ml-[260px]">
        <div className="max-w-[1400px] w-full mx-auto px-8 pb-12">
          <Topbar />
          <main className="w-full relative animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
