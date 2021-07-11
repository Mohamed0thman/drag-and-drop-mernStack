const express = require("express");
const Board = require("../models/board");
const Team = require("../models/team");
const User = require("../models/user");

const auth = require("../middleware/auth");
const router = new express.Router();

router.patch("/api/join", auth, async (req, res) => {
  console.log(req.body);
  if (req.body.boardId) {
    const board = await Board.findByIdAndUpdate(
      { _id: req.body.boardId },
      {
        $addToSet: { normal: req.body.usersId },
      }
    );
    const boardExists = await req.user.boards.find((board) => {
      console.log(board);
      return board === board._id;
    });

    if (boardExists) return;

    console.log(board);
    await User.updateOne(
      { _id: req.user._id },
      {
        $addToSet: { boards: req.body.boardId },
      }
    );
    res.status(200).send({ board: board });

    return;
  }
  if (req.body.teamId) {
    const team = await Team.findByIdAndUpdate(
      { _id: req.body.teamId },
      {
        $addToSet: { normal: req.body.usersId },
      }
    );
    const teamExists = await req.user.teams.find((team) => {
      console.log(team);
      return team === team._id;
    });

    if (teamExists) return;

    console.log(team);
    await User.updateOne(
      { _id: req.user._id },
      {
        $addToSet: { teams: req.body.teamId },
      }
    );

    res.status(200).send({ team: team });

    return;
  }

  try {
    res.status(200).send();
  } catch (e) {
    res.status(400).send({
      message: "not created",
    });
  }
});

module.exports = router;
