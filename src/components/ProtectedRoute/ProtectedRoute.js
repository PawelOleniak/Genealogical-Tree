import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ validator, ScdValidator = true, Component, Fallback }) => {
  const auth = useSelector((state) => state.firebaseReducer.auth);
  return (
    <Route>
      {isLoaded(auth) && !isEmpty(auth) ? <Component /> : !Fallback ? <Redirect to="/home" /> : <Fallback />}
    </Route>
  );
};

export default ProtectedRoute;
