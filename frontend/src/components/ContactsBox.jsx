import { Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { GoArrowUpLeft } from "react-icons/go";

import Contact from "./Contact";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const ContactsBox = () => {
    const [allContacts, setAllContacts] = useState([]);
    const user = useSelector((state) => state.user);
    const socketConnection = useSelector(
        (state) => state.user.socketConnection
    );
    useEffect(() => {
        if (socketConnection && user) {
            socketConnection.emit("get-contacts", user._id);
            socketConnection.on("contacts", (data) => {
                const modifiedDetails = data.map((element) => {
                    if (element.sender._id === element.reciever._id) {
                        return {
                            ...element,
                            userDetails: element.sender,
                        };
                    } else if (element.sender._id === user?._id) {
                        return {
                            ...element,
                            userDetails: element.reciever,
                        };
                    } else if (element.reciever._id === element.reciever._id) {
                        return {
                            ...element,
                            userDetails: element.sender,
                        };
                    }
                });
                setAllContacts(modifiedDetails);
                console.log(modifiedDetails);
            });
        }
    }, [socketConnection, user]);
    return (
        <Stack>
            <Stack
                alignItems={"center"}
                justifyContent={"center"}
                width={"100%"}
                sx={{
                    backgroundColor: "#bab9ce",
                    height: "65px",
                }}
            >
                <Typography variant="h5" fontWeight={"bold"}>
                    Messages
                </Typography>
            </Stack>
            <Stack sx={{ overflowY: "auto" }}>
                {allContacts.length === 0 ? (
                    <Stack
                        alignItems={"center"}
                        justifyContent={"center"}
                        sx={{ marginTop: "160px" }}
                    >
                        <GoArrowUpLeft size={"100px"} />
                        <Typography
                            fontSize={20}
                            fontWeight={"bold"}
                            textAlign={"center"}
                        >
                            Add friends to start conversation
                        </Typography>
                    </Stack>
                ) : (
                    allContacts.map((contact) => {
                        return (
                            <NavLink to={"/" + contact.userDetails._id}>
                                <Contact
                                    key={contact._id}
                                    lastMessage={contact.lastMsg}
                                    name={contact.userDetails.name}
                                    image={contact.userDetails.profilePicture}
                                    unseenMsg={contact.unseenMsg}
                                />
                            </NavLink>
                        );
                    })
                )}
            </Stack>
        </Stack>
    );
};

export default ContactsBox;
