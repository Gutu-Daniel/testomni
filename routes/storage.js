const express = require("express"),
			router = express.Router(),
			storageController = require("../controllers/storageController.js")
  
router
	.get("/storage", loginRequired, suspentionCheck, storageController.storage)
	.post("/storage", loginRequired, suspentionCheck, storageController.startStorage)
	.get("/storage/:user_id", loginRequired, suspentionCheck, storageController.storageHome)
	.post("/storage/:user_id/invite/:storage_id", loginRequired, suspentionCheck, storageController.inviteUser)
	.delete("/storage/:user_id/removeUser/:storage_id", loginRequired, suspentionCheck, storageController.removeUserFromStorage)
	.post("/storage/:user_id/upload/:storage_id", loginRequired, suspentionCheck, storageController.upload)
	.post("/storage/:storage_id/createfolder/:owner_id", loginRequired, suspentionCheck, storageController.createFolder)
	.get("/storage/:storage_id/folder/:folder_id", loginRequired, suspentionCheck, storageController.eachFolder)
	.post("/storage/:storage_id/folder/:folder_id/invite", loginRequired, suspentionCheck, storageController.inviteUserToFolder)
	.delete("/storage/:storage_id/folder/:folder_id/removeUser", loginRequired, suspentionCheck, storageController.removeUserFromFolder)
	.post("/storage/:storage_id/folder/:folder_id/upload", loginRequired, suspentionCheck, storageController.uploadInFolder)
	.post('/delete-file',loginRequired, suspentionCheck, storageController.deleteFile)
    .post('/storage/:storage_id/folder/:folder_id/delete-file', loginRequired, suspentionCheck, storageController.deleteFileInFolder)

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