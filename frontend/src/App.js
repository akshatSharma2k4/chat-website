import logo from "./logo.svg";
import "./App.css";
import { Outlet } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function App() {
    return (
        <>
            <Toaster></Toaster>
            <main>
                <Outlet></Outlet>
            </main>
        </>
    );
}

export default App;
