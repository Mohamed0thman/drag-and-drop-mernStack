const mongoose = require("mongoose");

const BoardSchema = new mongoose.Schema(
  {
    boardName: {
      type: String,
      required: true,
    },
    background: {
      type: String,
    },
    boardLogo: { type: Buffer },

    admin: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    normal: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    lists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "List",
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

BoardSchema.methods.addListId = async function (listId) {
  const board = this;
  board.lists = board.lists.concat(listId);
  await board.save();
};

const Board = mongoose.model("Board", BoardSchema);

module.exports = Board;
