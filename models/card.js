const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema(
  {
    cardTitle: {
      type: String,
      required: true,
    },
    ownerList: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "List",
    },
  },
  {
    timestamps: true,
  }
);

const Card = mongoose.model("Card", CardSchema);

module.exports = Card;

// assignedTo: [{ id: mongoose.Schema.Types.ObjectId }],

// const mongoose = require("mongoose");

// const CardSchema = new mongoose.Schema(
//   {
//     cardTitle: {
//       type: String,
//       required: true,
//     },
//     owner: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: "User",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Card = mongoose.model("Card", CardSchema);

// module.exports = Card;

// // assignedTo: [{ id: mongoose.Schema.Types.ObjectId }],
