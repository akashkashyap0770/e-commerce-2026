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
          path: "/",
          element: <PublicHomePage />,
        },
        {
          path: "products",
          element: <Products />,
        },
        {
          path: "product/:id",
          element: <ProductDetailsPage />,
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
