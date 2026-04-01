import react from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  ProductDetailsPage,
  Products,
  PublicHomePage,
  HomeLayout,
  Signup,
  Signin,
  Error,
  CartPage,
} from "./pages";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <PublicHomePage />,
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "product/:id",
          element: (
            <ProtectedRoute>
              <ProductDetailsPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "signup",
          element: <Signup />,
        },
        {
          path: "signin",
          element: <Signin />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
