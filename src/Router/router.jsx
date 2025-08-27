import {
  createBrowserRouter,
  
} from "react-router";
import RootLayout from "../Layout/Rootlayout";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Registration/Register";
import coverage from "../Pages/Shared/Coverage/coverage";
import PrivateRoute from "../Pages/Routes/PrivateRoute";
import SendParcel from "../Pages/Home/SendParcel/SendParcel";
import DashboardLayout from "../Layout/DashboardLayout";
import MyParcels from "../Pages/Dashboard.jsx/Myparcels";


export const router = createBrowserRouter([
  {
    path: "/",
    Component:RootLayout,
    children:[
      {
        index:true,
        Component:Home
      },
      {
        path:'coverage',
        Component:coverage,
        loader:()=> fetch('../../public/service.json')
      },
      {
        path:'sendParcel',
        element:<PrivateRoute><SendParcel></SendParcel></PrivateRoute>
      }
    ]
  },
  {
    path:'/',
    Component:AuthLayout,
    children:[
      {
        path:'login',
        Component:Login
      },
      {
        path:'register',
        Component:Register
      }
    ]
  },
  {
    path:'dashboard',
    element:<PrivateRoute>
        <DashboardLayout></DashboardLayout>
    </PrivateRoute>,
    children:[
      {
        path: 'myParcels',
        element:<MyParcels/>
      }
    ]
  }
]);