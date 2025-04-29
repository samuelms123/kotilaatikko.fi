import React, { useEffect, useState } from 'react';
import UserProfile from '../Components/UserProfile';
import AdminAddMealPanel from '../Components/AdminAddMealPanel';
import { useUserContext } from '../Hooks/contextHooks';
import MealPackagesList from '../Components/MealPackagesList';
import { fetchData } from '../Utils/fetchData';

const Profile = () => {
  const { user } = useUserContext();
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMeals = async () => {
    try {
      const data = await fetchData(import.meta.env.VITE_AUTH_API + '/meals');
      setMeals(data);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  const handleMealAdded = () => {
    fetchMeals(); // Refresh the list when a new meal is added
  };

  const handleMealDeleted = (id) => {
    setMeals(prevMeals => prevMeals.filter(meal => meal.id !== id));
  };

  return (
    <>
      {user?.type === 'admin' ? (
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-1/2">
            <AdminAddMealPanel onMealAdded={handleMealAdded} />
          </div>
          <div className="md:w-1/2">
            <MealPackagesList
              meals={meals}
              isLoading={isLoading}
              error={error}
              onMealDeleted={handleMealDeleted}
            />
          </div>
        </div>
      ) : (
        <UserProfile />
      )}
    </>
  );
};

export default Profile;
