const express = require("express");
const Board = require("../models/board");
const User = require("../models/user");

const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/api/boards", auth, async (req, res) => {
  console.log(req.body);
  const board = new Board({
    ...req.body,
    admin: [req.user._id],
    owner: req.user._id,
  });
  await User.updateOne(
    { _id: req.user._id },
    {
      $push: { boards: board._id },
    }
  );
  try {
    await board.save();
    res.status(201).send(board);
  } catch (e) {
    res.status(400).send({
      message: "not created",
    });
  }
});

router.get("/api/boards", auth, async (req, res) => {
  try {
    await req.user
      .populate({
        path: "boards",
      })
      .execPopulate();
    res.send(req.user.boards);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
