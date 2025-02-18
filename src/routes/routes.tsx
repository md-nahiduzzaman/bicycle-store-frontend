import App from "@/App";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import MainLayout from "@/components/layouts/MainLayout";
import Dashboard from "@/components/Shared/Dashboard";
import ProductDetail from "@/components/Shared/ProductDetail";
import ErrorPage from "@/pages/ErrorPage";
import Login from "@/pages/Login";
import MainCartPage from "@/pages/MainCartPage";
import Register from "@/pages/Register";
import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/cart",
        element: <MainCartPage />,
      },
      {
        path: "/product/:id",
        element: <ProductDetail />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
  },
]);

export default routes;
