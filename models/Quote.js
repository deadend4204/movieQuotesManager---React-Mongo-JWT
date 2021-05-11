const mongoose = require("mongoose");

const QuoteSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  title: {
    type: String,
    required: true,
  },
  quote: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "other",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("quote", QuoteSchema);
