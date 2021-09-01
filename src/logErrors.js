const { get } = require("lodash");
const moment = require("moment");

module.exports.logErrorsExpress = function (err, req, res, next) {
  fs.writeFileSync(
    `${__dirname}../logs/${moment().format("YYYY-MM-DD_HH_mm_ss")}.txt`,
    get(err, "stack", "").toString()
  );
  next(err);
};
