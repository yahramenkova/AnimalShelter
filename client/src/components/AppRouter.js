import React, { useContext, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { authRoutes, publicRoutes } from "../routes";
import { HOME_ROUTE } from '../utils/consts';
import { Context } from '../index';

const AppRouter = () => {
  const { user } = useContext(Context);
  console.log('isAuth в AppRouter:', user.isAuth); 
  useEffect(() => {
    
    console.log('isAuth в AppRouter:', user.isAuth); 
  }, [user.isAuth]);
  return (
    <Routes>
      {user.isAuth && authRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}

      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      <Route path="/" element={<Navigate to={HOME_ROUTE} />} />
    </Routes>
  );
};

export default AppRouter;
