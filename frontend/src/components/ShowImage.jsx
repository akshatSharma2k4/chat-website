import { Box, Stack } from "@mui/material";
import React from "react";
import { IoClose } from "react-icons/io5";

const ShowImage = ({ image, setMessage }) => {
    const handleClose = () => {
        setMessage((prev) => {
            return { ...prev, imageUrl: "" };
        });
    };
    return (
        <Stack>
            <IoClose
                onClick={handleClose}
                className="hover-btn"
                size={32}
                style={{ position: "absolute", top: "80px", right: "10px" }}
            />
            <Box
                sx={{
                    position: "absolute",
                    bgcolor: "white",
                    left: "45%",
                    top: "15%",
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

export default ShowImage;
