const router = require("express").Router();

const {
  subscription,
  notification,
  findall,
  ruta
} = require("../controllers/notifications.controllers");

router.post("/subscription", subscription);
router.post("/notification", notification);
router.get("/finall/:id", findall);


module.exports = router;
