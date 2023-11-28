import { Route, Routes } from 'react-router-dom'; // Обратите внимание, что используется Routes вместо Switch
import { authRoutes, publicRoutes } from '../routes';
import { useContext } from 'react';
import { Context } from '../index';


const AppRouter = () => {
   const {user} =useContext(Context)

   console.log(user)
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}

            {publicRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}

        </Routes>
    );
}

export default AppRouter;
