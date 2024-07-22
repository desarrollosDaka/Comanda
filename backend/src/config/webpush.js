const webpush = require("web-push");
const { PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY } = process.env;

webpush.setVapidDetails(
  "mailto:tu_correo@tudominio.com",
  PUBLIC_VAPID_KEY,
  PRIVATE_VAPID_KEY
);

module.exports = webpush;
