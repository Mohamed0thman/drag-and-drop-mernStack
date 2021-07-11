const express = require("express");

var cors = require("cors");

require("./db/mongoose");

const userRouter = require("./routers/users");
const TeamRouter = require("./routers/team");
const NotificationRouter = require("./routers/notification");
const BoardRouter = require("./routers/board");
const ListRouter = require("./routers/list");
const CardRouter = require("./routers/card");
const JoinRouter = require("./routers/join");

const app = express();
app.use(cors());

app.use(express.json());
app.use(userRouter);
app.use(TeamRouter);
app.use(NotificationRouter);
app.use(BoardRouter);
app.use(ListRouter);
app.use(CardRouter);
app.use(JoinRouter);

module.exports = app;
