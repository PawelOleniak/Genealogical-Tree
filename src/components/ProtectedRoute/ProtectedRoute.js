import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ validator, ScdValidator = true, Component, Fallback }) => {
  return (
    <Route>{validator && ScdValidator ? <Component /> : !Fallback ? <Redirect to="/home" /> : <Fallback />}</Route>
  );
};

export default ProtectedRoute;
