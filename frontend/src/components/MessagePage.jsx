import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Stack, Typography, Avatar, colors } from "@mui/material";
import MessageBox from "./MessageBox";
import MessageInput from "./MessageInput";
import Contact from "./Contact";
import ProfilePicture from "./ProfilePicture";

const MessagePage = () => {
    const user = useSelector((state) => state.user);
    const [allMessage, setAllMessage] = useState([]);
    const [showProfilePic, setShowProfilePic] = useState(false);
    const [selectedUserData, setSelectedUserData] = useState({
        userId: "",
        name: "",
        email: "",
        profilePic: "",
        online: false,
    });
    const id = useSelector((state) => state.user._id);
    const params = useParams();
    const socketConnection = useSelector(
        (state) => state.user.socketConnection
    );
    useEffect(() => {
        console.log("socketConnection", socketConnection);
        if (socketConnection && params.userId != "home") {
            socketConnection.emit("message-page", params?.userId);
            socketConnection.on("message-user", (data) => {
                console.log(data);
                setSelectedUserData(data);
            });
            socketConnection.on("previous-messages", (data) => {
                setAllMessage(data);
            });
            socketConnection.on("get-conversation-messages", (data) => {
                console.log("Messages", data);
                setAllMessage(data);
            });
        }
        return () => {};
    }, [socketConnection, params?.userId, user]);
    return (
        <>
            {showProfilePic && (
                <ProfilePicture
                    image={selectedUserData.profilePic}
                    handleClose={setShowProfilePic}
                />
            )}
            <Stack height="100%">
                <Stack
                    justifyContent={"center"}
                    width={"100%"}
                    sx={{
                        backgroundColor: "#bab9ce",
                        height: "65px",
                        borderLeft: "2px solid #e5e7eb",
                    }}
                >
                    <Stack
                        direction={"row"}
                        sx={{
                            padding: "8px",
                            alignItems: "center",
                            marginLeft: "16px",
                        }}
                        gap={2}
                    >
                        <Avatar
                            onClick={() => {
                                console.log("Click occured");
                                setShowProfilePic(true);
                            }}
                            size={64}
                            src={selectedUserData.profilePic}
                            alt={selectedUserData.name}
                            name={selectedUserData.name}
                        ></Avatar>
                        <Stack>
                            <Typography
                                sx={{ fontSize: "20px", fontWeight: "bold" }}
                            >
                                {selectedUserData.name}
                            </Typography>
                            <Typography>
                                {selectedUserData.online ? (
                                    <span>Online</span>
                                ) : (
                                    <span>Offline</span>
                                )}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
                <MessageBox allMessage={allMessage}></MessageBox>
                <MessageInput></MessageInput>
            </Stack>
        </>
    );
};

export default MessagePage;
