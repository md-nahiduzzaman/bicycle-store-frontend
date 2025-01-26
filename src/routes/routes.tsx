import App from "@/App";
import MainLayout from "@/components/layouts/MainLayout";
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
]);

export default routes;
