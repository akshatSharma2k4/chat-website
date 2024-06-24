const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            default: "",
        },
        imageUrl: {
            type: String,
            default: "",
        },
        videoUrl: {
            type: String,
            default: "",
        },
        audioUrl: {
            type: String,
            default: "",
        },
        msgBy: {
            type: mongoose.Schema.ObjectId,
            required: true,
            ref: "UserModel",
        },
        seen: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const conversationSchema = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.ObjectId,
            required: true,
            ref: "UserModel",
        },
        reciever: {
            type: mongoose.Schema.ObjectId,
            required: true,
            ref: "UserModel",
        },

        messages: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "MessageModel",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const ConversationModel = mongoose.model(
    "ConversationModel",
    conversationSchema
);

const MessageModel = mongoose.model("MessageModel", messageSchema);
module.exports = { ConversationModel, MessageModel };
