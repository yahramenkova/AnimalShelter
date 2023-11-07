import { Route, Routes } from 'react-router-dom'; // Обратите внимание, что используется Routes вместо Switch
import { authRoutes, publicRoutes } from '../routes';


const AppRouter = () => {
   const isAuth = false
    return (
        <Routes>
            {isAuth && authRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}

            {publicRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}

        </Routes>
    );
}

export default AppRouter;
