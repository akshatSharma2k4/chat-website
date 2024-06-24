import { Stack } from "@mui/material";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import AttachmentSelector from "./AttachmentSelector";
import ShowAudio from "./ShowAudio";
import ShowVideo from "./ShowVideo";
import ShowImage from "./ShowImage";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const MessageInput = () => {
    const socketConnection = useSelector(
        (state) => state.user.socketConnection
    );
    const user = useSelector((state) => state.user);
    const params = useParams();
    const [openAttachment, setOpenAttachment] = useState(false);
    const [message, setMessage] = useState({
        text: "",
        imageUrl: "",
        videoUrl: "",
        audioUrl: "",
    });
    const handleTextMessageChange = (event) => {
        setMessage((prev) => {
            return { ...prev, text: event.target.value };
        });
    };
    const handleTextSubmit = (event) => {
        event.preventDefault();
        if (
            message.text ||
            message.imageUrl ||
            message.videoUrl ||
            message.audioUrl
        ) {
            if (socketConnection) {
                socketConnection.emit("new-message", {
                    sender: user._id,
                    reciever: params.userId,
                    ...message,
                });
                setMessage({
                    text: "",
                    imageUrl: "",
                    videoUrl: "",
                    audioUrl: "",
                });
            }
        }
    };
    return (
        <Stack
            direction={"row"}
            alignItems={"center"}
            width={"100%"}
            gap={1}
            padding="0 10px 0 10px"
            sx={{
                backgroundColor: "#bab9ce",
                height: "65px",
                borderLeft: "2px solid #e5e7eb",
            }}
        >
            {openAttachment && <AttachmentSelector setMessage={setMessage} />}

            {message.imageUrl && (
                <ShowImage image={message.imageUrl} setMessage={setMessage} />
            )}
            {message.videoUrl && (
                <ShowVideo video={message.videoUrl} setMessage={setMessage} />
            )}
            {message.audioUrl && (
                <ShowAudio audio={message.audioUrl} setMessage={setMessage} />
            )}
            <div
                style={{
                    backgroundColor: "whitesmoke",
                    borderRadius: "50%",
                    width: "fit-content",
                    padding: "7px",
                }}
            >
                <GrAttachment
                    size={20}
                    onClick={() => {
                        setOpenAttachment(!openAttachment);
                    }}
                />
            </div>
            <form
                onSubmit={handleTextSubmit}
                style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    height: "100%",
                }}
            >
                <input
                    placeholder="Enter Message to Send...."
                    style={{
                        width: "100%",
                        height: "60%",
                        borderRadius: "10px",
                        border: "none",
                        outline: "none",
                        paddingLeft: "8px",
                        fontWeight: "500",
                    }}
                    value={message.text}
                    onChange={handleTextMessageChange}
                />
                <button
                    style={{
                        backgroundColor: "whitesmoke",
                        borderRadius: "50%",
                        padding: "7px",
                    }}
                >
                    <IoSend size={20} />
                </button>
            </form>
        </Stack>
    );
};

export default MessageInput;
