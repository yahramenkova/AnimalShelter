import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import Catalog from "./pages/Catalog";
import Education from "./pages/Education";
import Event from "./pages/Event";
import Home from "./pages/Home";
import LostAnimal from "./pages/LostAnimal";
import Reg from "./pages/Reg";
import { ADMIN_ROUTE, CATALOG_ROUTE, EDUCATION_ROUTE, EVENT_ROUTE, HOME_ROUTE, LOGIN_ROUTE, LOSTANIMAL_ROUTE, REGISTRATION_ROUTE } from "./utils/consts";

export const authRoutes =[
    {
        path: ADMIN_ROUTE,
        Component : Admin
    },
    {
        path: CATALOG_ROUTE,
        Component : Catalog
    },
    {
        path: EVENT_ROUTE,
        Component : Event
    }

]

export const publicRoutes = [
    {
        path: LOSTANIMAL_ROUTE,
        Component : LostAnimal
    },
    {
        path: HOME_ROUTE,
        Component : Home
    },
    {
        path: REGISTRATION_ROUTE,
        Component : Reg
    },
    {
        path: LOGIN_ROUTE,
        Component : Auth
    },
    {
        path: EDUCATION_ROUTE,
        Component : Education
    }

]