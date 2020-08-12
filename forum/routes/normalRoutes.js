const express = require("express")
const router = express.Router()
const normalController = require("../controllers/normalControllers")
const authenticate = require("../middlewares/authenticate")




router.get("/signup",normalController.renderSignup)
router.get("/login",normalController.renderLogin)
router.get("/forums", normalController.renderAllForums)
router.get("/forums/create",authenticate,normalController.renderForumCreate)
router.get("/forums/:forumId",normalController.renderForum)
router.get("/threads/", normalController.renderAllThreads)
router.get("/threads/create/:forumId",authenticate, normalController.renderThreadCreate)
router.get("/threads/:threadId", normalController.renderThread)

module.exports = router;