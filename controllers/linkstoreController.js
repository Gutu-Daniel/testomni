const db = require("../db");

exports.linkstore = (req, res) => {
	db("linkstore_users")
		.where("user_id", req.user.id)
		.first()
		.then((user) => {
			if (user) {
				res.redirect("/linkstore/home")
			} else {
				res.render("linkstore/linkstoreStart", { currentUser: req.user });
			}
		})
}

exports.deleteFolder = (req, res) => {
	db("linkstore_users_folders")
		.innerJoin("linkstore_folders", "linkstore_users_folders.folder_id", "linkstore_folders.id")
		.innerJoin("users", "linkstore_users_folders.user_id", "users.id")
		.where("folder_id", req.params.folder_id)
		.then((folder) => {
			db("linkstore_links")
				.where("folder_id", req.params.folder_id)
				.del()
				.then((links) => {
					db("linkstore_folders")
						.where('id', req.params.folder_id)
						.del()
						.then((links) => {
							res.redirect("/linkstore/home")
						})
				})

		})
}

exports.startLinkstore = (req, res) => {
	db("users")
		.where("user_code", req.body.referrer_code)
		.first()
		.then((user) => {
			if (user) {
				db("linkstore_users")
					.insert({
						user_id: req.user.id,
						referrer_code: req.body.referrer_code
					})
					.then(() => {
						res.redirect("/linkstore/home")
					})
			} else {
				// flash message: please enter valid referrer_code
				res.redirect("back")
			}
		})
}

exports.home = (req, res) => {
	db("linkstore_users_folders")
		.innerJoin("linkstore_folders", "linkstore_users_folders.folder_id", "linkstore_folders.id")
		.innerJoin("users", "linkstore_users_folders.user_id", "users.id")
		.where("users.id", req.user.id)
		.then((folders) => {
			res.render("linkstore/linkstoreHome", { currentUser: req.user, folders })
		})
}

exports.createFolder = (req, res) => {
	db("linkstore_folders")
		.insert({
			title: req.body.title,
			leader_id: req.user.id
		})
		.then((folderId) => {
			db("linkstore_users_folders")
				.insert({
					user_id: req.user.id,
					folder_id: folderId
				})
				.then(() => {
					res.redirect("back")
				})
		})
}
 
exports.eachFolder = (req, res) => {
	db("linkstore_users_folders")
		.innerJoin("linkstore_folders", "linkstore_users_folders.folder_id", "linkstore_folders.id")
		.innerJoin("users", "linkstore_users_folders.user_id", "users.id")
		.where("folder_id", req.params.folder_id)
		.then((folder) => {
			db("linkstore_links")
				.where("folder_id", req.params.folder_id)
				.then((links) => {
					res.render("linkstore/eachFolder", { currentUser: req.user, folder, links })
				})
		})
}

exports.addUserToFolder = (req, res) => {
	db("users")
		.where("username", req.body.username)
		.first()
		.then((user) => {
			if (user) {
				db("linkstore_users_folders")
					.insert({
						user_id: user.id,
						folder_id: req.params.folder_id
					})
					.then(() => {
						res.redirect("back")
					})
			} else {
				res.redirect("back")
			}
		})

}

exports.removeUserFromFolder = (req, res) => {
	db("linkstore_users_folders")
		.where({ folder_id: req.params.folder_id, user_id: req.body.user_id })
		.del()
		.then(() => {
			res.redirect("back")
		})
}

exports.createLinkInFolder = (req, res) => {
	db("linkstore_links")
		.insert({
			title: req.body.title,
			url: req.body.url,
			folder_id: req.params.folder_id
		})
		.then(() => {
			res.redirect("/linkstore/" + req.params.folder_id)
		})
}

exports.deleteLinkInFolder = (req, res) => {
	db("linkstore_links")
		.where({
			link_id: req.params.link_id
		}).del()
		.then(() => {
			res.redirect("/linkstore/" + req.params.folder_id)
		})
}