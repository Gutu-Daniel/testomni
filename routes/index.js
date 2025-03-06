const express = require("express"),
			router = express.Router(),
			backofficeController = require("../controllers/backofficeController.js"),
			indexController = require("../controllers/indexController.js")

router
	.get("/", loginRequired, suspentionCheck, indexController.indexPage)
	.post("/search",loginRequired, suspentionCheck, indexController.searchApps)
	.get('/suggestions', indexController.getSuggestions)

	.get("/backoffice", loginRequired, superAdminRequired, backofficeController.backofficePage)
	.get("/intro", loginRequired, suspentionCheck, indexController.introPage)
	.get("/setup", loginRequired, suspentionCheck, indexController.setupPage)
	.get("/setup2", loginRequired, suspentionCheck, indexController.setupPage2)
	.get("/setup3", loginRequired, suspentionCheck, indexController.setupPage3)
	.post("/addapp", loginRequired, superAdminRequired, suspentionCheck, indexController.addApp)
	.delete("/deleteapp", loginRequired, suspentionCheck, indexController.deleteApp)
	.post("/revealapp", loginRequired, suspentionCheck, indexController.revealApp)
	.post("/feedback/:app_id/user/:user_id", loginRequired, suspentionCheck, indexController.userFeedback)
	.get("/mainsettings/:user_id", loginRequired, suspentionCheck, indexController.uniSettings)
	.post("/refer/:user_id", loginRequired, suspentionCheck, indexController.referRegistration)
	.get("/inbox", loginRequired, suspentionCheck, indexController.inboxPage)
	.post("/inbox", loginRequired, suspentionCheck, indexController.sendMessage)
	.delete("/inbox/:message_id", loginRequired, suspentionCheck, indexController.deleteMessage)
	.get("/payment", loginRequired, indexController.payment)
	.get("/browser", loginRequired, suspentionCheck, indexController.browser)
	.get("/check_payment", loginRequired, indexController.check_payment)
	.post('/redirect-to-stripe', indexController.redirectToStripe)

	.get("/manage-subscription", loginRequired, suspentionCheck, indexController.manage_subscription)
	.get("/edit-subscription/:id", loginRequired, suspentionCheck, indexController.edit_subscription)
	.get("/add-subscription", loginRequired, suspentionCheck, indexController.add_subscription)
	.get("/edit-content", loginRequired, suspentionCheck, indexController.edit_content)
	.post("/save-content", loginRequired, suspentionCheck, indexController.save_content)
	.post("/update-plan", loginRequired, suspentionCheck, indexController.update_subscription)

	.get("/terms-and-conditions", loginRequired, suspentionCheck, indexController.terms)
	.get("/privacy-and-policy", loginRequired, suspentionCheck, indexController.privacy)

function loginRequired(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.redirect("/login")
	}
	next()
}

function superAdminRequired(req, res, next) {
	if (!req.user.is_superAdmin) {
		return res.render("403")
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