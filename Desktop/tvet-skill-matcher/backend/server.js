require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const connectDB = require("./config/db");
const Message = require("./models/Message");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", require("./routes/auth"));
app.use("/api/student", require("./routes/students"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/jobs", require("./routes/jobs"));
app.use("/api/apply", require("./routes/applications"));
app.use("/api/applications", require("./routes/applications"));
app.use("/api/application", require("./routes/applications"));
app.use("/api/match", require("./routes/match"));
app.use("/api/chat", require("./routes/chat"));

app.get("/health", (_req, res) => res.json({ ok: true }));

io.use((socket, next) => {
  const token = socket.handshake.auth?.token;
  if (!token) return next(new Error("unauthorized"));
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded;
    return next();
  } catch (error) {
    return next(new Error("unauthorized"));
  }
});

io.on("connection", (socket) => {
  socket.join(socket.user.userId);

  socket.on("private_message", async ({ to, content }) => {
    const saved = await Message.create({
      senderId: socket.user.userId,
      receiverId: to,
      content,
    });
    io.to(to).emit("private_message", saved);
    io.to(socket.user.userId).emit("private_message", saved);
  });
});

const PORT = process.env.PORT || 5000;
connectDB()
  .then(() => {
    server.listen(PORT, () => console.log(`Server running on ${PORT}`));
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });