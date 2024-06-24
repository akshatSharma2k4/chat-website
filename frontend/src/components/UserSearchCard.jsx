import React from "react";
import { Stack, Typography } from "@mui/material";
import MyAvatar from "../layout/MyAvatar";
import { Link } from "react-router-dom";
const UserSearchCard = ({ user, onClose }) => {
    return (
        <>
            <Stack
                width={"100%"}
                direction={"row"}
                sx={{ padding: "8px", alignSelf: "flex-start" }}
                className="hover-search-user"
            >
                <Link to={"/" + user._id} onClick={onClose}>
                    <Stack direction={"row"} gap={2} width={"100%"}>
                        <MyAvatar
                            
                            src={user.profilePicture || null}
                            alt={user.name}
                            name={user.name}
                        >
                            {`${user.name.split(" ")[0][0]}`}
                        </MyAvatar>
                        <Stack>
                            <Typography fontWeight={"bold"}>
                                {user.name}
                            </Typography>
                            <Typography>{user.email}</Typography>
                        </Stack>
                    </Stack>
                </Link>
            </Stack>
        </>
    );
};

export default UserSearchCard;
