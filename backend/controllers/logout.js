const logout = async (req, resp) => {
    try {
        const cookieOptions = {
            http: true,
            secure: true,
        };
        return resp.cookie("token", "", cookieOptions).status(200).json({
            message: "session out",
            success: true,
        });
    } catch (error) {
        return resp.status(500).json({
            message: error.message || error,
            error: true,
        });
    }
};

module.exports = logout;
