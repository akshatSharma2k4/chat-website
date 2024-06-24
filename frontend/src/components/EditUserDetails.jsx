import React, { useEffect, useState } from "react";
import {
    TextField,
    Typography,
    Stack,
    Avatar,
    Button,
    Box,
} from "@mui/material";
import uploadFile from "../helpers/uploadFile";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

const EditUserDetails = ({ data, onClose }) => {
    const dispatch = useDispatch();

    const [userData, setUserData] = useState({
        name: data?.name,
        profilePic: data?.profilePic,
    });
    const handleUsernameChange = (event) => {
        const { name, value } = event.target;
        setUserData((prevData) => {
            return {
                ...prevData,
                [name]: value,
            };
        });
    };

    const handleUploadPhoto = async (event) => {
        const file = event.target.files[0];
        const uploadPhoto = await uploadFile(file);
        setUserData((prev) => {
            console.log("Previous", prev);
            return {
                ...prev,
                profilePic: uploadPhoto.url,
            };
        });
    };

    const handleSubmit = async (event) => {
        event.stopPropagation();
        event.preventDefault();
        const url = `${process.env.REACT_APP_BACKEND_URL}/api/update-user`;
        console.log("userData", userData);
        try {
            const response = await axios({
                method: "post",
                url: url,
                data: userData,
                withCredentials: true,
            });
            // console.log(response);
            toast.success(response.data.message);
            dispatch(setUser(response.data.data));
            onClose();
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };
    const dialogStyle = {
        position: "fixed",
        width: "100vw",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgb(122,118,140,.6)",
    };
    useEffect(() => {
        setUserData((prev) => {
            return {
                name: data.name,
                profilePic: data.profilePic,
            };
        });
    }, [data]);
    return (
        <Stack
            alignItems={"center"}
            justifyContent={"center"}
            style={dialogStyle}
        >
            <Stack
                style={{
                    backgroundColor: "white",
                    width: "30%",
                    height: "40%",
                    borderRadius: "10px",
                    padding: "20px",
                }}
            >
                <Typography variant="h5">Profile Details</Typography>
                <p>Edit Profile Details</p>

                <Stack
                    direction="row"
                    alignItems={"center"}
                    gap={2}
                    marginTop={2}
                >
                    <Typography>Name</Typography>
                    <TextField
                        name="name"
                        value={userData.name}
                        size="small"
                        id="outlined-basic"
                        variant="outlined"
                        onChange={handleUsernameChange}
                    />
                </Stack>
                <Stack
                    marginTop={2}
                    direction={"row"}
                    alignItems={"center"}
                    gap={2}
                >
                    <Avatar alt="Remy Sharp" src={userData?.profilePic} />
                    <label htmlFor="photo">
                        <Typography>Change Photo</Typography>
                    </label>
                    <input
                        type="file"
                        name="photo"
                        id="photo"
                        style={{ display: "none" }}
                        onChange={handleUploadPhoto}
                    />
                </Stack>
                <Stack
                    marginTop={2}
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"flex-end"}
                    gap={2}
                >
                    <Button variant="outlined" onClick={handleSubmit}>
                        Save
                    </Button>
                    <Button variant="contained" onClick={onClose}>
                        Cancel
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default EditUserDetails;
