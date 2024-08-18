import { useState, useEffect } from 'react';
import { useStore } from '../store';
import { getUser, updateUser } from '../utils/api';
import { CircularProgress } from '@mui/material';

const UserProfile = () => {
  const { user, setUser } = useStore();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await getUser(user.id);
        setProfileData(data);
        setName(data.name);
        setEmail(data.email);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateUser(user.id, { name, email });
      setUser({ ...user, name, email });
      setProfileData({ ...profileData, name, email });
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (!profileData) {
    return <div>No user data found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">User Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="name" className="block text-lg font-medium mb-1">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-lg font-medium mb-1">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
            readOnly
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UserProfile;