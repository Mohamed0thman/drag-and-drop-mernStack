var express = require("express");
var router = express.Router();

const User = require("../models/user");
const auth = require("../middleware/auth");

const multer = require("multer");
const sharp = require("sharp");

/* GET users listing. */

router.get("/", function (req, res) {
  res.send("respond with a resource");
});
router.post("/api/users/register", async (req, res) => {
  const user = new User(req.body);
  if (req.body.password === req.body.confirmPassword) {
    try {
      await user.save();
      // sendWelcomeEmail(user.email, user.name);
      const token = await user.generateAuthToken();
      res.status(201).send({ user, token });
    } catch {
      res.status(400).send({
        message: "this email is userd",
      });
    }
  } else {
    res.status(400).send({
      message: "password not match",
    });
  }
});

router.post("/api/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send({
      message: "not user",
    });
  }
});

router.get("/api/users", auth, async (req, res) => {
  try {
    const user = await User.findByQuery(req.query.name);

    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/api/users/me", auth, async (req, res) => {
  res.send(req.user);
});

router.patch("/api/users/me", auth, async (req, res) => {
  const update = Object.keys(req.body);
  const allowerdUpdate = ["fullName", "lastName", "email", "bio"];
  const isValidOPeration = update.every((update) =>
    allowerdUpdate.includes(update)
  );
  if (!isValidOPeration) {
    return res.status(400).send({ error: "invalid date!" });
  }
  try {
    update.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();

    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

const upload = multer({
  limits: {
    fieldSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      return cb(new Error("upload png"));
    }

    cb(undefined, true);
  },
});

router.post(
  "/api/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();

    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  (err, req, res, next) => {
    res.status(400).send({ error: err.message });
  }
);

router.delete("/api/users/me/avatar", auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

router.get("/api/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error();
    }

    res.set("Content-type", "image/png");
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send();
  }
});

module.exports = router;

// router.post("/api/users/teamsIds", async (req, res) => {
//   /// add team to user
//   try {
//     const teamsIds = await User.findById(req.body.userId);

//     console.log(teamsIds);
//     const existingTeam = array.find((id) => id.toString() === req.body.teamId);
//     console.log(existingTeam);
//     if (existingTeam) {
//       res.status(400).send({
//         message: "you are in the team",
//       });
//     }
//     console.log(existingTeam);
//     const teamId = await user.addTeamId(req.body.teamId);
//     res.send(teamId);
//   } catch (e) {
//     res.status(400).send({
//       message: "not user",
//     });
//   }
// });
