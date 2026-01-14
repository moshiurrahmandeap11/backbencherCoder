"use client";

import useAuth from '@/app/lib/useAuth/useAuth';
import { Bell, Globe, Moon, Save, Settings, Shield, User } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';

const SettingsPage = () => {
  const { uid } = useParams();
  const { user } = useAuth();
  
  const [settings, setSettings] = useState({
    notifications: true,
    emailUpdates: true,
    darkMode: true,
    twoFactorAuth: false,
    language: 'en',
    timezone: 'UTC+6'
  });

  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSelect = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleSave = () => {
    // Save settings to API
    console.log('Saving settings:', settings);
    alert('Settings saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#051320] to-[#0a1a2d] pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Settings className="w-8 h-8 text-[#D9FDA3]" />
              Settings
            </h1>
            <p className="text-gray-400 mt-2">
              Manage your account settings and preferences
            </p>
          </div>
          
          <button
            onClick={handleSave}
            className="bg-gradient-to-r from-[#D9FDA3] to-cyan-400 text-[#051320] px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-all flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            Save Changes
          </button>
        </div>

        {/* UID Display */}
        <div className="bg-gradient-to-r from-[#D9FDA3]/10 to-cyan-400/10 border border-white/10 rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Account Identifier</h2>
              <p className="text-gray-400">
                Your unique user ID. This is used to identify your account across the platform.
              </p>
            </div>
            <div className="bg-black/30 px-4 py-3 rounded-lg">
              <p className="text-gray-400 text-sm">User UID</p>
              <p className="text-white font-mono break-all max-w-md">{uid}</p>
            </div>
          </div>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Account Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Settings */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#D9FDA3] to-cyan-400 flex items-center justify-center">
                  <User className="w-5 h-5 text-[#051320]" />
                </div>
                <h2 className="text-xl font-semibold text-white">Profile Settings</h2>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Display Name</label>
                    <input 
                      type="text" 
                      defaultValue={user?.displayName || 'User'}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D9FDA3] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Email</label>
                    <input 
                      type="email" 
                      defaultValue={user?.email || 'No email'}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D9FDA3] transition-colors"
                      disabled
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Bio</label>
                  <textarea 
                    rows="3"
                    placeholder="Tell us about yourself..."
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D9FDA3] transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#D9FDA3] to-cyan-400 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-[#051320]" />
                </div>
                <h2 className="text-xl font-semibold text-white">Notifications</h2>
              </div>
              
              <div className="space-y-4">
                {[
                  { label: 'Push Notifications', description: 'Receive push notifications for important updates', key: 'notifications' },
                  { label: 'Email Updates', description: 'Get weekly email summaries', key: 'emailUpdates' },
                  { label: 'Two-Factor Authentication', description: 'Add an extra layer of security to your account', key: 'twoFactorAuth' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div>
                      <p className="text-white font-medium">{item.label}</p>
                      <p className="text-gray-400 text-sm mt-1">{item.description}</p>
                    </div>
                    <button
                      onClick={() => handleToggle(item.key)}
                      className={`w-12 h-6 rounded-full transition-all ${settings[item.key] ? 'bg-gradient-to-r from-[#D9FDA3] to-cyan-400' : 'bg-gray-600'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${settings[item.key] ? 'translate-x-7' : 'translate-x-1'} mt-0.5`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Settings */}
          <div className="space-y-6">
            {/* Appearance */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#D9FDA3] to-cyan-400 flex items-center justify-center">
                  <Moon className="w-5 h-5 text-[#051320]" />
                </div>
                <h2 className="text-xl font-semibold text-white">Appearance</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div>
                    <p className="text-white font-medium">Dark Mode</p>
                    <p className="text-gray-400 text-sm mt-1">Use dark theme</p>
                  </div>
                  <button
                    onClick={() => handleToggle('darkMode')}
                    className={`w-12 h-6 rounded-full transition-all ${settings.darkMode ? 'bg-gradient-to-r from-[#D9FDA3] to-cyan-400' : 'bg-gray-600'}`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${settings.darkMode ? 'translate-x-7' : 'translate-x-1'} mt-0.5`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Language & Region */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#D9FDA3] to-cyan-400 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-[#051320]" />
                </div>
                <h2 className="text-xl font-semibold text-white">Language & Region</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Language</label>
                  <select 
                    value={settings.language}
                    onChange={(e) => handleSelect('language', e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D9FDA3] transition-colors"
                  >
                    <option value="en">English</option>
                    <option value="bn">Bangla</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Timezone</label>
                  <select 
                    value={settings.timezone}
                    onChange={(e) => handleSelect('timezone', e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D9FDA3] transition-colors"
                  >
                    <option value="UTC+6">UTC+6 (Bangladesh)</option>
                    <option value="UTC+0">UTC+0 (GMT)</option>
                    <option value="UTC-5">UTC-5 (EST)</option>
                    <option value="UTC-8">UTC-8 (PST)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#D9FDA3] to-cyan-400 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#051320]" />
                </div>
                <h2 className="text-xl font-semibold text-white">Security</h2>
              </div>
              
              <div className="space-y-3">
                <button className="w-full text-left p-3 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-colors">
                  Change Password
                </button>
                <button className="w-full text-left p-3 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-colors">
                  Login Activity
                </button>
                <button className="w-full text-left p-3 bg-white/5 hover:bg-white/10 rounded-lg text-red-400 hover:text-red-300 transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;