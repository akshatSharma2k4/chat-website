const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDb = require("./config/connectDb");
const authRouter = require("./routers/index");
const cookieParser = require("cookie-parser");
connectDb();
const PORT = process.env.PORT || 4040;

app.use(express.json());
app.use(cookieParser());


app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);
app.use("/api", authRouter);
app.listen(PORT, () => {
    console.log("Server listening at port ", PORT);
});
