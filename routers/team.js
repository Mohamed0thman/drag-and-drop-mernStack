const express = require("express");
const Team = require("../models/team");
const auth = require("../middleware/auth");
const User = require("../models/user");
const router = new express.Router();

router.post("/api/teams", auth, async (req, res) => {
  console.log(req.body);
  const team = new Team({
    ...req.body,
    teamLeader: req.user.fullName,
    admin: [req.user._id],
    owner: req.user._id,
  });

  await User.updateOne(
    { _id: req.user._id },
    {
      $push: { teams: team._id },
    }
  );

  try {
    await team.save();
    res.status(201).send(team);
  } catch (e) {
    res.status(400).send({
      message: "not created",
    });
  }
});

router.get("/api/teams", auth, async (req, res) => {
  try {
    await req.user
      .populate({
        path: "teams",
      })
      .execPopulate();

    res.send(req.user.teams);
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/api/teams/:id/join", auth, async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).send({ message: "team not found" });
    }
    const user = await User.findById(req.user._id);

    const array = user.teamsIds;
    const existingTeam = array.find(
      (id) => id.toString() === req.user.teamsIds
    );
    const existingMember = team.members.find(
      (member) => member.id.toString() === req.body.member.id
    );

    if (existingTeam || existingMember) {
      res.status(400).send({
        message: "you are in the team",
      });
    }

    await user.addTeamId(req.params.id);
    team.members = await team.members.concat(req.body.member);

    await team.save();

    res.send(team);
  } catch (e) {
    res.status(400).send(e);
  }
});
module.exports = router;

// router.get("/api/teams", auth, async (req, res) => {
//   console.log(req.body);
//   try {
//     const team = await Team.findById({
//       _id: req.body.id,
//       owner: req.body.owner,
//     });

//     res.send(team);
//   } catch (e) {
//     res.status(500).send();
//   }
// });

// router.patch("/api/teams", auth, async (req, res) => {
//   console.log(req.body);
//   const team = await Team.findByIdAndUpdate(req.body.teamId, req.body, {
//     new: true,
//     runValidators: true,
//   });
//   console.log(team);
//   if (!team) {
//     throw new Error("not found");
//   }
//   team.members = team.members.concat(req.body.member);
//   await team.save();
//   res.send(team);
// });

// router.get("/api/teams/:id", auth, async (req, res) => {
//   const _id = req.params.id;

//   try {
//     const team = await Team.findOne({ _id, owner: req.user._id });

//     if (!team) {
//       return res.status(404).send();
//     }
//     res.send(team);
//   } catch (e) {
//     res.status(500).send();
//   }
// });
