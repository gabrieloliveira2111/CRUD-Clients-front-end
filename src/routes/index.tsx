import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from '../utils/PrivateRoute';
import { AuthProvider } from '../contexts/AuthContext';
import { ClientsProvider } from '../contexts/ClientsContext';
import Home from '../pages/Home/index';
import Login from '../pages/Login';

const RoutesComponent = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ClientsProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </ClientsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default RoutesComponent;
