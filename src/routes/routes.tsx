import { createBrowserRouter, Navigate } from "react-router-dom";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import MainLayout from "@/components/layouts/MainLayout";
import ProductDetail from "@/components/Shared/ProductDetail";
import AllOrderInfo from "@/pages/Dashboard/Admin/AllOrderInfo";
import AllProductInfo from "@/pages/Dashboard/Admin/AllProductInfo";
import AllUserInfo from "@/pages/Dashboard/Admin/AllUserInfo";
import UpdateProduct from "@/pages/Dashboard/Admin/UpdateProduct";
import Profile from "@/pages/Dashboard/User/Profile";
import ErrorPage from "@/pages/ErrorPage";
import Login from "@/pages/Login";
import MainCartPage from "@/pages/MainCartPage";
import Register from "@/pages/Register";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./adminRoutes";
import CustomerRoute from "./customerRoute";
import App from "@/App";
import AllProduct from "@/pages/AllProduct";
import About from "@/pages/About";
import MyOrderInfo from "@/pages/Dashboard/User/MyOrderInfo";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <App /> },
      { path: "products", element: <AllProduct /> },
      { path: "about", element: <About /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "cart", element: <MainCartPage /> },
      { path: "product/:id", element: <ProductDetail /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Navigate to="profile" /> },
      {
        path: "admin/users",
        element: (
          <AdminRoute>
            <AllUserInfo />
          </AdminRoute>
        ),
      },
      {
        path: "admin/products",
        element: (
          <AdminRoute>
            <AllProductInfo />
          </AdminRoute>
        ),
      },
      {
        path: "admin/update/:id",
        element: (
          <AdminRoute>
            <UpdateProduct />
          </AdminRoute>
        ),
      },
      {
        path: "admin/orders",
        element: (
          <AdminRoute>
            <AllOrderInfo />
          </AdminRoute>
        ),
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "my-orders",
        element: (
          <CustomerRoute>
            <MyOrderInfo />
          </CustomerRoute>
        ),
      },
    ],
  },
]);

export default routes;
