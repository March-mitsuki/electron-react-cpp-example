import Initializer from "./Initializer";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Home from "./app/page";

const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

export default function App() {
  return (
    <Initializer>
      <RouterProvider router={router} />
    </Initializer>
  );
}
