const express = require("express");
const pollRouter = express.Router();

const { pollCtrl } = require("../controllers/index");

pollRouter.get("/", pollCtrl.getAll);
pollRouter.post("/", pollCtrl.addPoll);

pollRouter.get("/:pollId", pollCtrl.getPoll);
pollRouter.delete("/:pollId", pollCtrl.deletePoll);
pollRouter.put("/:pollId/:optionId", pollCtrl.upvoteOption);

pollRouter.post("/:pollId", pollCtrl.addOption);

module.exports = pollRouter;
