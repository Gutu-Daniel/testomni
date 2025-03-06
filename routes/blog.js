const express = require("express"),
      router = express.Router(),
      blogController = require("../controllers/blogController.js")

router
  .get("/blog", loginRequired, suspentionCheck, blogController.blogPage)
  .get("/blog/:user_id/new", loginRequired, suspentionCheck, blogController.newBlog)
  .post("/blog/:user_id", loginRequired, suspentionCheck, blogController.createBlog)
  .get("/blog/:user_id/post/:post_id", loginRequired, suspentionCheck, blogController.eachBlogPost)
  .get("/blog/:user_id/post/:post_id/edit", loginRequired, suspentionCheck, blogController.editBlogPost)
  .put("/blog/:user_id/post/:post_id", loginRequired, suspentionCheck, blogController.updateBlogPost)
  .delete("/blog/:user_id/post/:post_id", loginRequired, suspentionCheck, blogController.deleteBlogPost)
  .post("/blog/:user_id/post/:post_id/comment", loginRequired, suspentionCheck, blogController.commentOnBlog)
 
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
