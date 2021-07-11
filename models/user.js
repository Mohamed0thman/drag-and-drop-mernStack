const mongoose = require("mongoose");
const validator = require("validator");
const bcrybt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(v) {
        if (!validator.isEmail(v)) {
          throw new Error("age must be a postive number");
        }
      },
    },
    password: {
      type: String,
      trim: true,
      minlength: 7,
      required: true,
      validate(v) {
        if (v === "password") {
          throw new Error("no use password");
        }
      },
    },
    bio: {
      type: String,
    },
    tokens: [
      {
        token: {
          type: String,
          require: true,
        },
      },
    ],
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
    boards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Board" }],
    avatar: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  }
);

// userSchema.virtual("teams", {
//   ref: "Team",
//   localField: "_id",
//   foreignField: "owner",
// });
// userSchema.virtual("boards", {
//   ref: "Board",
//   localField: "_id",
//   foreignField: "owner",
// });

userSchema.virtual("notification", {
  ref: "Notification",
  localField: "_id",
  foreignField: "owner",
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;
  delete userObject.teams;
  delete userObject.boards;

  return userObject;
};

userSchema.methods.addTeamId = async function (teamId) {
  const user = this;
  user.teamsIds = user.teamsIds.concat(teamId);
  await user.save();
  return user.teamsIds;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = await jwt.sign(
    { _id: user._id.toString() },
    process.env.JWT_SECRET
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("unable to login");
  }
  const isMatch = await bcrybt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("unable to login");
  }

  return user;
};

userSchema.statics.findByQuery = async (fullName) => {
  let regex;
  if (fullName === "") {
    regex = "";
  } else {
    regex = new RegExp(fullName);
  }
  const user = await User.find({ fullName: regex })
    .sort({ updatedAt: -1 })
    .sort({ createdAt: -1 })
    .limit(20);

  if (!user) {
    throw new Error("no user with that name");
  }
  const users = [];
  user.forEach((user) => {
    let obj = {
      id: user._id,
      fullName: user.fullName,
    };
    users.push(obj);
  });

  return users;
};
////// hash password before saving
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrybt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
