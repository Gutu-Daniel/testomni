const db = require("../db"),
      nodemailer = require("nodemailer"),
      fs = require("fs"),
      busboy = require("connect-busboy");

exports.blogPage = (req, res) => {
  db("users")
    .innerJoin("profile","profile.user_id", "users.id")
    .where("user_id", req.user.id)
    .then((user) => {
      db("blogs")
        .where("user_id", req.user.id)
        .then((posts) => {
          res.render("blog/index", { currentUser: req.user, userInfo: user, posts })
        })
    })
}

exports.newBlog = (req, res) => {
  db("users")
    .innerJoin("profile", "users.id", "profile.user_id")
    .where("user_id", req.params.user_id)
    .then((user) => {
      res.render("blog/new", { currentUser: req.user, userInfo: user })
    })
}
exports.createBlog = (req, res) => {
  const formatDateTime = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const createdAt = formatDateTime(new Date());
  const updatedAt = createdAt; // Set updated_at to the same value as created_at

  db("blogs")
    .insert({
      user_id: req.user.id,
      title: req.body.title,
      body: req.body.body,
      created_at: createdAt,
      updated_at: updatedAt // Include updated_at field
    })
    .then((id) => {
      console.log("Blog created with ID:", id[0]); // Log the created blog ID
      db("users")
        .where("id", req.user.id)
        .first()
        .then((user) => {
          var points = user.points;
          db("users")
            .where("id", req.user.id)
            .first()
            .update({
              points: points + 1
            })
            .then(() => {
              res.redirect(`/blog/${req.user.id}/post/${id[0]}`);
            })
        })
    })
    .catch((error) => {
      console.error("Error creating blog:", error);
      res.status(500).send("Internal Server Error");
    });
}
exports.eachBlogPost = (req, res) => {
  console.log("req.params", req.params)

  db("users")
    .innerJoin("profile", "users.id", "profile.user_id")
    .where("user_id", req.params.user_id)
    .then((user) => {
      db("blogs")
        .where({ id: req.params.post_id })
        .first()
        .then((post) => {
          db("blog_comments")
            .innerJoin("users", "blog_comments.user_id", "users.id")
            .where("blog_id", req.params.post_id)
            .then((comments) => {
              console.log("post", post)
              res.render("blog/show", { currentUser: req.user, userInfo: user, post, comments })
            })
        })
    })
}

exports.editBlogPost = (req, res) => {
  db("users")
    .innerJoin("profile", "users.id", "profile.user_id")
    .where("user_id", req.params.user_id)
    .then((user) => {
      db("blogs")
        .where("id", req.params.post_id)
        .first()
        .then((post) => {
          console.log("post",post)
          res.render("blog/edit", { currentUser: req.user, userInfo: user, post })
        })
    })
}
exports.updateBlogPost = (req, res) => {
  const formatDateTime = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const updatedAt = formatDateTime(new Date());

  db("blogs")
    .where("id", req.params.post_id)
    .andWhere("user_id", req.params.user_id)
    .update({
      title: req.body.title,
      body: req.body.body,
      updated_at: updatedAt // Include updated_at field
    })
    .then(() => {
      res.redirect(`/blog/${req.params.user_id}/post/${req.params.post_id}`);
    })
    .catch((error) => {
      console.error("Error updating blog post:", error);
      res.status(500).send("Internal Server Error");
    });
};

exports.deleteBlogPost = (req, res) => {
  db("blogs")
    .where("id", req.params.post_id)
    .del()
    .then(() => {
      res.redirect('/blog')
    })
}

exports.commentOnBlog = (req, res) => {
  const formatDateTime = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };
  const createdAt = formatDateTime(new Date());

  db("blog_comments")
    .insert({
      blog_id: req.params.post_id,
      user_id: req.user.id,
      comment: req.body.comment,
      created_at: createdAt  
      

    })
    .then(() => {
      res.redirect("back");
    })
}

// For todays date;
Date.prototype.today = function () { 
  return ((this.getDate() < 10)?"":"") + (this.getMonth()+1) +"/"+ ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+ this.getFullYear();
}

// For the time now
Date.prototype.timeNow = function () {
  let hour = this.getHours()
  if (hour > 12) {
    hour = hour - 12;
  } 
  return ((hour < 10)?"0":"") + hour +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}
