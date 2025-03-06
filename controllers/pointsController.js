const db = require("../db");

exports.getPoints = (req, res) => {
	db("users")
		.innerJoin("profile", "users.id", "profile.user_id")
		.where("user_id", req.user.id)
		.then((userInfo) => {
			if (userInfo.length > 0) {
				res.render("transfer", {currentUser: req.user, amount: userInfo[0].points, userInfo});
			} else {
				req.flash("error", "User does not exist.");
				res.redirect("back")
			}
		})
}

exports.transferPoints = (req, res) => {
	var receiver = req.body.receiver,
		  transferAmount = parseInt(req.body.transfer_amount);
	db("users")
		.where("username", receiver)
		.then((receivingUser) => {
			if (receivingUser[0]) {
				db("users")
					.where("id", req.user.id)
					.then((givingUser) => {
						if (transferAmount > givingUser[0].points) {
							console.log("Exceeded Current Balance");
							res.redirect("back");
						} else if (transferAmount <= 0) {
							console.log("Please enter an amount greater than 0");
							res.redirect("back");
						} else {
							var newBalance = givingUser[0].points - transferAmount 
							db("users")
								.where("id", req.user.id)
								.update({
									points: newBalance
								})
								.then(() => {
									db("users")
										.where("id", receivingUser[0].id)
										.then((receivingUser2) => {
											var receiverBalance = receivingUser2[0].points + transferAmount;
											db("users")
												.where("id", receivingUser[0].id)
												.update({
													points: receiverBalance
												})
												.then(() => {
													db("ledger")
														.insert({
															to_user: receiver,
															to_user_amount: transferAmount,
															from_user: req.user.username, 
														})
														.then(() => {
															res.redirect("back")
														})
												})
										})
								})
						}
					})
			} else {
				console.log("No such user")
				res.redirect("back")
			}
		})
}

exports.getPublicLedger = (req, res) => {
	db("users")
		.innerJoin("profile", "users.id", "profile.user_id")
		.where("user_id", req.user.id)
		.then((userInfo) => {
			db("ledger")
				.select("*")
				.then((data) => {
					res.render("public-ledger", {currentUser: req.user, data: data, userInfo})
				})
		})
}

exports.getPersonalLedger = (req, res) => {
	db("users")
		.innerJoin("profile", "users.id", "profile.user_id")
		.where("user_id", req.user.id)
		.then((userInfo) => {
			db("ledger")
				.select("*")
				.where("from_user", req.user.username)
				.then((data) => {
					db("ledger")
						.select("*")
						.where("to_user", req.user.username)
						.then((data2) => {
							res.render("personal-ledger", {currentUser: req.user, data: data, data2: data2, userInfo})
						})
				})
		})
}
