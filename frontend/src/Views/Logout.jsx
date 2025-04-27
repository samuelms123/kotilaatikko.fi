import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { useUserContext } from '../Hooks/contextHooks';

export const Logout = () => {

  const navigate = useNavigate();
  const { handleLogout } = useUserContext();

  useEffect(() => {
    handleLogout();
    navigate('/');
  }, [handleLogout, navigate]);

  return (
    <div>Logging out</div>
  )
}

export default Logout;
