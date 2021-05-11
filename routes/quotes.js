const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const Quote = require("../models/Quote");
// @route  GET api/quotes
// @desc  Get all users quotes
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    const quotes = await Quote.find({ user: req.user.id }).sort({ date: -1 });
    res.json(quotes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  POST api/quotes
// @desc  Add new quotes
// @access Private
router.post(
  "/",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("type", "Type is required").not().isEmpty(),
      check("quote", "Quote is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, quote, type } = req.body;
    try {
      const newQuote = new Quote({
        title,
        quote,
        type,
        user: req.user.id,
      });
      const quote_save = await newQuote.save();
      res.json(quote_save);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route  PUT api/quotes/:id
// @desc  Update quotes
// @access Private
router.put("/:id", auth, async (req, res) => {
  const { title, quote, type } = req.body;
  //build contact object
  const quoteFields = {};
  if (title) quoteFields.title = title;
  if (quote) quoteFields.quote = quote;
  if (type) quoteFields.type = type;
  try {
    let quote = await Quote.findById(req.params.id);
    if (!quote) return res.status(400).json({ msg: "Quote not found" });
    //Make sure users owns quote
    if (quote.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not Authrozied" });
    }

    const quote_update = await Quote.findByIdAndUpdate(
      req.params.id,
      { $set: quoteFields },
      { new: true }
    );
    res.json(quote_update);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route  DELETE api/quotes/:id
// @desc  DELETE quotes
// @access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let quote = await Quote.findById(req.params.id);
    if (!quote) return res.status(400).json({ msg: "Quote not found" });
    //Make sure users owns quote
    if (quote.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not Authrozied" });
    }

    await Quote.findByIdAndRemove(req.params.id);

    res.json({ msg: "Quote removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
