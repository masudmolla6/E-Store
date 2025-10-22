import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import LogIn from "../pages/Authentication/LogIn/LogIn";
import Register from "../pages/Authentication/Register/Register";
import OurProductsLayout from "../layouts/OurProductsLayout";
import AllProducts from "../pages/OurProducts/AllProducts/AllProducts";
import FeaturedProducts from "../pages/OurProducts/FeaturedProducts/FeaturedProducts";
import CategoryProducts from "../pages/OurProducts/CategoryProducts/CategoryProducts";
const router=createBrowserRouter([
    {
        path:'/',
        Component:MainLayout,
        children:[
            {
                index:true,
                Component:Home,
            },
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
        {
            path: 'login',
            Component: LogIn
        },
        {
            path: 'register',
            Component: Register
        }
        ]
    },
    {
      path: "/products",
      Component: OurProductsLayout,
      children: [
        {
          index: true,
          path: "all",
          Component: AllProducts,
        },
        {
          path: "categoryProducts",
          Component: CategoryProducts,
        },
        {
          path: "featured",
          Component: FeaturedProducts,
        },
      ],
    }

])

export default router;