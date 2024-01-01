import { createBrowserRouter } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import UploadPage from "./pages/UploadPage";
import RedirectPage from "./pages/RedirectPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/:id",
        element: <RedirectPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/upload",
        element: <UploadPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: "*",
        element: <h1>No encontrado!</h1>,
        errorElement: <ErrorPage />,
    },
]);
