const schedule = require('node-schedule'),
  db = require("../db"),
  moment = require('moment');

// Schedule a job to run every day at midnight
schedule.scheduleJob('0 0 * * *', async function () {
  console.log('cron working!!!');

  // Existing task creation logic
  db("crm_community_tasks")
    .then((tasks) => {
      tasks.forEach(function (task) {
        db("users")
          .then((users) => {
            users.forEach(function (user) {
              db("crm_community_users_tasks")
                .insert({
                  user_id: user.id,
                  task_id: task.id,
                  task_date: moment().format('YYYY-MM-DD')
                })
                .then(() => {
                  // next()
                })
            })
          })
      })
      console.log("new tasks created")
    });

  // Subscription check logic
  try {
    const today = new Date();
    await db("users")
      .where("subscription_end_date", "<", today)
      .update({
        is_suspended: 1
      });
    console.log("Expired subscriptions have been suspended.");
  } catch (error) {
    console.error("Error suspending expired subscriptions:", error.message);
  }
});

Date.prototype.today = function () {
  return ((this.getDate() < 10) ? "" : "") + (this.getMonth() + 1) + "/" + ((this.getDate() < 10) ? "0" : "") + this.getDate() + "/" + this.getFullYear();
}