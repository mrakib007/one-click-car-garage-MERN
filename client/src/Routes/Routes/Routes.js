import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login/Login";
import Signup from "../../Pages/Login/Signup/Signup";
import DashboardLayout from "../../Layout/DashboardLayout";
import About from "../../Pages/Home/About/About";
import ErrorPage from "../../Shared/ErrorPage/ErrorPage";
import AddService from "../../Pages/DashBoard/AddService/AddService";
import ManageUsers from "../../Pages/DashBoard/ManageUsers/ManageUsers";
import DashBoard from "../../Pages/DashBoard/DashBoard/DashBoard";
import ServiceDetails from "../../Pages/DashBoard/ServiceDetails/ServiceDetails";
import MyBookings from "../../Pages/DashBoard/MyBookings/MyBookings";
import Payment from "../../Pages/DashBoard/Payment/Payment";
import PrivateRoutes from "./PrivateRoutes";
import AdminRoute from './AdminRoute';
import Navbar from "../../Shared/Navbar/Navbar";
import Footer from "../../Shared/Footer/Footer";

const router = createBrowserRouter([
    {
        path:'/',
        element: <Main/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/about',
                element: <About/>
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/signup',
                element: <Signup/>
            },
            {
                path: 'services/:id',
                element: <ServiceDetails/>,
                loader: ({params}) => fetch(`http://localhost:5000/services/${params.id}`)
            }
        ]
    },
    {
        path: '/dashboard',
        element:<PrivateRoutes>
        <DashboardLayout></DashboardLayout>
        </PrivateRoutes>,
        // errorElement: <ErrorPage/>,
        children:[
            {
                path: '/dashboard',
                element: <DashBoard></DashBoard>
            },
            {
                path: '/dashboard/addService',
                element: <AdminRoute>
                    <AddService/>
                </AdminRoute>
            },
            {
                path: '/dashboard/myBookings',
                element: <MyBookings/>
            },
            {
                path: '/dashboard/manageUsers',
                element: <AdminRoute>
                    <ManageUsers/>
                </AdminRoute>
            },
            {
                path: '/dashboard/payment/:id',
                element: <Payment/>,
                loader: ({params}) => fetch(`http://localhost:5000/bookings/${params.id}`)
            }
        ]
    },{
        path: '*',element: <div>
            <Navbar/>
            <ErrorPage/>
            <Footer/>
        </div>
    }
])

export default router;