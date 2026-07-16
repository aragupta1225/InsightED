import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { teacherData, mockClasses } from '../../data/mockData';

const Settings = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const assignedClassesStr = mockClasses.map(c => `${c.name}-${c.section}`).join(', ');

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Please fill out all password fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }

    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters long.');
      return;
    }

    setIsLoading(true);

    // Simulate network request
    setTimeout(() => {
      setIsLoading(false);
      setSuccess('Password updated successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
      setTimeout(() => setSuccess(''), 3000);
    }, 1200);
  };

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
          <form onSubmit={handlePasswordChange} className="flex flex-col gap-4 max-w-md">
            
            {error && (
              <div className="p-3 rounded-xl bg-danger-light text-danger text-sm">
                {error}
              </div>
            )}
            
            {success && (
              <div className="p-3 rounded-xl bg-success-light text-success text-sm font-bold">
                {success}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-text-secondary">Current Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="input-tactile" 
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-text-secondary">New Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="input-tactile" 
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-text-secondary">Confirm New Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="input-tactile" 
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="pt-2">
              <Button type="submit" variant="primary" isLoading={isLoading}>Change Password</Button>
            </div>
          </form>
        </div>

      </Card>
    </div>
  );
};

export default Settings;
