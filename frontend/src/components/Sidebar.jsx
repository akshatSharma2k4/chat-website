import { Stack } from "@mui/material";
import React, { useState } from "react";
import { MdOutlineMessage } from "react-icons/md";
import { IoMdPersonAdd } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import EditUserDetails from "./EditUserDetails";

const Sidebar = () => {
    const user = useSelector((state) => state?.user);
    const [editUserOpen, setEditUserOpen] = useState(true);
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
                <NavLink
                    style={({ isActive }) =>
                        isActive ? activeIconStyle : iconStyle
                    }
                    title="Chat"
                >
                    <MdOutlineMessage size={30} />
                </NavLink>
                <NavLink style={iconStyle} title="Add Contact">
                    <IoMdPersonAdd size={30} />
                </NavLink>
            </Stack>
            <Stack marginBottom={8}>
                <NavLink
                    title={`${user.name}`}
                    style={iconStyle}
                    onClick={() => {
                        setEditUserOpen(true);
                    }}
                >
                    <MdAccountCircle size={30} />
                </NavLink>
                <NavLink title="Logout" style={iconStyle}>
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
        </Stack>    
    );
};

export default Sidebar;
