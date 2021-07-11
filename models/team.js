const mongoose = require("mongoose");
const { strategy } = require("sharp");

const TeamSchema = new mongoose.Schema(
  {
    teamName: {
      type: String,
      required: true,
    },
    teamType: {
      type: String,
      required: true,
    },
    teamDescription: {
      type: String,
    },
    teamLeader: { type: String },
    admin: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    normal: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

TeamSchema.methods.addMembers = async function (member) {
  const team = this;
  team.members = team.members.concat(member);
  await team.save();
  return team;
};

const Team = mongoose.model("Team", TeamSchema);

module.exports = Team;
