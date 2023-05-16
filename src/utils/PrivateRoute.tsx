import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const PrivateRoute = ({ children }: any) => {
  const { authenticated, loadingPage } = useContext(AuthContext);

  if (loadingPage) {
    return null;
  }
  if (!authenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;
