import React, {useEffect, useState} from 'react';
import UserProfile from '../Components/UserProfile';
import AdminAddMealPanel from '../Components/AdminAddMealPanel';
import {useUserContext} from '../Hooks/contextHooks';
import MealPackagesList from '../Components/MealPackagesList';
import {AdminAddNewsletter} from '../Components/adminPanel/AdminAddNewsletter';
import {NewslettersList} from '../Components/adminPanel/NewslettersList';
import {fetchData} from '../Utils/fetchData';
import AdminOrderTracking from '../Components/AdminOrderTracking';

const Profile = () => {
  const {user} = useUserContext();
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('mealPackages');
  const [newsletters, setNewsletters] = useState([]);

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

  const fetchNewsletters = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_AUTH_API + '/newsletter',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );
      if (!response.ok) {
        throw new Error('Failed to fetch newsletters');
      }
      const data = await response.json();
      setNewsletters(data);
    } catch (error) {
      console.error('Error fetching newsletters:', error);
    }
  };

  useEffect(() => {
    fetchMeals(), fetchNewsletters();
  }, []);

  const handleMealAdded = () => {
    fetchMeals(); // Refresh the list when a new meal is added
  };

  const handleMealDeleted = (id) => {
    setMeals((prevMeals) => prevMeals.filter((meal) => meal.id !== id));
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
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Tilauksien hallinnointi
            </h2>
            <AdminOrderTracking />
          </div>
        );
      case 'newsletter':
        return (
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Uutiskirje
            </h2>
            <div className="mb-4">
              <AdminAddNewsletter onNewsletterAdded={fetchNewsletters} />
            </div>
            <div>
              <NewslettersList
                newsletters={newsletters}
                fetchNewsletters={fetchNewsletters}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {user?.type === 'admin' ? (
        <div className="m-2 space-y-6">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('mealPackages')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'mealPackages' ? 'border-[var(--primary-color)] text-[var(--primary-color)]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Ruokapaketit
              </button>
              <button
                onClick={() => setActiveTab('orderTracking')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'orderTracking' ? 'border-[var(--primary-color)] text-[var(--primary-color)]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Tilaukset
              </button>
              <button
                onClick={() => setActiveTab('newsletter')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'newsletter' ? 'border-[var(--primary-color)] text-[var(--primary-color)]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Uutiskirje
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div>{renderTabContent()}</div>
        </div>
      ) : (
        <UserProfile />
      )}
    </>
  );
};

export default Profile;
