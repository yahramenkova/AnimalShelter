import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { authRoutes, publicRoutes } from "../routes";
import { HOME_ROUTE } from '../utils/consts';
import { Context } from '../index';


const AppRouter = () => {
   const {user} = useContext(Context);
   const [authState, setAuthState] = useState(user.isAuth);
   console.log(user)

   const checkAuthState = useCallback(() => {
    if (user.isAuth !== authState) {
        setAuthState(user.isAuth);
    }
  }, [user.isAuth, authState]);

  useEffect(checkAuthState, [checkAuthState]);
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
