const express = require("express"),
			router = express.Router(),
			processController = require("../controllers/processController.js")
 
router
	.get("/opportunity", loginRequired, suspentionCheck, processController.process)
	.post("/opportunity", loginRequired, suspentionCheck, processController.startProcess)
	.get("/opportunity/multiplechoice/:page_name", loginRequired, suspentionCheck, processController.multiplechoice)
	.post("/opportunity/multiplechoice/:page_name", loginRequired, suspentionCheck, processController.multiplechoiceToPage)
	.get("/opportunity/page/:page_name", loginRequired, suspentionCheck, processController.page)
	.post("/opportunity/page/:page_name", loginRequired, suspentionCheck, processController.emailAnswers)
	.get("/opportunity/pages", loginRequired, suspentionCheck, processController.pages)
	.get("/opportunity/backoffice", loginRequired, superAdminRequired, suspentionCheck, processController.backoffice)
	.get("/opportunity/backoffice/createpage", loginRequired, superAdminRequired, suspentionCheck, processController.createPageForm)
	.post("/opportunity/backoffice/createpage", loginRequired, superAdminRequired, suspentionCheck, processController.createPage)
	.get("/opportunity/backoffice/:page_name", loginRequired, superAdminRequired, suspentionCheck, processController.editPage)
	.put("/opportunity/backoffice/:page_name", loginRequired, superAdminRequired, suspentionCheck, processController.updatePage)
	.put("/opportunity/backoffice/:page_name/image", loginRequired, superAdminRequired, suspentionCheck, processController.updateImage)
	.put("/opportunity/backoffice/:page_name/video", loginRequired, superAdminRequired, suspentionCheck, processController.updateVideo)
	.put("/opportunity/backoffice/:page_name/audio", loginRequired, superAdminRequired, suspentionCheck, processController.updateAudio)

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