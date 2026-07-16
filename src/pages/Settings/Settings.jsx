import React from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { teacherData, mockClasses } from '../../data/mockData';

const Settings = () => {
  // Format assigned classes for display
  const assignedClassesStr = mockClasses.map(c => `${c.name}-${c.section}`).join(', ');

  return (
    <div className="flex flex-col gap-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-navy mb-2">Settings</h1>
        <p className="text-text-secondary">Manage your profile and security settings.</p>
      </div>

      <Card className="flex flex-col gap-8">
        {/* Profile Section */}
        <div>
          <h3 className="text-lg font-semibold text-navy border-b border-border-subtle pb-4 mb-6">Profile</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-text-secondary">Full Name</label>
              <input type="text" className="input-tactile bg-paper-light cursor-not-allowed text-navy/70" defaultValue={teacherData.name} disabled />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-text-secondary">Email</label>
              <input type="email" className="input-tactile bg-paper-light cursor-not-allowed text-navy/70" defaultValue={teacherData.email} disabled />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-text-secondary">Assigned Classes</label>
              <input type="text" className="input-tactile bg-paper-light cursor-not-allowed text-navy/70" defaultValue={assignedClassesStr} disabled />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-text-secondary">Role</label>
              <input type="text" className="input-tactile bg-paper-light cursor-not-allowed text-navy/70" defaultValue="Teacher" disabled />
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div>
          <h3 className="text-lg font-semibold text-navy border-b border-border-subtle pb-4 mb-6">Security</h3>
          <div className="flex flex-col gap-4 max-w-md">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-text-secondary">Current Password</label>
              <input type="password" placeholder="••••••••" className="input-tactile" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-text-secondary">New Password</label>
              <input type="password" placeholder="••••••••" className="input-tactile" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-text-secondary">Confirm New Password</label>
              <input type="password" placeholder="••••••••" className="input-tactile" />
            </div>
            <div className="pt-2">
              <Button variant="primary">Change Password</Button>
            </div>
          </div>
        </div>

      </Card>
    </div>
  );
};

export default Settings;
