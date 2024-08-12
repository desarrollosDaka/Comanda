const router = require("express").Router();

const {
  subscription,
  notification,
  update
} = require("../controllers/notifications.controllers");

router.post("/subscription", subscription);
router.post("/notification", notification);
router.put("/update/notify/:ID_Notifications", update);


module.exports = router;
