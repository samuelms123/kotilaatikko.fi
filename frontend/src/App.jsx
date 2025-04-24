// App.jsx (modified - removed Router)
import React from 'react'
import Layout from './Components/Layout'

import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Removed Router import
import Home from './Views/Home'
import { ProtectedRoute } from './Components/ProtectedRoute'
import Profile from './Views/Profile'
import { UserProvider } from './Contexts/UserContext';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </UserProvider>
   </BrowserRouter>
  );
}

export default App;
