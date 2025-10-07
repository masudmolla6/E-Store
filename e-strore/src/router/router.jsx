import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home/Home";
import AboutUs from "../pages/Home/AboutUs/AboutUs";
import ContactUs from "../pages/Home/ContactUs/ContactUs";
import LogIn from "../pages/LogIn/LogIn";

const router=createBrowserRouter([
    {
        path:'/',
        Component:MainLayout,
        children:[
            {
                index:true,
                Component:Home,
            },
            {
                path:"/login",
                Component:LogIn,
            },
        ]
    }
])

export default router;