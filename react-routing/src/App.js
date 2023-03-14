import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ErrorPage } from "./pages/Error";
import { HomePage } from "./pages/Home";
import { ProductsPage } from "./pages/Products";
import { ProductDetailPage } from "./pages/ProductDetail";
import { RootLayout } from "./pages/Root";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "products", element: <ProductsPage /> },
      { path: "products/:id", element: <ProductDetailPage /> }
    ]
  }
])

function App()
{
  return (
    <RouterProvider router={ router } />
  );
}

export default App;
