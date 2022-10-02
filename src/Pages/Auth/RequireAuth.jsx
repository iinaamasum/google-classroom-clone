import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingComponent from '../../components/Shared/LoadingComponent';
import auth from '../../firebase.init';

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return <LoadingComponent />;
  }
  if (error) {
    return toast('Error...');
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default RequireAuth;
