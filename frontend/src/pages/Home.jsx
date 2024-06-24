import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import {
    logout,
    setOnlineUser,
    setSocketConnection,
    setUser,
} from "../redux/userSlice";
import { Stack } from "@mui/material";
import Sidebar from "../components/Sidebar";
import ContactsBox from "../components/ContactsBox";
import io from "socket.io-client";
const Home = () => {
    const user = useSelector((state) => state.user);
    console.log("redux user", user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fetchUserDetails = async () => {
        try {
            const url = `${process.env.REACT_APP_BACKEND_URL}/api/user-details`;
            const response = await axios({
                url: url,
                method: "get",
                withCredentials: true,
            });
            console.log("From home", response.data.data);
            dispatch(setUser(response.data.data));
            if (response.data.data.logout) {
                dispatch(logout());
                navigate("/login");
            }
        } catch (error) {}
    };

    useEffect(() => {
        fetchUserDetails();
    }, []);

    // socket connection script
    useEffect(() => {
        const socketConnection = io(process.env.REACT_APP_BACKEND_URL, {
            auth: {
                token: localStorage.getItem("token"),
            },
        });
        socketConnection.on("onlineUser", (data) => {
            dispatch(setOnlineUser(data));
            console.log(data);
        });
        dispatch(setSocketConnection(socketConnection));
        return () => {
            socketConnection.disconnect();
        };
    }, []);

    return (
        <Stack direction={"row"} width={"100vw"} height={"100vh"}>
            <Stack width={"45px"} height={"100%"} sx={{ bgcolor: "#cac9d5" }}>
                <Sidebar></Sidebar>
            </Stack>
            <Stack width={"20%"} height={"100%"} sx={{ bgcolor: "gray" }}>
                <ContactsBox></ContactsBox>
            </Stack>
            <Stack width={"77%"} height={"100%"} sx={{ bgcolor: "whitesmoke" }}>
                <Outlet></Outlet>
            </Stack>
        </Stack>
    );
};

export default Home;
