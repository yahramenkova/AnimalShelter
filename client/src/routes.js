import Admin from "./pages/Admin";
import AnimalCard from "./pages/AnimalCard";
import Auth from "./pages/Auth";
import Catalog from "./pages/Catalog";
import Education from "./pages/Education";
import Home from "./pages/Home";
import LostAnimal from "./pages/LostAnimal";
import Reg from "./pages/Reg";
import Review from "./pages/Review";
import VolunteerActivity from "./pages/VolunteerActivity";
import { ADMIN_ROUTE, CATALOG_ROUTE, EDUCATION_ROUTE, HOME_ROUTE, LOGIN_ROUTE, LOSTANIMAL_ROUTE, REGISTRATION_ROUTE, VOLUNTEER_ROUTE, REVIEW_ROUTE,ANIMAL_DETAILS_ROUTE } from "./utils/consts";

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
        path: REVIEW_ROUTE,
        Component : Review
    }, 
    {
        path: ANIMAL_DETAILS_ROUTE + '/:id',
        Component : AnimalCard
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
    },
   {
        path: VOLUNTEER_ROUTE,
        Component : VolunteerActivity
    }
]