const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
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
    seen: {
        type: Boolean,
        default: false,
    },
});

const conversationSchema = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.ObjectId,
            required: true,
            ref: "User",
        },
        reciever: {
            type: mongoose.Schema.ObjectId,
            required: true,
            ref: "User",
        },

        messages: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "Message",
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