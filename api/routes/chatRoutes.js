const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
} = require("../controllers/chatController");
const { authentication } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/").post(authentication, accessChat);
router.route("/").get(authentication, fetchChats);
router.route("/group").post(authentication, createGroupChat);
router.route("/rename").put(authentication, renameGroup);
router.route("/groupremove").put(authentication, removeFromGroup);
router.route("/groupadd").put(authentication, addToGroup);

module.exports = router;
