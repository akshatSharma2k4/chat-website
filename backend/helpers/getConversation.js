const { ConversationModel } = require("../models/ConversationModel");
const getConversation = async (data) => {
    if (data) {
        const currentUserConversations = await ConversationModel.find({
            $or: [{ sender: data }, { reciever: data }],
        })
            .sort({ updatedAt: -1 })
            .populate("messages")
            .populate("sender")
            .populate("reciever");
        const payload = currentUserConversations.map((convo) => {
            const countUnseenMsgs = convo.messages.reduce(
                (preve, curr) => preve + (curr.seen ? 1 : 0),
                0
            );
            return {
                _id: convo._id,
                sender: convo.sender,
                reciever: convo.reciever,
                unseenMsg: countUnseenMsgs,
                lastMsg: convo.messages[convo?.messages.length - 1],
            };
        });
        return payload;
    } else {
        return [];
    }
};
module.exports = getConversation;
