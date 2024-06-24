const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const http = require("http");
const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");
const UserModel = require("../models/UserModel");
const {
    ConversationModel,
    MessageModel,
} = require("../models/ConversationModel");
const getConversation = require("../helpers/getConversation");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        credentials: "true",
    },
});

const onlineUser = new Set();

io.on("connection", async (socket) => {
    console.log("Connected", socket.id);
    const token = socket.handshake.auth.token;
    const currentUserDetails = await getUserDetailsFromToken(token);
    // creating a room
    const idInString = currentUserDetails._id.toString();
    socket.join(currentUserDetails?._id.toString());
    onlineUser.add(idInString);
    io.emit("onlineUser", Array.from(onlineUser));

    //getting user deatils on message page
    socket.on("message-page", async (userId) => {
        const userDetails = await UserModel.findById(userId).select(
            "-password"
        );
        const isOnline = onlineUser.has(userId.toString());
        const payload = {
            userId: userDetails._id,
            name: userDetails.name,
            email: userDetails.email,
            profilePic: userDetails.profilePicture,
            online: isOnline,
        };
        socket.emit("message-user", payload);

        //sending messages to the user
        const getConversationMessage = await ConversationModel.findOne({
            $or: [
                {
                    sender: currentUserDetails._id,
                    reciever: userDetails._id,
                },
                {
                    sender: userDetails._id,
                    reciever: currentUserDetails._id,
                },
            ],
        })
            .populate("messages")
            .sort({ createdAt: -1 });
        socket.emit(
            "previous-messages",
            getConversationMessage?.messages || []
        );
    });

    //new messages
    socket.on("new-message", async (data) => {
        // checking if any previous conversation available
        let converstaion = await ConversationModel.findOne({
            $or: [
                {
                    sender: data.sender,
                    reciever: data.reciever,
                },
                {
                    sender: data.reciever,
                    reciever: data.sender,
                },
            ],
        });
        if (!converstaion) {
            const createConversation = await ConversationModel({
                sender: data.sender,
                reciever: data.reciever,
            });
            converstaion = await createConversation.save();
        }
        const message = await MessageModel({
            text: data.text,
            imageUrl: data.imageUrl,
            videoUrl: data.videoUrl,
            audioUrl: data.audioUrl,
            msgBy: data.sender,
            seen: false,
        });
        const saveMessage = await message.save();
        const updateConversation = await ConversationModel.updateOne(
            {
                _id: converstaion?._id,
            },
            {
                $push: {
                    messages: saveMessage?._id,
                },
            }
        );

        const getConversationMessage = await ConversationModel.findOne({
            $or: [
                {
                    sender: data.sender,
                    reciever: data.reciever,
                },
                {
                    sender: data.reciever,
                    reciever: data.sender,
                },
            ],
        })
            .populate("messages")
            .sort({ createdAt: -1 });
        io.to(data.sender).emit(
            "get-conversation-messages",
            getConversationMessage.messages
        );
        io.to(data.reciever).emit(
            "get-conversation-messages",
            getConversationMessage.messages
        );
        //yeh wala part dekhna hain kya kiya hain maine
        //isme maine har message ke baad last message update ho aur new chat karne pe chat contact box main sjow ho isliye kiya hain waise toh
        const payloadSender = await getConversation(data.sender);
        const payloadReciever = await getConversation(data.reciever);
        io.to(data.sender).emit("contacts", payloadSender);
        io.to(data.reciever).emit("contacts", payloadReciever);
    });

    //getting all contacts
    socket.on("get-contacts", async (data) => {
        const payload = await getConversation(data);
        socket.emit("contacts", payload);
    });
    // disconnect
    socket.on("disconnect", () => {
        onlineUser.delete(currentUserDetails?._id.toString());
        console.log("Disconnected", socket.id);
    });
});

module.exports = { app, server };
