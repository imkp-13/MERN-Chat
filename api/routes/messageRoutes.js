const express = require("express");
const {
  allMessages,
  sendMessage,
} = require("../controllers/messageController");
const { authentication } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/:chatId").get(authentication, allMessages);
router.route("/").post(authentication, sendMessage);

module.exports = router;
