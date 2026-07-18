import React, { useState, useRef } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Avatar from '../../components/common/Avatar';
import { teacherData, mockClasses } from '../../data/mockData';
import { Camera, Trash2 } from 'lucide-react';

const Settings = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [fullName, setFullName] = useState(teacherData.name);
  const [email, setEmail] = useState(teacherData.email);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState('');
  const [profileError, setProfileError] = useState('');

  const [profilePic, setProfilePic] = useState(() => localStorage.getItem('profilePic') || null);
  const fileInputRef = useRef(null);

  const assignedClassesStr = mockClasses.map(c => `${c.name}-${c.section}`).join(', ');

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_DIM = 200;
          let { width, height } = img;
          if (width > height) {
            if (width > MAX_DIM) {
              height *= MAX_DIM / width;
              width = MAX_DIM;
            }
          } else {
            if (height > MAX_DIM) {
              width *= MAX_DIM / height;
              height = MAX_DIM;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          setProfilePic(canvas.toDataURL('image/jpeg', 0.6));
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePicture = () => {
    setProfilePic(null);
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    setProfileError('');
    setProfileSuccess('');

    if (!fullName.trim() || !email.trim()) {
      setProfileError('Name and email cannot be empty.');
      return;
    }

    setIsProfileLoading(true);
    setTimeout(() => {
      setIsProfileLoading(false);
      try {
        if (profilePic) {
          localStorage.setItem('profilePic', profilePic);
        } else {
          localStorage.removeItem('profilePic');
        }
      } catch (err) {
        console.error("Storage full or error saving");
      }
      window.dispatchEvent(new Event('profileUpdated'));
      setProfileSuccess('Profile updated successfully.');
      setTimeout(() => setProfileSuccess(''), 3000);
    }, 1200);
  };

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
        <form onSubmit={handleProfileSave}>
          <h3 className="text-lg font-semibold text-navy border-b border-border-subtle pb-4 mb-6">Profile</h3>
          
          {profileError && (
            <div className="p-3 mb-6 rounded-xl bg-danger-light text-danger text-sm">
              {profileError}
            </div>
          )}
          
          {profileSuccess && (
            <div className="p-3 mb-6 rounded-xl bg-success-light text-success text-sm font-bold">
              {profileSuccess}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 bg-paper-light/50 p-6 rounded-2xl border border-border-subtle">
            <Avatar name={fullName} url={profilePic} size="xl" className="shadow-md shrink-0" />
            <div className="flex flex-col items-center sm:items-start gap-3 justify-center sm:mt-2">
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                className="hidden" 
                accept="image/*"
              />
              <div className="flex gap-2">
                <button 
                  type="button"
                  className="py-2 px-4 flex items-center gap-2 bg-white border border-border-subtle rounded-xl shadow-sm hover:scale-105 transition-transform text-sm font-medium text-navy"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera size={18} /> Change Picture
                </button>
                <button 
                  type="button"
                  className="py-2 px-4 flex items-center gap-2 bg-white border border-border-subtle rounded-xl shadow-sm hover:scale-105 transition-transform text-sm font-medium text-navy"
                  onClick={handleRemovePicture}
                >
                  <Trash2 size={18} className="text-danger" /> Remove Picture
                </button>
              </div>
              <p className="text-xs text-text-muted text-center sm:text-left">JPG, GIF or PNG. Max size of 2MB.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-text-secondary">Full Name</label>
              <input 
                type="text" 
                className="input-tactile" 
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                disabled={isProfileLoading}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-text-secondary">Email</label>
              <input 
                type="email" 
                className="input-tactile" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={isProfileLoading}
              />
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

          <div className="pt-2">
            <Button type="submit" variant="primary" isLoading={isProfileLoading}>Save Changes</Button>
          </div>
        </form>

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
