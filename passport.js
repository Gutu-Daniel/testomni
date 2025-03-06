const knex = require("knex"),
			passport = require("passport"),
			bcrypt = require("bcrypt-nodejs"),
			shortId = require("shortid"),
			LocalStrategy = require("passport-local").Strategy,
			db = require("./db")

passport.use(new LocalStrategy(authenticate))
passport.use("local-register", new LocalStrategy({passReqToCallback: true}, register))

function authenticate(username, password, done) {
	db("users")
		.where("username", username)
		.first()
		.then((user) => {
			if (!user || !bcrypt.compareSync(password, user.password)) {
				return done(null, false, {message: "invalid user and password combination"})
			}
			done(null, user)
		}, done)
}

function register(req, username, password, done) {
	db("users")
		.where("username", username)
		.first()
		.then((user) => {
			if (user) {
				return done(null, false, {message: "an account with that username has already been created"})
			}
			if (password !== req.body.password2) {
				return done(null, false, {message: "passwords don't match"})
			}
			const newUser = {
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				email: req.body.email,
				username: username,
				password: bcrypt.hashSync(password),
				is_admin: req.body.is_admin,
				is_teamAdmin: req.body.is_teamAdmin,
				referrer: req.params.referrer,
				user_code: shortId.generate()
			}
			db("users")
				.where("username", newUser.referrer)
				.then((data) => {
					var newPoints = data[0].points + 1
					db("users")
					.where("username", data[0].username)
					.update({
						points: newPoints
					})
					.then(() => {
						db("users")
							.insert(newUser)
							.then((ids) => {
								db("profile")
									.insert({
										user_id: ids[0]
									})
									.then(() => {
										db("profile_personal_info")
											.insert({
												user_id: ids[0]
											})
											.then(() => {
												db("friends_list")
													.insert({
														user_id: ids[0],
														friend_id: data[0].id,
														approved: 1
													})
													.then(() => {
														db("friends_list")
															.insert({
																user_id: data[0].id,
																friend_id: ids[0],
																approved: 1
															})
															.then(() => {
																newUser.id = ids[0]
																done(null, newUser)
															})
													})
											})
									})
							})
					})
				})
		})
}

passport.serializeUser(function(user, done) {
	done(null, user.id)
})

passport.deserializeUser(function(id, done) {
	db("users")
		.where("id", id)
		.first()
		.then((user) => {
			done(null, user)
		}, done)
})