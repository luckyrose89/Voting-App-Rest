const express = require("express");
const pollRouter = express.Router();

const { pollCtrl } = require("../controllers/index");

pollRouter.get("/poll", pollCtrl.getAll);
pollRouter.post("/poll", pollCtrl.addPoll);

pollRouter.get("/poll/:pollId", pollCtrl.getPoll);
pollRouter.delete("/poll/:pollId", pollCtrl.deletePoll);
pollRouter.put("/poll/:pollId/:optionId", pollCtrl.upvoteOption);

pollRouter.post("poll/:pollId", pollCtrl.addOption);

module.exports = pollRouter;
