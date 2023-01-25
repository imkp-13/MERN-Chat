const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/userController");
const { authentication } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/").post(registerUser).get(authentication, allUsers);
router.route("/login").post(authUser);

module.exports = router;
