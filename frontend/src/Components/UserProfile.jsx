import React from 'react'
import { useUser } from '../Hooks/apiHooks';

const UserProfile = () => {
  const { getUserByToken } = useUser();
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserByToken();
        setUser(userData.user);
        console.log('userData:', userData);
      } catch (err) {
        setError(err.message || 'Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading user profile...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>No user data available</div>;
  }


  return (
    <div className="flex-col flex items-center justify-center mt-6">
      <h1>User Profile</h1>
      <div className="profile-details flex flex-col items-center bg-gray-100 p-4 w-[100%] m-8 rounded-lg shadow-md max-w-2xl mx-auto">
        <div className="detail-row">
          <span className="detail-label font-bold">Etunimi: </span>
          <span className="detail-value">{user.firstName}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label font-bold">Sukunimi: </span>
          <span className="detail-value">{user.lastName}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label font-bold">Email: </span>
          <span className="detail-value">{user.email}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label font-bold">Puhelinnumero: </span>
          <span className="detail-value">{user.phone}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label font-bold">Osoite: </span>
          <span className="detail-value">{user.address}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label font-bold">Kaupunki: </span>
          <span className="detail-value">{user.city}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label font-bold">Postinumero: </span>
          <span className="detail-value">{user.postalCode}</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
