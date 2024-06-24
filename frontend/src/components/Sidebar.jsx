import { Stack } from "@mui/material";
import React, { useState } from "react";
import { MdOutlineMessage, MdAccountCircle } from "react-icons/md";
import { IoMdPersonAdd } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EditUserDetails from "./EditUserDetails";
import SearchUser from "./SearchUser";
import axios from "axios";
import toast from "react-hot-toast";
import { setUser } from "../redux/userSlice";

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state?.user);
    const [editUserOpen, setEditUserOpen] = useState(false);
    const [searchUserOpen, setSearchUserOpen] = useState(false);

    // handle logout function
    const handleLogout = async () => {
        const url = `${process.env.REACT_APP_BACKEND_URL}/api/logout`;
        const logout = await axios({
            method: "get",
            url: url,
            withCredentials: true,
        });
        console.log("Logout", logout);
        if (logout.data.success) {
            toast.success(logout.data.message);
            localStorage.setItem("token", "");
            dispatch(
                setUser({
                    _id: "",
                    name: "",
                    email: "",
                    profilePic: "",
                    token: "",
                    onlineUser: [],
                    socketConnection: null,
                })
            );
            navigate("/login");
        } else {
            toast.failure(logout.data.message);
        }
    };

    //styles for icons when they are active or not
    const iconStyle = {
        width: "100%",
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "45px",
    };
    const activeIconStyle = { ...iconStyle, backgroundColor: "#afaec0" };
    return (
        <Stack justifyContent={"space-between"} height={"100%"}>
            <Stack width={"100%"} marginTop={8}>
                {/* Chat icon */}
                <NavLink
                    style={({ isActive }) =>
                        isActive ? activeIconStyle : iconStyle
                    }
                    title="Chat"
                >
                    <MdOutlineMessage size={30} />
                </NavLink>
                {/* Add Contact */}
                <NavLink
                    style={({ isActive }) =>
                        isActive ? activeIconStyle : iconStyle
                    }
                    title="Add Contact"
                    onClick={() => {
                        setSearchUserOpen(true);
                    }}
                >
                    <IoMdPersonAdd size={30} />
                </NavLink>
            </Stack>
            <Stack marginBottom={8}>
                {/* Change user details */}
                <NavLink
                    title={`${user.name}`}
                    style={iconStyle}
                    onClick={() => {
                        setEditUserOpen(true);
                    }}
                >
                    <MdAccountCircle size={30} />
                </NavLink>
                {/* Logout */}
                <NavLink
                    title="Logout"
                    style={iconStyle}
                    onClick={handleLogout}
                >
                    <IoLogOut size={30} />
                </NavLink>
            </Stack>

            {/*Edit user details */}
            {editUserOpen && (
                <EditUserDetails
                    data={user}
                    onClose={() => {
                        setEditUserOpen(false);
                    }}
                />
            )}
            {/*search user  */}
            {searchUserOpen && (
                <SearchUser
                    onClose={() => {
                        setSearchUserOpen(false);
                    }}
                />
            )}
        </Stack>
    );
};

export default Sidebar;
