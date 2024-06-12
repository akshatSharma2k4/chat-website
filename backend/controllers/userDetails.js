const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");

const userDetails = async (req, resp) => {
    try {
        const token = req.cookies.token || "";
        const user = await getUserDetailsFromToken(token);
        return resp.status(200).json({
            messge: "User Details",
            data: user,
        });
    } catch (error) {
        return resp.status(500).json({
            message: error.message || error,
            error: true,
        });
    }
};

module.exports = userDetails;
