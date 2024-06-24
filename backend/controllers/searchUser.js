const UserModel = require("../models/UserModel");

const searchUser = async (req, resp) => {
    try {
        const { search } = req.body;
        const query = new RegExp(search, "i", "g");
        const user = await UserModel.find({
            $or: [{ name: query }, { email: query }],
        }).select("-password");
        return resp.status(200).json({
            message: "All users obtained are",
            data: user,
            success: true,
        });
    } catch (error) {
        return resp.status(500).json({
            message: error.message,
            error: true,
        });
    }
};

module.exports = searchUser;
