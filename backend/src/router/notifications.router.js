const router = require("express").Router();

const { subscription, notification, getMasterNotifications } = require("../controllers/notifications.controllers");

router.post("/subscription", subscription);
router.post("/notification", notification);
router.post("/getNotification", getMasterNotifications);

module.exports = router;