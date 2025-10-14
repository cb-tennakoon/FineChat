"use client"
import { useState } from 'react';
import { MessageCircle, Bell, Lock, Eye, Globe, Moon, Shield, Smartphone, HelpCircle, Info, ChevronRight, ArrowLeft, Check } from 'lucide-react';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [messageNotifications, setMessageNotifications] = useState(true);
  const [groupNotifications, setGroupNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [readReceipts, setReadReceipts] = useState(true);
  const [lastSeen, setLastSeen] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [language, setLanguage] = useState('English');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const languages = ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese'];

  const ToggleSwitch = ({ enabled, onChange }) => (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-blue-600' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  const SettingItem = ({ icon: Icon, title, description, action, onClick }) => (
    <div
      onClick={onClick}
      className={`flex items-center justify-between p-4 hover:bg-gray-50 transition ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div className="flex items-center space-x-3 flex-1">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="font-medium text-gray-800">{title}</h3>
          {description && <p className="text-sm text-gray-600">{description}</p>}
        </div>
      </div>
      {action}
    </div>
  );

  const Section = ({ title, children }) => (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-6">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      </div>
      <div className="divide-y divide-gray-100">{children}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <a href="/chat" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </a>
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-8 h-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-800">FineChat</span>
              </div>
            </div>
            <a href="/profile" className="text-blue-600 hover:text-blue-700 font-semibold">
              Profile
            </a>
          </div>
        </div>
      </header>

      {/* Settings Content */}
      <main className="container mx-auto px-6 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Settings</h1>

        {/* Notifications Section */}
        <Section title="Notifications">
          <SettingItem
            icon={Bell}
            title="Push Notifications"
            description="Receive push notifications for new messages"
            action={<ToggleSwitch enabled={notifications} onChange={setNotifications} />}
          />
          <SettingItem
            icon={Bell}
            title="Message Notifications"
            description="Get notified for direct messages"
            action={
              <ToggleSwitch enabled={messageNotifications} onChange={setMessageNotifications} />
            }
          />
          <SettingItem
            icon={Bell}
            title="Group Notifications"
            description="Get notified for group messages"
            action={<ToggleSwitch enabled={groupNotifications} onChange={setGroupNotifications} />}
          />
          <SettingItem
            icon={Bell}
            title="Sound"
            description="Play sound for notifications"
            action={<ToggleSwitch enabled={soundEnabled} onChange={setSoundEnabled} />}
          />
        </Section>

        {/* Privacy & Security Section */}
        <Section title="Privacy & Security">
          <SettingItem
            icon={Eye}
            title="Read Receipts"
            description="Let others know when you've read their messages"
            action={<ToggleSwitch enabled={readReceipts} onChange={setReadReceipts} />}
          />
          <SettingItem
            icon={Eye}
            title="Last Seen"
            description="Show when you were last active"
            action={<ToggleSwitch enabled={lastSeen} onChange={setLastSeen} />}
          />
          <SettingItem
            icon={Shield}
            title="Two-Factor Authentication"
            description="Add an extra layer of security"
            action={<ToggleSwitch enabled={twoFactorAuth} onChange={setTwoFactorAuth} />}
          />
          <SettingItem
            icon={Lock}
            title="Change Password"
            description="Update your account password"
            action={<ChevronRight className="w-5 h-5 text-gray-400" />}
            onClick={() => console.log('Navigate to change password')}
          />
          <SettingItem
            icon={Lock}
            title="Blocked Users"
            description="Manage blocked contacts"
            action={<ChevronRight className="w-5 h-5 text-gray-400" />}
            onClick={() => console.log('Navigate to blocked users')}
          />
        </Section>

        {/* Appearance Section */}
        <Section title="Appearance">
          <SettingItem
            icon={Moon}
            title="Dark Mode"
            description="Switch to dark theme"
            action={<ToggleSwitch enabled={darkMode} onChange={setDarkMode} />}
          />
          <div className="relative">
            <SettingItem
              icon={Globe}
              title="Language"
              description={language}
              action={<ChevronRight className="w-5 h-5 text-gray-400" />}
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
            />
            {showLanguageMenu && (
              <div className="absolute right-4 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-10">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setShowLanguageMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center justify-between"
                  >
                    <span>{lang}</span>
                    {language === lang && <Check className="w-4 h-4 text-blue-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </Section>

        {/* Account Section */}
        <Section title="Account">
          <SettingItem
            icon={Smartphone}
            title="Connected Devices"
            description="Manage devices logged into your account"
            action={<ChevronRight className="w-5 h-5 text-gray-400" />}
            onClick={() => console.log('Navigate to devices')}
          />
          <SettingItem
            icon={Lock}
            title="Account Privacy"
            description="Control who can see your information"
            action={<ChevronRight className="w-5 h-5 text-gray-400" />}
            onClick={() => console.log('Navigate to privacy')}
          />
        </Section>

        {/* Support Section */}
        <Section title="Support">
          <SettingItem
            icon={HelpCircle}
            title="Help Center"
            description="Get help and support"
            action={<ChevronRight className="w-5 h-5 text-gray-400" />}
            onClick={() => console.log('Navigate to help')}
          />
          <SettingItem
            icon={Info}
            title="About"
            description="App version and information"
            action={<ChevronRight className="w-5 h-5 text-gray-400" />}
            onClick={() => console.log('Navigate to about')}
          />
        </Section>

        {/* Danger Zone */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-red-600">Danger Zone</h2>
          </div>
          <div className="p-4">
            <button className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold">
              Delete Account
            </button>
            <p className="text-sm text-gray-600 text-center mt-2">
              This action cannot be undone
            </p>
          </div>
        </div>

        {/* App Version */}
        <div className="text-center text-gray-600 text-sm mb-8">
          <p>FineChat v1.0.0</p>
          <p>&copy; 2025 FineChat. All rights reserved.</p>
        </div>
      </main>
    </div>
  );
}