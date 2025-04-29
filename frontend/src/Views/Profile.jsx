import React from 'react';
import UserProfile from '../Components/UserProfile';
import AdminAddMealPanel from '../Components/AdminAddMealPanel';
import { useUserContext } from '../Hooks/contextHooks';
import MealPackagesList from '../Components/MealPackagesList';

const Profile = () => {
  const { user } = useUserContext();

  // Render different profile components based on user type
  return (
    <>
      {user?.type === 'admin' ? (
        <div className="flex">
          <AdminAddMealPanel className="min-w-1/2 max-w-1/2"/>
          <MealPackagesList className="min-w-1/2 max-w-1/2"/>
        </div>

      ) : (
        <UserProfile />
      )}
    </>
  );
};

export default Profile;
