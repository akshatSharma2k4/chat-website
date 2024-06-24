import { Box, Stack } from "@mui/material";
import React from "react";
import { IoClose } from "react-icons/io5";

const ShowVideo = ({ video, setMessage }) => {
    const handleClose = () => {
        setMessage((prev) => {
            return { ...prev, imageUrl: "", videoUrl: "" };
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
                    alignSelf: "center",
                    left: "45%",
                    top: "15%",
                    width: "auto",
                    minWidth: "300px",
                    maxWidth: "500px",
                    height: "auto",
                    maxHeight: "500px",
                    padding: "20px",
                    boxShadow: "1px 5px 2px rgba(0,0,0,.1)",
                    borderRadius: "8px",
                }}
            >
                <video
                    src={video}
                    alt="uploadedImage"
                    style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                    }}
                    controls
                    muted
                    autoPlay
                />
            </Box>
        </Stack>
    );
};

export default ShowVideo;
