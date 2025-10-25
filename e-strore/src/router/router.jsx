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
import ProductDetails from "../pages/OurProducts/AllProducts/ProductDetails";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "../routes/PrivateRoute";
import AdminHome from "../pages/Dashboard/Admin/AdminHome/AdminHome";
import AddProduct from "../pages/Dashboard/Admin/AddProduct/AddProduct";
import ManageOrders from "../pages/Dashboard/Admin/ManageOrders/ManageOrders";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers/ManageUsers";
import PaymentHistory from "../pages/Dashboard/Admin/PaymentHistory/PaymentHistory";
import Analytics from "../pages/Dashboard/Admin/Analytics/Analytics";
import UserHome from "../pages/Dashboard/User/UserHome/UserHome";
import Profile from "../pages/Dashboard/User/Profile/Profile";
import MyCarts from "../pages/Dashboard/User/MyCarts/MyCarts";
import MyOrders from "../pages/Dashboard/User/MyOrders/MyOrders";
import PaymentHistory from "../pages/Dashboard/User/PaymentHistory/PaymentHistory";
import Settings from "../pages/Dashboard/User/Settings/Settings";
import Wishlist from "../pages/Dashboard/User/Wishlist/Wishlist";

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
          path:"productDetails/:id",
          Component:ProductDetails,
          loader:({params})=>{
            return fetch(`http://localhost:5000/products/productDetails/${params.id}`);
          }
        },
        {
          path: "featured",
          Component: FeaturedProducts,
        },
      ],
    },
    {
      path:"dashboard",
      element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
      children:[
        // Admin Route
        {
          path:"adminHome",
          element:<AdminHome></AdminHome>
        },
        {
          path:"addProduct",
          element:<AddProduct></AddProduct>
        },
        {
          path:"manageOrders",
          element:<ManageOrders></ManageOrders>
        },
        {
          path:"manageUsers",
          element:<ManageUsers></ManageUsers>
        },
        {
          path:"paymentHistory",
          element:<PaymentHistory></PaymentHistory>
        },
        {
          path:"analytics",
          element:<Analytics></Analytics>
        },

        // User Route
        {
          path:"userHome",
          element:<UserHome></UserHome>
        },
        {
          path:"profile",
          element:<Profile></Profile>
        },
        {
          path:"myCart",
          element:<MyCarts></MyCarts>
        },
        {
          path:"myOrders",
          element:<MyOrders></MyOrders>
        },
        {
          path:"userPaymentHistory",
          element:<PaymentHistory></PaymentHistory>
        },
        {
          path:"settings",
          element:<Settings></Settings>
        },
        {
          path:"wishlist",
          element:<Wishlist></Wishlist>
        }
      ]
    }

])

export default router;