/* eslint-disable no-dupe-keys */

import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddCategory from "./component/AddCategory";
import Category from "./component/Category";
import RootLayout from "./component/RootLayout";
import Detail from "./component/Detail";
import Update from "./component/Update";
import Login from "./component/Login";
import Singup from "./component/Singup";
import { isLogin } from "../src/utli/checkAuth";

const router = createBrowserRouter([
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "singup",
    element: <Singup />,
  },

  {
    path: "dashboard",
    loader: isLogin,
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <Category />,
      },
      { path: "category", element: <Category /> },
      {
        path: "add-category",
        element: <AddCategory />,
      },
      {
        path: "detail/:id",
        element: <Detail />,
      },
      {
        path: "edit/:id",
        element: <Update />,
      },
    ],
  },
]);
function App() {
  return (
    <>
      <h1>crud app</h1>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
