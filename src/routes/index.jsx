import { createBrowserRouter } from "react-router-dom";
import Auth from "../Layout/Auth/Auth";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Dashboard/Home";
import Users from "../Pages/Dashboard/Subsciber";
import Admin from "../Pages/Dashboard/Admin";
import Category from "../Pages/Dashboard/PushNotification";
import Events from "../Pages/Dashboard/UpdatePassword";
import Banner from "../Pages/Dashboard/Banner";
import AboutUs from "../Pages/Dashboard/AboutUs";
import PrivacyPolicy from "../Pages/Dashboard/PrivacyPolicy";
import TermsAndConditions from "../Pages/Dashboard/TermsAndCondition";
import ChangePassword from "../Pages/Auth/ChangePassword";
import Login from "../Pages/Auth/Login";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import VerifyOtp from "../Pages/Auth/VerifyOtp";
import ResetPassword from "../Pages/Auth/ResetPassword";
import NotFound from "../NotFound";
import Notifications from "../Pages/Dashboard/Notifications";
import SubCategory from "../Pages/Dashboard/SubCategory";
import AdminProfile from "../Pages/Dashboard/AdminProfile/AdminProfile";
import RetailerTable from "../Pages/Dashboard/Retailer";
import WholesealerTable from "../Pages/Dashboard/Wholesealer";
import SalesManagement from "../Pages/Dashboard/SalesManagement";
import Retailer from "../Pages/Dashboard/Retailer";
import SaleRepsManagement from "../Pages/Dashboard/SaleRepsManagement";
import ViewSalesReps from "../components/SalesRepsManagement/detailsSalesReps/ViewSalesReps";
import Products from "../Pages/Dashboard/Products";
import LoyaltyProgram from "../Pages/Dashboard/LoyaltyProgram";
import CommissionTracking from "../Pages/Dashboard/CommissionTracking";
import MyCart from "../Pages/Dashboard/MyCart";
import Subscription from "../Pages/Dashboard/Subscription";
import CreateAccount from "../Pages/Auth/CreateAccount";
import PrivateRoute from "./ProtectedRoute";
import Myorders from "../Pages/Dashboard/MyOrders";
// import SalesRepsManagementTable from "../components/SalesRepsManagement/SalesRepsManagement";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <ProtectedRoute><Main /></ProtectedRoute> ,
    element: <PrivateRoute >
       <Main />
    </PrivateRoute>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/salesManagement",
        element: <SalesManagement />,
      },
      {
        path: "/orders",
        element: <Myorders />,
      },
      {
        path: "/retailer/:id",
        element: <ViewSalesReps />,
      },
      {
        path: "/salesRepsManage",
        element: <CommissionTracking />,
      },

      {
        path: "/inventory",
        element: <Products />,
      },
      {
        path: "/mycart",
        element: <MyCart />,
      },
      {
        path: "/loyaltyProgram",
        element: <LoyaltyProgram />,
      },
      {
        path: "/category",
        element: <Category />,
      },
      {
        path: "/subscription",
        element: <Subscription />,
      },
      {
        path: "/events",
        element: <Events />,
      },
      {
        path: "/banner",
        element: <Banner />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms-and-conditions",
        element: <TermsAndConditions />,
      },
      {
        path: "/change-password",
        element: <ChangePassword />,
      },
      {
        path: "/sub-category",
        element: <SubCategory />,
      },
      {
        path: "/profile",
        element: <AdminProfile />,
      },
      {
        path: "/notification",
        element: <Notifications />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "/auth",
        element: <Login />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "create-account",
        element: <CreateAccount />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "verify-otp",
        element: <VerifyOtp />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
