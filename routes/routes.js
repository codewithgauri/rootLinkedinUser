const express = require("express");

const { createUser } = require("../controllers/createUser/create-user.api");
const { createSubscription } = require("../controllers/createUser/create-subscription.api");
const { generateComment } = require("../controllers/getComment/get-comment-ai-api");
const { getActiveSubscription } = require("../controllers/getUserSubscription/get-user-subscription.api");



const router = express.Router();

router.post("/user", createUser);
router.post('/subscriptions', createSubscription);
router.get('/generateComment', generateComment);
router.get('/user-sub', getActiveSubscription)





module.exports = router;