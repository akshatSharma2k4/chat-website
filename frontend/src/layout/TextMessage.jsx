import { Stack, Typography } from "@mui/material";
import React from "react";
import moment from "moment/moment";
import { useSelector } from "react-redux";

const TextMessage = ({ msg }) => {
    const userId = useSelector((state) => state.user._id);
    return (
        <Stack
            alignSelf={userId === msg.msgBy ? "flex-end" : "flex-start"}
            sx={{
                backgroundColor: userId === msg.msgBy ? "#57c057" : "white",
                height: "auto",
                padding: "5px 10px",
                minWidth: "60px",
                maxWidth: "40%",
                borderRadius: "8px",
            }}
        >
            <Typography
                sx={{ wordBreak: "break-word", overflowWrap: "break-word" }}
            >
                {msg.text}
            </Typography>
            <Typography fontSize={"12px"} alignSelf={"flex-end"}>
                {moment(msg.updatedAt).format("hh:mm")}
            </Typography>
        </Stack>
    );
};

export default TextMessage;
