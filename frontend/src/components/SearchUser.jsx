import React, { useEffect, useState } from "react";
import {
    TextField,
    Typography,
    Stack,
    Button,
    CircularProgress,
} from "@mui/material";
import axios from "axios";

import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

import UserSearchCard from "./UserSearchCard";

const EditUserDetails = ({ onClose }) => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSearchUser = async () => {
        const url = `${process.env.REACT_APP_BACKEND_URL}/api/search-user`;
        setLoading(true);
        const response = await axios({
            url: url,
            method: "post",
            data: { search: search },
            withCredentials: true,
        });
        console.log(response.data.data);
        setLoading(false);
        setUsers(response.data.data);
    };

    useEffect(() => {
        handleSearchUser();
    }, [search]);

    const dialogStyle = {
        position: "fixed",
        width: "100vw",
        height: "100vh",
        alignItems: "center",
        backgroundColor: "rgb(122,118,140,.6)",
    };
    return (
        <Stack style={dialogStyle} gap={1}>
            <div
                className="hover-btn"
                style={{
                    position: "absolute",
                    alignSelf: "flex-end",
                    padding: "20px",
                }}
                onClick={onClose}
            >
                <IoClose size={40} />
            </div>

            <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                style={{
                    marginTop: "4vh",
                    backgroundColor: "white",
                    width: "30%",
                    height: "auto",
                    borderRadius: "10px",
                    padding: "20px",
                }}
            >
                <input
                    style={{ width: "80%", outline: "none" }}
                    type="text"
                    placeholder="Search user by name or email"
                    value={search}
                    onChange={(event) => {
                        setSearch(event.target.value);
                    }}
                />
                <div style={{ color: "gray" }}>
                    <FaSearch />
                </div>
            </Stack>
            <Stack
                alignItems={"center"}
                justifyContent={"space-between"}
                style={{
                    backgroundColor: "white",
                    width: "30%",
                    maxHeight: "50%",
                    borderRadius: "10px",
                    padding: "20px",
                    overflowY: "auto",
                }}
            >
                {users.length === 0 && (
                    <Typography color={"gray"}>No users found</Typography>
                )}
                {loading && (
                    <Stack direction={"row"} gap={2}>
                        <CircularProgress color="primary" size={"20px"} />
                        <Typography color={"gray"}>Loading...</Typography>
                    </Stack>
                )}
                {!loading &&
                    users.length !== 0 &&
                    users.map((user, index) => {
                        return <UserSearchCard user={user} onClose={onClose} />;
                    })}
            </Stack>
        </Stack>
    );
};

export default EditUserDetails;
