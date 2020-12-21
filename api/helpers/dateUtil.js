const dateFormat = require("dateformat");

const currentDate = () => dateFormat(new Date(), "yyyy-mm-ddTHH:MM:ss.sZ");

module.exports = {
  currentDate,
};
