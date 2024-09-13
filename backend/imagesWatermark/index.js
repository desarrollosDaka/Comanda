const path = require("path");

const waterMark = () => {
    return path.join(__dirname);
};

module.exports = waterMark;