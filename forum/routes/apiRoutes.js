const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiControllers");
const authenticate = require("../middlewares/authenticate");

router.post("/signup",apiController.postSignup);
router.post("/login",apiController.postLogin);
router.delete("/logout",apiController.logout);
router.post("/forums/create", authenticate,apiController.postForum);
router.post("/threads/create/:forumId/:forumName", authenticate, apiController.postThread);
router.post("/replies/create/:threadId",authenticate, apiController.postReply);
router.delete("/replies/delete/:replyId/:threadId",authenticate, apiController.deleteReply);

module.exports=router;