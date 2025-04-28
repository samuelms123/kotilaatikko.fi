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
    <div className="user-profile">
      <h2>User Profile</h2>
      <div className="profile-details">
        <div className="detail-row">
          <span className="detail-label">Etunimi: </span>
          <span className="detail-value">{user.firstName}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Sukunimi: </span>
          <span className="detail-value">{user.lastName}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Email: </span>
          <span className="detail-value">{user.email}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Puhelinnumero: </span>
          <span className="detail-value">{user.phone}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Osoite: </span>
          <span className="detail-value">{user.address}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Kaupunki: </span>
          <span className="detail-value">{user.city}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Postinumero: </span>
          <span className="detail-value">{user.postalCode}</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
