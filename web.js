const express = require("express"),
			app = express(),
			bodyParser = require("body-parser"),
			session = require("express-session"),
			passport = require("passport"),
			url = require('url'),
			methodOverride = require("method-override"),
			// cookieParser = require("cookie-parser"),
			flash = require("connect-flash"),
			busboy = require("connect-busboy"),
			// imports
			staticAssets = __dirname + "/public",
			authRoutes = require("./routes/auth"),
			indexRoutes = require("./routes/index"),
			profileRoutes = require("./routes/profile"),
			pointsRoutes = require("./routes/points"),
			processRoutes = require("./routes/process"),
			interviewRoutes = require("./routes/interview"),
			crmRoutes = require("./routes/crm"),
			ecrmRoutes = require("./routes/ecrm"),
			linkstoreRoutes = require("./routes/linkstore"),
			backofficeRoutes = require("./routes/backoffice"),
			storageRoutes = require("./routes/storage"),
			blogRoutes = require("./routes/blog"),
			db = require("./db");

require("./passport");

var sessionMiddleware = session({
		secret: "jennifer pak is the bestest",
		resave: false,
		saveUninitialized: false,
		cookie: { maxAge: 180 * 60 * 1000 }
});

app
	.set("port", (process.env.PORT || 3000))
	.set("view engine", "ejs")
	.use(express.static(staticAssets))
	.use(methodOverride("_method"))
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({ extended: true }))
	.use(busboy())
	.use(sessionMiddleware)
	.use(passport.initialize())
	.use(passport.session())
	.use(flash())
	.use(function(req, res, next) {
		res.locals.currentUser = req.user;
		res.locals.error = req.flash("error");
		res.locals.success = req.flash("success");
		next();
	})

// ROUTES
app
	.use(authRoutes)
	.use(indexRoutes)
	.use(profileRoutes)
	.use(pointsRoutes)
	.use(processRoutes)
	.use(interviewRoutes)
	.use(crmRoutes)
	.use(ecrmRoutes)
	.use(linkstoreRoutes)
	.use(backofficeRoutes)
	.use(storageRoutes)
	.use(blogRoutes)

app.listen(app.get("port"), () => {
	console.log("Server is Listening...")
});
