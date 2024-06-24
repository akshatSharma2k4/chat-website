import React, { useEffect, useState } from "react";
import stringToColor from "../helpers/stringToColor";
import { useSelector } from "react-redux";
import { Avatar, Badge } from "@mui/material";

const MyAvatar = ({ userId, src, alt, size, children, name }) => {
    const onlineUser = useSelector((state) => state.user.onlineUser);
    const isOnline = onlineUser.includes(userId);
    return !isOnline ? (
        <Avatar
            src={src}
            alt={alt}
            size={size}
            sx={{
                bgcolor: stringToColor(name),
            }}
        >
            {children}
        </Avatar>
    ) : (
        <Badge
            color="primary"
            overlap="circular"
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            variant="dot"
        >
            <Avatar
                src={src}
                alt={alt}
                size={size}
                sx={{
                    bgcolor: stringToColor(name),
                }}
            >
                {children}
            </Avatar>
        </Badge>
    );
};

export default MyAvatar;
