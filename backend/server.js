const express = require("express");
// const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDb = require("./config/connectDb");
const authRouter = require("./routers/index");
const cookieParser = require("cookie-parser");
connectDb();
const PORT = process.env.PORT || 4000;

const { app, server } = require("./socket/index.js");

app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: true,
        credentials: true,
    })
);
app.use("/api", authRouter);
server.listen(PORT, () => {
    console.log("Server listening at port ", PORT);
});
