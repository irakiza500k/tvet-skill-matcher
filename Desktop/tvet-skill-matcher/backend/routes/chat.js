const express = require("express");
const Message = require("../models/Message");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.get("/:otherUserId", auth, async (req, res) => {
  const myId = req.user.userId;
  const otherId = req.params.otherUserId;
  const messages = await Message.find({
    $or: [
      { senderId: myId, receiverId: otherId },
      { senderId: otherId, receiverId: myId },
    ],
  }).sort({ createdAt: 1 });
  return res.json(messages);
});

module.exports = router;
