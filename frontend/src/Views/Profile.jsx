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
  const [activeTab, setActiveTab] = useState('mealPackages');

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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'mealPackages':
        return (
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
        );
      case 'orderTracking':
        return (
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Tracking</h2>
            <p className="text-gray-600">Order tracking functionality will be implemented here.</p>
            {/* You can add your order tracking components here later */}
          </div>
        );
      case 'newsletter':
        return (
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Newsletter Management</h2>
            <p className="text-gray-600">Newsletter management functionality will be implemented here.</p>
            {/* You can add your newsletter components here later */}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {user?.type === 'admin' ? (
        <div className="space-y-6">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('mealPackages')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'mealPackages' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Meal Packages
              </button>
              <button
                onClick={() => setActiveTab('orderTracking')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'orderTracking' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Order Tracking
              </button>
              <button
                onClick={() => setActiveTab('newsletter')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'newsletter' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Newsletter
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div>
            {renderTabContent()}
          </div>
        </div>
      ) : (
        <UserProfile />
      )}
    </>
  );
};

export default Profile;
