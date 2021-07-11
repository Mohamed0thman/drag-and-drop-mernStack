const express = require("express");

const List = require("../models/list");
const Board = require("../models/board");
const Card = require("../models/card");

const auth = require("../middleware/auth");

const router = new express.Router();

router.post("/api/:boardId/lists", auth, async (req, res) => {
  console.log(req.body);
  const list = new List({
    ...req.body,
    ownerBoard: req.params.boardId,
  });
  await Board.updateOne(
    { _id: req.params.boardId },
    { $push: { lists: list._id } }
  );

  try {
    await list.save();
    res.status(201).send(list);
  } catch (e) {
    res.status(400).send({
      message: "not created",
    });
  }
});

router.get("/api/:boardId/lists", auth, async (req, res) => {
  const board = await Board.findById(req.params.boardId);
  await board
    .populate({
      path: "lists",

      populate: { path: "cards" },
    })
    .execPopulate();
  try {
    res.status(200).send(board.lists);
  } catch (e) {
    res.status(400).send({
      message: "not created",
    });
  }
});

router.patch("/api/:boardId/lists", auth, async (req, res) => {
  console.log(req.body);
  const {
    droppableIdStart,
    droppableIdEnd,
    droppableIdIndexStart,
    droppableIdIndexEnd,
    draggableId,
    type,
  } = req.body;
  const board = await Board.findById(req.params.boardId);

  try {
    if (type === "list") {
      const list = board.lists.splice(droppableIdIndexStart, 1);
      board.lists.splice(droppableIdIndexEnd, 0, ...list);
      await board.save();
    }
    if (droppableIdStart === droppableIdEnd) {
      const listId = droppableIdStart.replace("list-", "");
      const list = await List.findById(listId);
      const card = list.cards.splice(droppableIdIndexStart, 1);
      list.cards.splice(droppableIdIndexEnd, 0, ...card);
      await list.save();
    }
    if (droppableIdStart !== droppableIdEnd) {
      const listStartId = droppableIdStart.replace("list-", "");
      const listStart = await List.findById(listStartId);
      const card = listStart.cards.splice(droppableIdIndexStart, 1);
      const listIdEnd = droppableIdEnd.replace("list-", "");
      const listEnd = await List.findById(listIdEnd);
      listEnd.cards.splice(droppableIdIndexEnd, 0, ...card);
      const cardId = draggableId.replace("card-", "");
      const updateCard = await Card.findByIdAndUpdate(
        cardId,
        { ownerList: listEnd },
        { new: true, runValidators: true }
      );
      await updateCard.save();
      await listStart.save();
      await listEnd.save();
    }
    res.status(200).send();
  } catch (e) {
    res.status(500).send({
      message: "not created",
    });
  }
});

router.delete("/api/:listId/lists", auth, async (req, res) => {
  const list = await List.findByIdAndDelete(req.params.listId);
  if (!list) {
    return res.status(404).send();
  }
  await Board.updateOne({ _id: list.ownerBoard }, { $pull: { lists: list._id } });
  await Card.deleteMany({
    _id: {
      $in: list.cards,
    },
  });

  try {
    res.status(200).send(list._id);
  } catch (e) {
    res.status(500).send({
      message: "not created",
    });
  }
});

// router.get("/api/:id/lists", auth, async (req, res) => {
//   const board = await Board.findById(req.params.id);
//   const lists = await List.find({
//     _id: {
//       $in: board.lists,
//     },
//   });

//   try {
//     res.status(200).send(lists);
//   } catch (e) {
//     res.status(400).send({
//       message: "not created",
//     });
//   }
// });

module.exports = router;
