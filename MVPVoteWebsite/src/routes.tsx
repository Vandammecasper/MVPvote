import { createBrowserRouter } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import Create from "./components/pages/Create/Create";
import Join from "./components/pages/Join/Join";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/create",
        element: <Create />,
    },
    {
        path: "/join",
        element: <Join />,
    }
])

export default router;