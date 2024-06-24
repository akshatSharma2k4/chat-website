import { Stack, Typography } from "@mui/material";
import React from "react";
import moment from "moment/moment";
import { useSelector } from "react-redux";

const ImageMessage = ({ msg }) => {
    const userId = useSelector((state) => state.user._id);
    return (
        <Stack
            gap={1}
            alignSelf={userId === msg.msgBy ? "flex-end" : "flex-start"}
            sx={{
                backgroundColor: userId === msg.msgBy ? "#57c057" : "white",
                padding: "10px 10px 5px 10px",
                width: "max-content",
                minWidth: "60px",
                borderRadius: "8px",
            }}
        >
            <img
                src={msg.imageUrl}
                alt="Cannot download"
                style={{
                    width: "300px",
                    // maxHeight: "300px",
                    height: "auto",
                    borderRadius: "8px",
                }}
            />
            <Typography>{msg.text}</Typography>
            <Typography fontSize={"12px"} alignSelf={"flex-end"}>
                {moment(msg.updatedAt).format("hh:mm a")}
            </Typography>
        </Stack>
    );
};

export default ImageMessage;
