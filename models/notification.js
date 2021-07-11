const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    senderId: { type: String },
    senderName: { type: String },
    teamId: { type: String },
    boardId: { type: String },
    message: {
      type: String,
    },
    type: {
      type: String,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = Notification;
