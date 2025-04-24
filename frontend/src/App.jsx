// App.jsx (modified - removed Router)
import React from 'react'
import { Route, Routes } from 'react-router-dom'; // Removed Router import
import Home from './Views/Home'
import { ProtectedRoute } from './Components/ProtectedRoute'
import Profile from './Views/Profile'
import { UserProvider } from './Contexts/UserContext';

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
      </Routes>
    </UserProvider>
  );
}

export default App;
