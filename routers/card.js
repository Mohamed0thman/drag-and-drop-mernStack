const express = require("express");
const List = require("../models/list");
const Card = require("../models/card");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/api/:listId/cards", auth, async (req, res) => {
  console.log(req.body);
  console.log(req.params.listId);
  const card = new Card({
    ...req.body,
    ownerList: req.params.listId,
  });

  await List.updateOne(
    { _id: req.params.listId },
    { $push: { cards: card._id } }
  );

  try {
    await card.save();
    res.status(201).send(card);
  } catch (e) {
    res.status(400).send({
      message: "not created",
    });
  }
});

router.get("/api/:listId/cards", auth, async (req, res) => {
  console.log(req.params.listId);
  const list = await List.findById(req.params.listId);
  await list
    .populate({
      path: "cards",
    })
    .execPopulate();

  try {
    res.status(201).send(list.cards);
  } catch (e) {
    res.status(400).send({
      message: "not created",
    });
  }
});

router.delete("/api/:cardId/cards", auth, async (req, res) => {
  console.log(req.params.cardId);
  const card = await Card.findByIdAndDelete(req.params.cardId);

  if (!card) {
    return res.status(404).send();
  }
  await List.updateOne({ _id: card.ownerList }, { $pull: { cards: card._id } });

  try {
    res.status(200).send(card);
  } catch (e) {
    res.status(500).send({
      message: "not created",
    });
  }
});

module.exports = router;
