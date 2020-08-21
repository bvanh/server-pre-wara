var cron = require("node-cron");
let api = require("./model/controls");

function addFakeMail() {
  cron.schedule("* * * * * *", async () => {
    try {
      api.add();
    } catch (err) {
      console.log(err);
    }
  });
}

module.exports = {
  addFakeMail: addFakeMail,
};
