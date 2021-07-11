const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema(
  {
    listTitle: {
      type: String,
      required: true,
    },
    cards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Card",
      },
    ],
    sort: {
      type: Number,
      decimal: true,
      required: true,
    },
    ownerBoard: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Board",
    },
  },
  {
    timestamps: true,
  }
);

ListSchema.methods.addCardId = async function (cardId) {
  const list = this;
  list.cards = list.cards.concat(cardId);
  await list.save();
};

const List = mongoose.model("List", ListSchema);

module.exports = List;

// const mongoose = require("mongoose");

// const ListSchema = new mongoose.Schema(
//   {
//     listTitle: {
//       type: String,
//       required: true,
//     },

//     cards: [mongoose.Schema.Types.ObjectId],
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

// ListSchema.methods.addCardId = async function (listId) {
//   const list = this;
//   list.cards = list.cards.concat(listId);
//   await list.save();
// };

// const List = mongoose.model("List", ListSchema);

// module.exports = List;
