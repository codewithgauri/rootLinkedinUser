const express = require("express");

const { createUser } = require("../controllers/createUser/create-user.api");
const { createSubscription } = require("../controllers/createUser/create-subscription.api");
const { generateComment } = require("../controllers/getComment/get-comment-ai-api");


const router = express.Router();

router.post("/createuser", createUser);
router.post('/subscriptions', createSubscription);
router.get('/generateComment', generateComment);





module.exports = router;