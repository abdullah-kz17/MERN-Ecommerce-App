import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { axiosPrivate } from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { FaSave } from 'react-icons/fa';

export default function UpdateProfile() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setUsername(user?.username || '');
    setEmail(user?.email || '');
  }, [user]);

  const handleProfileUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      if (profilePic) {
        formData.append('profilePic', profilePic);
      }

      const response = await axiosPrivate.put('/auth/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setUser({
          ...user,
          username,
          email,
          profilePic: response.data.user.profilePic,
        });

        toast.success('Profile updated successfully!');
        navigate('/profile');
      }
    } catch (error) {
      toast.error('Error updating profile');
      setError('An error occurred while updating the profile.');
    }
  };

  return (
      <div className="max-w-4xl mx-auto p-6 my-8 bg-white dark:bg-gray-800 shadow-lg rounded-md">
        <h2 className="text-3xl font-semibold text-center text-gray-900 dark:text-white mb-6">
          Update Profile
        </h2>

        {error && <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>}

        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 dark:text-gray-300">
            Username
          </label>
          <input
              type="text"
              id="username"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="profilePic" className="block text-gray-700 dark:text-gray-300">
            Profile Picture
          </label>
          <input
              type="file"
              id="profilePic"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              onChange={(e) => setProfilePic(e.target.files[0])}
          />
        </div>

        <div className="text-center">
          <button
              className="flex items-center justify-center mx-auto gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-500 transition duration-300"
              onClick={handleProfileUpdate}
          >
            <FaSave className="text-lg" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
  );
}
