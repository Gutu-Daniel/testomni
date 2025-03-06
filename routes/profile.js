const express = require("express"),
			router = express.Router(),
			profileController = require("../controllers/profileController.js")

router
	.get("/allusers", loginRequired, superAdminRequired, suspentionCheck, profileController.allUsers)
	.get("/profile/:id", loginRequired, suspentionCheck, profileController.getProfile)
	.get("/profile/:id/content", loginRequired, suspentionCheck, profileController.getProfileContent)
	.get("/profile/:id/about", loginRequired, suspentionCheck, profileController.getProfileAbout)
	.put("/profile/:id/about", loginRequired, suspentionCheck, profileController.editProfileAbout)
	.post("/profile/:id/uploadresume", loginRequired, suspentionCheck, profileController.uploadResume)
	.delete("/profile/:id/deleteresume/:resume_id", loginRequired, suspentionCheck, profileController.deleteResume)
	.get("/profile/:id/friends", loginRequired, suspentionCheck, profileController.getFriendsList)
	.post("/profile/:id/friendrequest", loginRequired, suspentionCheck, profileController.friendRequest)
	.put("/profile/:id/acceptfriendrequest/:friendslist_id", loginRequired, suspentionCheck, profileController.acceptFriendRequest)
	.get("/profile/:id/invitefriend", loginRequired, suspentionCheck, profileController.getProfileinvite)
	.get("/profile/:id/wall", loginRequired, suspentionCheck, profileController.getWall) 
	.post("/profile/:id/wall", loginRequired, suspentionCheck, profileController.postWall)
	.put("/profile/:id/wall/:post_id", loginRequired, suspentionCheck, profileController.editWallPost)
	.delete("/profile/:id/wall/:post_id", loginRequired, suspentionCheck, profileController.deleteWallPost)
	.get("/profile/:id/media", loginRequired, suspentionCheck, profileController.getMedia)
	.post("/profile/:id/uploadphoto", loginRequired, suspentionCheck, profileController.uploadPhotos)
	.delete("/profile/:id/deletephoto/:photoid", loginRequired, suspentionCheck, profileController.deletePhoto)
	.post("/profile/:id/uploadvideo", loginRequired, suspentionCheck, profileController.uploadVideo)
	.delete("/profile/:id/deletevideo/:videoid", loginRequired, suspentionCheck, profileController.deleteVideo)
	.get("/profile/:id/settings", loginRequired, suspentionCheck, profileController.getProfileSettings)
	.put("/profile/:id/editprofile", loginRequired, suspentionCheck, profileController.editProfile)
	.get("/profile/:id/invite", loginRequired, suspentionCheck, profileController.getProfileinvite)
	.post("/profile/:id/profileimg", loginRequired, suspentionCheck, profileController.uploadProfilePic)
	.post("/profile/:id/wallimg", loginRequired, suspentionCheck, profileController.uploadWallPic)

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