const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");
const UserModel = require("../models/UserModel");

const updateUserDetails = async (req, resp) => {
    try {
        const token = req.cookies.token || "";
        const user = await getUserDetailsFromToken(token);
        const { name, profilePic } = req.body;
        console.log("name", name, "profilePic", profilePic);
        const updateUser = await UserModel.updateOne(
            { _id: user._id },
            {
                name,
                profilePicture: profilePic,
            }
        );
        const userInformation = await UserModel.findOne(user._id);
        console.log(userInformation);
        return resp.json({
            message: "user update successfully",
            data: userInformation,
            success: true,
        });
    } catch (error) {
        return resp.status(500).json({
            message: error.message || error,
            error: true,
        });
    }
};

module.exports = updateUserDetails;
