import React from 'react';
import UserProfile from '../Components/UserProfile';
import AdminAddMealPanel from '../Components/AdminAddMealPanel';
import { useUserContext } from '../Hooks/contextHooks';

const Profile = () => {
  const { user } = useUserContext();

  // Render different profile components based on user type
  return (
    <>
      {user?.type === 'admin' ? (
        <AdminAddMealPanel />
      ) : (
        <UserProfile />
      )}
    </>
  );
};

export default Profile;
