const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const app = express();

// connect db
connectDB();
//to use api on localhost we need to use npm cors --save
app.use(cors());
app.options("*", cors());
// Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.json({ msg: "Quote API.." }));

//Routes Defined
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/quotes", require("./routes/quotes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));
