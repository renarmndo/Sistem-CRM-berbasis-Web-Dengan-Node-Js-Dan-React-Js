const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { db } = require("./config/database");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
const authRoutes = require("./routes/authRoutes");
const agentRouter = require("./routes/agentRoutes");
const screenerRoutes = require("./routes/screenerRoutes");
// const activatedRoutes = require("./routes/activatorRoutes");
const leaderRoutes = require("./routes/leaderRoutes");
const userRoutes = require("./routes/userRoutes");

// middleware
app.use("/api/auth", authRoutes);
app.use("/api/agent", agentRouter);
app.use("/api/screener", screenerRoutes);
// app.use("/api/activator", activatedRoutes);
app.use("/api/leader", leaderRoutes);
app.use("/api", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
