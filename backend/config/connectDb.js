const mongoose = require("mongoose");
const connectDb = async () => {
    try {
        const connect = await mongoose.connect(
            "mongodb://127.0.0.1:27017/projectone"
        );
        console.log("Successfully connected to the server");
    } catch (error) {
        console.log("Error connecting to the server");
    }
};
module.exports = connectDb;
