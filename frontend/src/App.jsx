// App.jsx (modified - removed Router)
import React from 'react'
import Layout from './Components/Layout'

import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Removed Router import
import Home from './Views/Home'
import { ProtectedRoute } from './Components/ProtectedRoute'
import Profile from './Views/Profile'
import { UserProvider } from './Contexts/UserContext';
import LoginForm from './Components/LoginForm';
import RegisterForm from './Components/RegisterForm';
import Logout from './Views/Logout';

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
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/logout" element={<Logout />} />
          </Route>
        </Routes>
      </UserProvider>
   </BrowserRouter>
  );
}

export default App;
