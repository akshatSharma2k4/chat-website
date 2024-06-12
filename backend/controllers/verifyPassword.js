const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const verifyPassword = async (req, resp) => {
    try {
        const { password, userId } = req.body;
        const user = await UserModel.findById(userId);
        const verifiedOrNot = await bcrypt.compare(password, user.password);
        if (!verifiedOrNot) {
            return resp.status(400).json({
                message: "Wrong Password",
                error: true,
            });
        }
        const tokenData = {
            id: user._id,
            email: user.email,
        };
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
            expiresIn: "1d",
        });
        const cookieOption = {
            http: true,
            secure: true,
        };
        return resp.cookie("token", token).status(200).json({
            message: "Login Successfully",
            token: token,
            success: true,
        });
    } catch (error) {
        return resp.status(500).json({
            message: error.message || error,
            error: true,
        });
    }
};
module.exports = verifyPassword;
