const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pollSchema = new Schema({
  question: { type: String, required: true },
  answer: [
    {
      option: { type: String, required: true },
      votes: { type: Number }
    }
  ],
  user: Schema.Types.ObjectId
});

module.exports = mongoose.model("Poll", pollSchema);
