import { Box, Stack } from "@mui/material";
import React from "react";
import { IoClose } from "react-icons/io5";

const ShowAudio = ({ audio, setMessage }) => {
    const handleClose = () => {
        setMessage((prev) => {
            return { ...prev, imageUrl: "", videoUrl: "", audioUrl: "" };
        });
    };
    console.log("audio", audio);
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
                <audio controls autoPlay style={{ display: "block" }}>
                    <source src={audio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </Box>
        </Stack>
    );
};

export default ShowAudio;
