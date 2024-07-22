import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthToken from './useAuthToken';

const withAuth = (Component) => {
  return (props) => {
    const token = useAuthToken();

    if (!token) {
      return <Navigate to="/login" />;
    }

    return <Component {...props} />;
  };
};

export default withAuth;
