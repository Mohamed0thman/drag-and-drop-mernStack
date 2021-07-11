const express = require("express");
const Notification = require("../models/notification");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/api/notification", auth, async (req, res) => {
  let notification;
  console.log(req.body);
  try {
    await req.body.usersId.forEach((user) => {
      notification = new Notification({
        ...req.body,
        owner: user.id,
      });
      notification.save();
    });
    await res.status(201).send(notification);
  } catch (e) {
    res.status(400).send("not created");
  }
});

router.get("/api/notification", auth, async (req, res) => {
  try {
    await req.user
      .populate({
        path: "notification",
      })
      .execPopulate();
    res.send(req.user.notification);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch("/api/notification/:id", auth, async (req, res) => {
  const update = Object.keys(req.body);
  const allowerdUpdate = ["senderName", "type", "message"];
  const isValidOPeration = update.every((update) =>
    allowerdUpdate.includes(update)
  );
  if (!isValidOPeration) {
    return res.status(400).send({ error: "invalid update!" });
  }
  try {
    const notification = await Notification.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!notification) {
      return res.status(404).send("no found");
    }

    update.forEach((update) => (notification[update] = req.body[update]));
    await notification.save();
    res.send(notification);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
