const router = require("express").Router();

const {
  subscription,
  notification,
  update,
  idUsers,
  findOne
} = require("../controllers/notifications.controllers");

router.post("/subscription", subscription);
router.post("/notification", notification);
router.put("/update/notify/:ID_Notifications", update);
router.get("/id-comanda/:hasd", idUsers);
router.get("/findOne/notify/:ID_detalle", findOne);

module.exports = router;
