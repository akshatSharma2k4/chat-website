import { Box, Stack } from "@mui/material";
import React from "react";
import { IoClose } from "react-icons/io5";

const ProfilePicture = ({ image, handleClose }) => {
    return (
        <Stack
            sx={{
                position: "fixed",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(128, 0, 128, 0.1)",
            }}
        >
            <IoClose
                onClick={() => {
                    handleClose(false);
                }}
                className="hover-btn"
                size={32}
                style={{ position: "absolute", top: "80px", right: "10px" }}
            />
            <Box
                sx={{
                    bgcolor: "white",
                    width: "auto",
                    minWidth: "300px",
                    height: "500px",
                    padding: "20px",
                    boxShadow: "1px 5px 2px rgba(0,0,0,.1)",
                    borderRadius: "8px",
                }}
            >
                <img
                    src={image}
                    alt="uploadedImage"
                    style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                    }}
                />
            </Box>
        </Stack>
    );
};

export default ProfilePicture;
