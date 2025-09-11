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
import Payment from "../Pages/Dashboard.jsx/Payment";
import PaymentHistory from "../Pages/Dashboard.jsx/PaymentHistory/PaymentHistory";
import BeARider from "../Pages/Home/BeARider/BeARider";
import PendingRiders from "../Pages/Dashboard.jsx/PendingRiders";
import ActiveRiders from "../Pages/Dashboard.jsx/ActiveRiders";
import DashboardHome from "../Pages/Dashboard.jsx/DashboardHome";
import AdminRoutes from "../Pages/Routes/AdminRoutes";
import MakeAdmin from "../Pages/Dashboard.jsx/MakeAdmin";
import Forbidden from "../Pages/forbidden/forbidden";
import AssignRider from "../Pages/Dashboard.jsx/AssignRider";


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
        path:'forbidden',
        element:<Forbidden></Forbidden>
      },
      {
        path:'sendParcel',
        element:<PrivateRoute><SendParcel></SendParcel></PrivateRoute>
      },
      {
        path:'beARider',
        element:<PrivateRoute>
            <BeARider></BeARider>
        </PrivateRoute>
        
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
        index:true,
        element:<DashboardHome></DashboardHome>
      },
      {
        path: 'myParcels',
        element:<MyParcels/>
      },
      {
        path:'payment/:parcelId',
        Component:Payment
      },
      {
        path:'paymentHistory',
        Component:PaymentHistory
      },
      {
        path:'assignRider',
        element:<AdminRoutes><AssignRider></AssignRider></AdminRoutes>
      },
      {
        path:'pending-riders',
        element:<AdminRoutes><PendingRiders></PendingRiders></AdminRoutes>
      },{
        path:'active-riders',
        element:<AdminRoutes><ActiveRiders></ActiveRiders></AdminRoutes>
      },
      {
        path:'makeAdmin',
        element:<AdminRoutes><MakeAdmin></MakeAdmin></AdminRoutes>
      }
    ]
  }
]);