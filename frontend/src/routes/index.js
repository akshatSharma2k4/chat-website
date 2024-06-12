import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import Home from "../pages/Home";
import MessagePage from "../components/MessagePage";
import BackgroundPage from "../layout/BackgroundPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "register",
                element: <BackgroundPage state={1} />,
            },
            {
                path: "login",
                element: <BackgroundPage state={0} />,
            },
            {
                path: "",
                element: <Home />,
                children: [
                    {
                        path: ":userId",
                        element: <MessagePage />,
                    },
                ],
            },
        ],
    },
]);
export default router;
