const router = require("express").Router();

const { subscription, notification } = require("../controllers/notifications.controllers");

router.post("/subscription", subscription);
router.post("/notification", notification);

module.exports = router;