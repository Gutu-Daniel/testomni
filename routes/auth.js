const express = require("express"),
	passport = require("passport"),
	router = express.Router(),
	db = require("../db"),
	nodemailer = require("nodemailer"),
	bcrypt = require("bcrypt-nodejs")

router
	.get("/info", superAdminRequired, (req, res, next) => {
		res.send({
			session: req.session,
			user: req.user,
			authenticated: req.isAuthenticated()
		})
	})
	// login
	.get("/login", (req, res, next) => {
		res.render("auth/login")
	})
	.post("/login", function (req, res, next) {
		passport.authenticate("local", function (err, user, info) {
			if (err) {
				return next(err);
			} else if (!user) {
				req.flash("error", "Username or password is incorrect. Please try again.");
				return res.redirect("/");
			}
			req.logIn(user, function (err) {
				if (err) {
					return next(err);
				}
				//var redirectTo = req.session.redirectTo ? req.session.redirectTo: "/";
				//delete req.session.redirectTo;
				//if (redirectTo) {
				req.flash("success", "Welcome back, " + user.first_name);
				res.redirect("/");
				//}
			})
		})(req, res, next);
	})
	.get("/resetpassword", (req, res, next) => {
		res.render("auth/resetpassword")
	})
	.post("/resetpassword", (req, res, next) => {
		db("users")
			.where("email", req.body.email)
			.first()
			.then((user) => {
				if (user) {
					let transporter = nodemailer.createTransport({
						host: process.env.EMAIL_HOST,
						port: process.env.EMAIL_PORT,
						secure: true, // use SSL
						auth: {
							user: process.env.EMAIL_USER,
							pass: process.env.EMAIL_PASS
						}
					})
					let message = `
							<h3>Reset Omnilives Password</h3>
							<a href="http://omnilives.com/resetpassword/${user.id}">Click here to reset password</a>`
					let mailOptions = {
						// from: '"no-reply" <peterhantemp@gmail.com>',
						from: '"no-reply" <mahran996@gmail.com>',
						to: `<${user.email}>`,
						subject: `Omnilives Password Reset`,
						html: message
					}
					transporter.sendMail(mailOptions, (error, info) => {
						if (error) {
							console.log(error);
							// flash message: Your email was not sent.
							console.log("Your email was not sent.")
							res.redirect("back")
						}
						console.log("message %s sent: %s", info.messageId, info.response);
						req.flash("success", "Password reset email sent.")
						res.redirect("back")
					})
				} else {
					req.flash("error", "No account with this email.")
					res.redirect("back")
				}
			})
	})
	.get("/resetpassword/:user_id", (req, res, next) => {
		res.render("auth/resetpasswordPage", { user_id: req.params.user_id })
	})
	.put("/resetpassword/:user_id", (req, res, next) => {
		if (req.body.password === req.body.password2) {
			db("users")
				.where("id", req.params.user_id)
				.update({
					password: bcrypt.hashSync(req.body.password)
				})
				.then(() => {
					req.flash("success", "Password successfully changed")
					res.redirect("back")
				})
		}
	})
	.get("/logout", (req, res, next) => {
		req.session.destroy((err) => {
			res.redirect("/login")
		})
	})
	// sign up
	.get("/signup-opportunity", (req, res, next) => {
		res.render("auth/signup-opportunity")
	})
	.post("/signup-opportunity", (req, res) => {
		db("users")
			.where("username", req.body.referrer)
			.then((user) => {
				console.log(user)
				if (user.length > 0) {
					res.redirect("/signup/" + req.body.referrer);
				} else {
					req.flash("error", "That user does not exist");
					res.redirect("back");
				}
			})
	})
	.get("/signup/:referrer", (req, res, next) => {
		var signupUrl = "/signup/" + req.params.referrer;
		res.render("auth/signup", { signupUrl: signupUrl });
	})
	.post("/signup/:referrer", passport.authenticate("local-register", {
		successFlash: true,
		successRedirect: "/intro",
		failureRedirect: "back",
		failureFlash: true
	}))
	// admin sign up
	.get("/signupadmin/:referrer", (req, res, next) => {
		var signupUrl = "/signupadmin/" + req.params.group + "/" + req.user.username
		res.render("auth/signupadmin", { signupUrl: signupUrl })
	})
	.post("/signupadmin/:referrer", passport.authenticate("local-register", {
		successRedirect: "/info",
		failureRedirect: "/signupadmin",
	}))
	// team sign up
	.get("/signupteamadmin/:group/:referrer", (req, res, next) => {
		var signupUrl = "/signupteamadmin/" + req.params.group + "/" + req.user.username
		res.render("auth/signupteamadmin", { signupUrl: signupUrl })
	})
	.post("/signupteamadmin/:group/:referrer", passport.authenticate("local-register", {
		successRedirect: "/info",
		failureRedirect: "/signupteamadmin",
	}))

	// users routes
	.get("/users", superAdminRequired, (req, res, next) => {
		db("users").then((users) => {
			res.send(users);
		}, next)
	})
	.post("/users", superAdminRequired, (req, res, next) => {

		db("users")
			.insert(req.body)
			.then((userIds) => {
				res.send(userIds);
			}, next)
	})
	.get("/user/:id", superAdminRequired, (req, res, next) => {
		const { id } = req.params;

		db("users")
			.where("id", id)
			.first()
			.then((users) => {
				if (!users) {
					return res.send(400);
				}
				res.send(users)
			}, next)
	})
	.put("/user/:id", superAdminRequired, (req, res, next) => {
		const { id } = req.params;

		db("users")
			.where("id", id)
			.update(req.body)
			.then((result) => {
				if (result === 0) {
					return res.send(400);
				}
				res.send(200);
			}, next)
	})
	.delete("/user/:id", superAdminRequired, (req, res, next) => {
		const { id } = req.params;

		db("users")
			.where("id", id)
			.delete()
			.then((result) => {
				if (result === 0) {
					return res.send(400);
				}
				res.send(200);
			}, next)
	})
function loginRequired(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.redirect("/login")
	}

	next()
}

function adminRequired(req, res, next) {
	if (!req.user.is_admin) {
		return res.render("403")
	}

	next()
}

function teamAdminRequired(req, res, next) {
	if (!req.user.is_teamAdmin) {
		return res.render("403")
	}

	next()
}
function superTeamAdminRequired(req, res, next) {
	if (!req.user.is_superteamAdmin) {
		return res.render("403")
	}

	next()
}
function superAdminRequired(req, res, next) {
	if (!req.user.is_superAdmin) {
		return res.render("403")
	}

	next()
}

module.exports = router;
