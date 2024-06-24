import { Stack } from "@mui/material";
import React from "react";
import { FaImage } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import { FaFileAudio } from "react-icons/fa6";
import uploadFile from "../helpers/uploadFile";

const AttachmentSelector = ({ setMessage }) => {
    const handleUploadImage = async (event) => {
        const file = event.target.files[0];
        const uploadData = await uploadFile(file);
        console.log(uploadData.url);
        setMessage((prev) => {
            return { ...prev, imageUrl: uploadData.url };
        });
    };
    const handleUploadVideo = async (event) => {
        const file = event.target.files[0];
        const uploadData = await uploadFile(file);
        console.log(uploadData.url);
        setMessage((prev) => {
            return { ...prev, videoUrl: uploadData.url };
        });
    };
    const handleUploadAudio = async (event) => {
        const file = event.target.files[0];
        const uploadData = await uploadFile(file);
        console.log(uploadData.url);
        setMessage((prev) => {
            return { ...prev, audioUrl: uploadData.url };
        });
    };
    return (
        <Stack
            sx={{
                position: "absolute",
                marginBottom: "240px",
                backgroundColor: "white",
                padding: "15px",
                borderRadius: "8px",
                boxShadow: "1px 1px 10px rgba(0,0,0,.1)",
            }}
        >
            <label htmlFor="photoUpload">
                <Stack
                    direction={"row"}
                    alignItems={"center"}
                    gap={2}
                    className="selectorHover"
                    sx={{ padding: "10px" }}
                >
                    <FaImage size={20} /> Image
                </Stack>
            </label>
            <input
                type="file"
                id="photoUpload"
                style={{ display: "none" }}
                onChange={handleUploadImage}
                accept="image/*"
            />
            <label htmlFor="videoUpload">
                <Stack
                    direction={"row"}
                    alignItems={"center"}
                    gap={2}
                    className="selectorHover"
                    sx={{ padding: "10px" }}
                >
                    <FaVideo size={20} /> Video
                </Stack>
            </label>
            <input
                type="file"
                id="videoUpload"
                style={{ display: "none" }}
                onChange={handleUploadVideo}
                accept="video/*"
            />
            <label htmlFor="audioUpload">
                <Stack
                    direction={"row"}
                    alignItems={"center"}
                    gap={2}
                    className="selectorHover"
                    sx={{ padding: "10px" }}
                >
                    <FaFileAudio size={20} /> Audio
                </Stack>
            </label>
            <input
                type="file"
                id="audioUpload"
                style={{ display: "none" }}
                onChange={handleUploadAudio}
                accept="audio/*"
            />
        </Stack>
    );
};

export default AttachmentSelector;
