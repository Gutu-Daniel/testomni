const express = require("express"),
			router = express.Router(),
			pointsController = require("../controllers/pointsController.js")

router
	.get("/transfer", loginRequired, suspentionCheck, pointsController.getPoints)
	.post("/transfer", loginRequired, suspentionCheck, pointsController.transferPoints)
	.get("/public-ledger/:user_id", loginRequired, suspentionCheck, pointsController.getPublicLedger)
	.get("/personal-ledger/:user_id", loginRequired, suspentionCheck, pointsController.getPersonalLedger)

function loginRequired(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.redirect("/login")
	}
	next()
}

function suspentionCheck(req, res, next) {
  if (req.user.is_suspended) {
    let reason = "Your account has been suspended.";
    console.log("subscription_end_date",req.user.subscription_end_date )
    const today = new Date();
    if (req.user.subscription_end_date && new Date(req.user.subscription_end_date) < today) {
      reason = "Your subscription has expired. Please renew your subscription.";
    }
    return res.render("user_suspention", { reason });
  }
  next();
}

module.exports = router;
