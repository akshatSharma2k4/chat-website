import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { Button } from "@mui/material";
import { ButtonGroup } from "@mui/material";
import { useState } from "react";
const BackgroundPage = ({state}) => {
    const [loginSignUpState, setLoginSignUpState] = useState(state);
    return (
        <Stack
            bgcolor={"whitesmoke"}
            width={"100vw"}
            height={"100vh"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={"10px"}
        >
            <Stack
                bgcolor={"white"}
                sx={{
                    boxSizing: "border-box",
                    height: "70px",
                    fontSize: "30px",
                    width: "27.5%",
                    borderRadius: "15px",
                    boxShadow: "10px 10px 15px rgba(0, 0, 0, 0.1)",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                alignItems={"center"}
            >
                <h1>{loginSignUpState === 0 ? "Login" : "Sign Up"}</h1>
            </Stack>
            <Stack
                bgcolor={"white"}
                sx={{
                    width: "27.5%",
                    borderRadius: "15px",
                    padding: "20px",
                    boxShadow: "10px 10px 15px rgba(0, 0, 0, 0.1)",
                }}
                alignItems={"center"}
                gap={"20px"}
            >
                <ButtonGroup
                    sx={{
                        width: "100%",
                        borderRadius: "10px",
                        //padding: "10px",
                    }}
                    variant="contained"
                    aria-label="Basic button group"
                >
                    <Button
                        sx={{ width: "50%", borderRadius: "10px" }}
                        onClick={() => {
                            setLoginSignUpState(0);
                        }}
                    >
                        Login
                    </Button>
                    <Button
                        sx={{ width: "50%", borderRadius: "10px" }}
                        onClick={() => {
                            setLoginSignUpState(1);
                        }}
                    >
                        SignUp
                    </Button>
                </ButtonGroup>
                {loginSignUpState === 0 ? <LoginPage /> : <RegisterPage />}
            </Stack>
        </Stack>
    );
};

export default BackgroundPage;
