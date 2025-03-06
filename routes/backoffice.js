const express = require("express"),
			router = express.Router(),
			backofficeController = require("../controllers/backofficeController.js"),
			communityTaskCron = require("../controllers/communityTaskCron.js")

router
	.get("/backoffice", loginRequired, superAdminRequired, backofficeController.backofficePage)
	.put("/backoffice/deactivateuser/:user_id", loginRequired, superAdminRequired, backofficeController.deactivateUser)
	.put("/backoffice/activateuser/:user_id", loginRequired, superAdminRequired, backofficeController.activateUser)
	.delete("/backoffice/deleteuser/:user_id", loginRequired, superAdminRequired, backofficeController.deleteUser)
	.post("/backoffice/createcommunitytask", loginRequired, superAdminRequired, backofficeController.createCommunityTask)
	.put("/backoffice/editcommunitytask/:task_id", loginRequired, superAdminRequired, backofficeController.editCommunityTask)
	.delete("/backoffice/deletecommunitytask/:task_id", loginRequired, superAdminRequired, backofficeController.deleteCommunityTask)
	.get("/backoffice/introduction", loginRequired, superAdminRequired, backofficeController.introPage)
	.put("/backoffice/introduction", loginRequired, superAdminRequired, backofficeController.introContent)
	.get("/backoffice/setup", loginRequired, superAdminRequired, backofficeController.setupPage)
	.put("/backoffice/setup", loginRequired, superAdminRequired, backofficeController.setupContent)

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
