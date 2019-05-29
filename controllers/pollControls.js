"use strict";

const Poll = require("../models/poll");

// Poll Control Functions
//Get All Polls
const getAll = async (res, req, next) => {
  try {
    const polls = await Poll.find();
    return res.status(200).json(polls);
  } catch (err) {
    return next(err);
  }
};

//Create a Poll
const addPoll = async (res, req, next) => {
  const poll = new Poll(req.body);
  try {
    const newPoll = await poll.save();
    return res.status(200).json(newPoll);
  } catch (err) {
    res.status(500);
    next(err);
  }
};

// Get a Poll
const getPoll = async (res, req, next) => {
  try {
    const poll = await Poll.findById({ _id: req.params.pollId });
    return res.status(200).json(poll);
  } catch (err) {
    res.status(404);
    return next(err);
  }
};

// Delete a Poll
const deletePoll = async (req, res, next) => {
  try {
    const deletePoll = await Poll.findOneAndDelete({ _id: req.params.pollId });
    return res.status(200).json(deletePoll);
  } catch (err) {
    res.status(404);
    return next(err);
  }
};

// Upvote a Poll
const upvoteOption = async (req, res, next) => {
  try {
    const poll = await Poll.findById({ _id: req.params.pollId });
    const updateOption = poll.answer.id({ _id: req.params.optionId });
    updateOption.votes += 1;
    return poll
      .save()
      .then(response => res.json(poll))
      .catch(err => next(err));
  } catch (err) {
    res.status(500);
    return next(err);
  }
};

// Add Poll Option
const addOption = async (req, res, next) => {
  try {
    const poll = await Poll.findById({ _id: req.params.pollId });
    poll.answer = poll.answer.concat({
      option: req.body.option,
      votes: 0
    });
    const updatePoll = poll.save();
    return res.status(200).json(updatePoll);
  } catch (err) {
    res.status(500);
    return next(err);
  }
};
