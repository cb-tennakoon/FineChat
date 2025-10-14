"use client"
import { useState } from 'react';
import { MessageCircle, Camera, Mail, Phone, MapPin, Calendar, Edit2, Save, X, ArrowLeft } from 'lucide-react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    location: 'New York, USA',
    bio: 'Software developer passionate about building great products',
    joinDate: 'January 2024'
  });
  const [editData, setEditData] = useState({ ...profileData });

  const handleSave = () => {
    setProfileData({ ...editData });
    setIsEditing(false);
    // Add your API call here to save profile data
    console.log('Saving profile:', editData);
  };

  const handleCancel = () => {
    setEditData({ ...profileData });
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setEditData({ ...editData, [field]: value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
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
            <a href="/settings" className="text-blue-600 hover:text-blue-700 font-semibold">
              Settings
            </a>
          </div>
        </div>
      </header>

      {/* Profile Content */}
      <main className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative">
            <button className="absolute bottom-4 right-4 p-2 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition">
              <Camera className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Profile Picture */}
          <div className="px-8 pb-8">
            <div className="relative -mt-20 mb-6">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full border-4 border-white shadow-xl flex items-center justify-center text-5xl">
                👤
              </div>
              <button className="absolute bottom-2 right-2 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Info Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {isEditing ? 'Edit Profile' : profileData.name}
                </h1>
                <p className="text-gray-600">{profileData.email}</p>
              </div>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center space-x-2"
                >
                  <Edit2 className="w-5 h-5" />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleCancel}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition flex items-center space-x-2"
                  >
                    <X className="w-5 h-5" />
                    <span>Cancel</span>
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center space-x-2"
                  >
                    <Save className="w-5 h-5" />
                    <span>Save</span>
                  </button>
                </div>
              )}
            </div>

            {/* Profile Details */}
            <div className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                ) : (
                  <div className="flex items-center space-x-3 text-gray-800">
                    <span className="text-lg">{profileData.name}</span>
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>Email Address</span>
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                ) : (
                  <div className="text-gray-800">{profileData.email}</div>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>Phone Number</span>
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                ) : (
                  <div className="text-gray-800">{profileData.phone}</div>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Location</span>
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                ) : (
                  <div className="text-gray-800">{profileData.location}</div>
                )}
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                {isEditing ? (
                  <textarea
                    value={editData.bio}
                    onChange={(e) => handleChange('bio', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                  />
                ) : (
                  <div className="text-gray-800">{profileData.bio}</div>
                )}
              </div>

              {/* Join Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Member Since</span>
                </label>
                <div className="text-gray-800">{profileData.joinDate}</div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">127</div>
                <div className="text-sm text-gray-600">Contacts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">1.2K</div>
                <div className="text-sm text-gray-600">Messages</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">15</div>
                <div className="text-sm text-gray-600">Groups</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}