import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes';
import { Context } from '..';
import { observer } from 'mobx-react-lite';

const AppRouter = () => {
  const { user } = useContext(Context);
  console.log(user.isAuth);
  return (
    <Routes>
      {localStorage.getItem('auth') &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      <Route path="*" element={<Navigate to="/not-found" />} /> 
    </Routes>
  );
};

export default observer(AppRouter);