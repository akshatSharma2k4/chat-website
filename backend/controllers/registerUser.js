const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const registerUser = async (req, resp) => {
    try {
        const { name, email, password, profilePic } = req.body;
        const checkEmail = await UserModel.findOne({ email });
        if (checkEmail) {
            return resp.status(400).json({
                message: "User already exists",
                error: true,
            });
        }

        // hasing the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const payload = {
            name,
            email,
            profilePicture: profilePic,
            password: hashPassword,
        };
        const user = new UserModel(payload);
        const savedUser = await user.save();
        return resp.status(200).json({
            message: "User created successfully",
            data: savedUser,
            success: true,
        });
    } catch (error) {
        return resp.status(500).json({
            message: error.message || error,
            error: true,
        });
    }
};

module.exports = registerUser;
