import { Stack, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import TextMessage from "../layout/TextMessage";
import ImageMessage from "../layout/ImageMessage";
import VideoMessage from "../layout/VideoMessage";
import AudioMessage from "../layout/AudioMessage";
const MessageBox = ({ allMessage }) => {
    const currentMessage = useRef(null);
    useEffect(() => {
        if (currentMessage.current) {
            currentMessage.current.scrollIntoView({
                behavior: "smooth",
            });
        }
    }, [allMessage]);
    return (
        <Stack
            height={"100%"}
            gap={1}
            sx={{
                overflowY: "auto",
                backgroundColor: "#ece3e3",
                padding: "10px 10px",
            }}
        >
            {allMessage.map((msg, index) => {
                if (msg.imageUrl) return <ImageMessage msg={msg} />;
                else if (msg.videoUrl) return <VideoMessage msg={msg} />;
                else if (msg.audioUrl) return <AudioMessage msg={msg} />;
                else if (msg.text) return <TextMessage msg={msg} />;
            })}
            <div ref={currentMessage} style={{ marginBottom: "4px" }}></div>
        </Stack>
    );
};

export default MessageBox;
