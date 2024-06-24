import { Stack, TextField, Button, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import uploadFile from "../helpers/uploadFile";

const LoginPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [uploadPhoto, setUploadPhoto] = useState(null);
    const [signupDetails, setSignupDetails] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        profilePic: "",
    });
    // handles user data input in form to update state
    const handleChange = (event) => {
        const { name, value } = event.target;
        setSignupDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    // handle submit button functionality
    const handleSubmit = async () => {
        const url = `${process.env.REACT_APP_BACKEND_URL}/api/register`;
        try {
            if (signupDetails.password !== signupDetails.confirmPassword) {
                toast.error("Password do not match");
                return;
            }
            const data = {
                name: signupDetails.username,
                email: signupDetails.email,
                password: signupDetails.password,
                profilePic: signupDetails.profilePic,
            };
            console.log("Registration data", data);
            const response = await axios.post(url, data);
            toast.success(response.data.message);
            if (response.data.success) {
                setSignupDetails({
                    username: "",
                    password: "",
                    confirmPassword: "",
                    profilePic: "",
                });
                navigate("/home");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };

    const handleGoogleClick = () => {
        console.log("GoogleClickOccured");
    };
    const handleProfilePhotoUpload = async (e) => {
        setLoading(true);
        const photo = e.target.files[0];
        const uploadPhoto = await uploadFile(photo);
        //console.log("uploadPhoto", uploadPhoto);
        setUploadPhoto(photo);
        setSignupDetails((preve) => {
            return {
                ...preve,
                profilePic: uploadPhoto?.url,
            };
        });
        setLoading(false);
    };
    const handlePhotoCancel = (e) => {
        setUploadPhoto(null);
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
                name="username"
                sx={{ width: "100%" }}
                id="outlined-basic"
                label="Username"
                variant="outlined"
                onChange={handleChange}
            />
            <TextField
                name="password"
                id="outlined-basic"
                label="Password"
                variant="outlined"
                onChange={handleChange}
            />
            <TextField
                name="confirmPassword"
                id="outlined-basic"
                label="Confirm Password"
                variant="outlined"
                onChange={handleChange}
            />
            <div>
                <Stack direction={"row"} alignItems={"center"} gap={2}>
                    <label
                        htmlFor="profilePic"
                        style={{  cursor: "pointer" }}
                    >
                        {uploadPhoto ? (
                            uploadPhoto.name
                        ) : (
                            <p>Upload profile picture</p>
                        )}
                    </label>
                    <input
                        type="file"
                        id="profilePic"
                        name="profilePic"
                        onChange={handleProfilePhotoUpload}
                        style={{ display: "none", cursor: "pointer" }}
                    />
                    <button className="text-lg" onClick={handlePhotoCancel}>
                        <IoCloseOutline size={20} />
                    </button>
                </Stack>
            </div>
            <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={loading ? true : false}
            >
                {loading ? <CircularProgress size={24} /> : <span>SignUp</span>}
            </Button>
            <Button variant="contained" onClick={handleGoogleClick}>
                SignUp With Google
            </Button>
        </Stack>
    );
};

export default LoginPage;
