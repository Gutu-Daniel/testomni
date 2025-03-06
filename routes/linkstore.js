const express = require("express"),
			router = express.Router(),
			linkstoreController = require("../controllers/linkstoreController.js")

router 
	.get("/linkstore", loginRequired, suspentionCheck, linkstoreController.linkstore)
	.post("/linkstore", loginRequired, suspentionCheck, linkstoreController.startLinkstore)
	.get("/linkstore/home", loginRequired, suspentionCheck, linkstoreController.home)
	.post("/linkstore/createfolder", loginRequired, suspentionCheck, linkstoreController.createFolder)
	.get("/linkstore/:folder_id", loginRequired, suspentionCheck, linkstoreController.eachFolder)
	.delete("/linkstore/:folder_id", loginRequired, suspentionCheck, linkstoreController.deleteFolder)
	.post("/linkstore/:folder_id/adduser", loginRequired, suspentionCheck, linkstoreController.addUserToFolder)
	.delete("/linkstore/:folder_id/removeUser", loginRequired, suspentionCheck, linkstoreController.removeUserFromFolder)
	.post("/linkstore/:folder_id/createlink", loginRequired, suspentionCheck, linkstoreController.createLinkInFolder)
	.delete("/linkstore/:folder_id/deleteLink/:link_id", loginRequired, suspentionCheck, linkstoreController.deleteLinkInFolder)

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