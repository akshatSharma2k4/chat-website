import { Stack, Avatar, Typography } from "@mui/material";
import React from "react";
import { FaImage } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import { FaFileAudio } from "react-icons/fa6";

const Contact = ({ name, image, lastMessage, unseenMsg }) => {
    return (
        <>
            <Stack
                direction={"row"}
                className="contact-hover"
                sx={{
                    padding: "8px",
                    backgroundColor: "whitesmoke",
                    cursor: "pointer",
                }}
                gap={2}
            >
                <Avatar src={image} alt={name}></Avatar>
                <Stack>
                    <Typography fontWeight={"510"}>{name}</Typography>
                    <Stack
                        direction={"row"}
                        alignItems={"center"}
                        gap={1}
                        color={"#555151"}
                    >
                        {lastMessage.imageUrl && <FaImage />}
                        {lastMessage.videoUrl && <FaVideo />}
                        {lastMessage.audioUrl && <FaFileAudio />}
                        <Typography
                            fontSize={"smaller"}
                            className="text-ellipsis"
                        >
                            {lastMessage.text ? (
                                lastMessage.text
                            ) : lastMessage.imageUrl ? (
                                <span>Image</span>
                            ) : lastMessage.videoUrl ? (
                                <span>Video</span>
                            ) : (
                                <span>Audio</span>
                            )}
                        </Typography>
                    </Stack>
                </Stack>
                {/* <div
                    style={{
                        textAlign: "center",
                        backgroundColor: "teal",
                        width: "25px",
                        height: "25px",
                        borderRadius: "50%",
                        color: "white",
                        alignSelf: "flex-end",
                        marginLeft: "85px",
                    }}
                >
                    {unseenMsg}
                </div> */}
            </Stack>
            <hr />
        </>
    );
};

export default Contact;
