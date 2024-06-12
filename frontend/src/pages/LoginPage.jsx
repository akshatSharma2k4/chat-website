import React, { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/userSlice";

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loginDetails, setLoginDetails] = useState({
        email: "",
        password: "",
    });

    const handleLogin = async () => {
        try {
            const url = `${process.env.REACT_APP_BACKEND_URL}/api/check-email`;
            const data = {
                email: loginDetails.email,
            };
            const response = await axios.post(url, data);
            toast.success(response.data.message);
            if (response.data.success) {
                const verifyPasswordUrl = `${process.env.REACT_APP_BACKEND_URL}/api/verify-password`;
                try {
                    const data = {
                        userId: response.data.data._id,
                        password: loginDetails.password,
                    };
                    const passwordResponse = await axios({
                        method: "post",
                        url: verifyPasswordUrl,
                        data: data,
                        withCredentials: true,
                    });
                    toast.success(passwordResponse.data.message);
                    if (passwordResponse.data.success) {
                        dispatch(setToken(passwordResponse.data.token));
                        localStorage.setItem(
                            "token",
                            passwordResponse.data.token
                        );
                        navigate("/home");
                    }
                } catch (error) {
                    toast.error(error?.response?.data?.message);
                }
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };

    const handleGoogleClick = () => {
        console.log("GoogleClickOccured");
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLoginDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    return (
        <Stack width={"100%"} gap={"10px"} sx={{ width: "100%" }}>
            <TextField
                name="email"
                sx={{ width: "100%" }}
                id="outlined-basic"
                label="Email"
                variant="outlined"
                onChange={handleChange}
            />
            <TextField
                name="password"
                type="password"
                id="outlined-basic"
                label="Password"
                variant="outlined"
                onChange={handleChange}
            />
            <Button variant="contained" onClick={handleLogin}>
                Login
            </Button>
            <Button variant="contained" onClick={handleGoogleClick}>
                Login With Google
            </Button>
        </Stack>
    );
};

export default LoginPage;
