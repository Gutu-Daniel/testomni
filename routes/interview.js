const express = require("express"),
			router = express.Router(),
			interviewController = require("../controllers/interviewController.js")

router
	.get("/interview", loginRequired, suspentionCheck, interviewController.interview)
	.post("/interview", loginRequired, suspentionCheck, interviewController.startinterview)
	.get("/interview/accesscode/:page_name", loginRequired, suspentionCheck, interviewController.accesscode)
	.post("/interview/accesscode/:page_name", loginRequired, suspentionCheck, interviewController.accesscodeToPage)
	.get("/interview/page/:page_name", loginRequired, suspentionCheck, interviewController.page)
	.post("/interview/page/:page_name", loginRequired, suspentionCheck, interviewController.emailAnswers)
	.get("/interview/pages", loginRequired, suspentionCheck, interviewController.pages) 
	.get("/interview/backoffice", loginRequired, superAdminRequired, suspentionCheck, interviewController.backoffice)
	.get("/interview/backoffice/createpage", loginRequired, superAdminRequired, suspentionCheck, interviewController.createPageForm)
	.post("/interview/backoffice/createpage", loginRequired, superAdminRequired, suspentionCheck, interviewController.createPage)
	.get("/interview/backoffice/:page_name", loginRequired, superAdminRequired, suspentionCheck, interviewController.editPage)
	.put("/interview/backoffice/:page_name", loginRequired, superAdminRequired, suspentionCheck, interviewController.updatePage)
	.put("/interview/backoffice/:page_name/image", loginRequired, superAdminRequired, suspentionCheck, interviewController.updateImage)
	.put("/interview/backoffice/:page_name/video", loginRequired, superAdminRequired, suspentionCheck, interviewController.updateVideo)
	.put("/interview/backoffice/:page_name/audio", loginRequired, superAdminRequired, suspentionCheck, interviewController.updateAudio)

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