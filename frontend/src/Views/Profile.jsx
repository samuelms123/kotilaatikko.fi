import React from 'react';
import UserProfile from '../Components/UserProfile';
import AdminProfile from '../Components/AdminProfile';
import { useUserContext } from '../Hooks/contextHooks';

const Profile = () => {
  const { user } = useUserContext();

  // Render different profile components based on user type
  return (
    <>
      {user?.type === 'admin' ? (
        <AdminProfile />
      ) : (
        <UserProfile />
      )}
    </>
  );
};

export default Profile;
