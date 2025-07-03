import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import ImageUploader from "./components/ImageUploader";
// import QrGenerator from "./components/QrGenerator";
import ToolLayout from "./pages/ToolLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />, // Home page with no nav bar
  },
  {
    path: "/",
    element: <ToolLayout />, // Layout with nav bar
    children: [
      {
        path: "merge-image",
        element: <ImageUploader />,
      },
      {
        path: "qr-generator",
        // element: <QrGenerator />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
