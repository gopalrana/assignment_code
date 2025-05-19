const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

// Connect MongoDB
mongoose.connect("mongodb://localhost:27017/ytapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"));

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/subscribes", require("./routes/subscribeRoutes"));
app.use("/api/likes", require("./routes/likeRoutes"));

// Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
