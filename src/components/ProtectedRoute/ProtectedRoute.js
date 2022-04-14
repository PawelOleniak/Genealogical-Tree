import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { getAuth } from 'firebase/auth';

const ProtectedRoute = ({ Component }) => {
  const auth = getAuth();
  const user = auth.currentUser;
  return <Route>{user ? <Component /> : <Redirect to="/" />}</Route>;
};

export default ProtectedRoute;
