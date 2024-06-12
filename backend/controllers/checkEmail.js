const UserModel = require("../models/UserModel");

const checkEmail = async (req, resp) => {
    try {
        const { email } = req.body;
        const checkEmail = await UserModel.findOne({ email }).select(
            "-password"
        );
        if (!checkEmail) {
            return resp.status(400).json({
                message: "User does not exsists",
                error: true,
            });
        }
        return resp.status(200).json({
            message: "email verified",
            success: true,
            data: checkEmail,
        });
    } catch (error) {
        return resp.status(500).json({
            message: error.message || error,
            error: true,
        });
    }
};
module.exports = checkEmail;
