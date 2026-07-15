import React from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const Settings = () => {
  return (
    <div className="flex flex-col gap-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-navy mb-2">Settings</h1>
        <p className="text-text-secondary">Manage your preferences and system configuration.</p>
      </div>

      <Card className="flex flex-col gap-8">
        <div>
          <h3 className="text-lg font-semibold text-navy border-b border-border-subtle pb-4 mb-6">Profile Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-text-secondary">Full Name</label>
              <input type="text" className="input-tactile" defaultValue="Dr. Sarah Jenkins" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-text-secondary">Email Address</label>
              <input type="email" className="input-tactile" defaultValue="s.jenkins@insighted.edu" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-text-secondary">Role</label>
              <input type="text" className="input-tactile" defaultValue="Principal" disabled />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-navy border-b border-border-subtle pb-4 mb-6">Notifications</h3>
          <div className="flex flex-col gap-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-5 h-5 accent-gold cursor-pointer" />
              <span className="text-navy">Email alerts for High Risk students</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-5 h-5 accent-gold cursor-pointer" />
              <span className="text-navy">Weekly summary digest</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5 accent-gold cursor-pointer" />
              <span className="text-navy">SMS alerts for critical system updates</span>
            </label>
          </div>
        </div>

        <div className="pt-4 border-t border-border-subtle flex justify-end gap-4">
          <Button variant="outline">Cancel</Button>
          <Button variant="primary">Save Changes</Button>
        </div>
      </Card>
    </div>
  );
};

export default Settings;
