const db = require("../db"),
			fs = require("fs")
			busboy = require("busboy");

exports.allUsers = (req, res) => {
	db("users")
		.innerJoin("profile", "users.id", "profile.user_id")
		.where("user_id", req.user.id)
		.then((userInfo) => {
			db("users")
				.select("*")
				.then((allUsers) => {
					res.render("allusers", {currentUser: req.user, userInfo, allUsers})
				})
		})
}

exports.getProfile = (req, res) => {
	db("users")
		.innerJoin("profile", "users.id", "profile.user_id")
		.where("user_id", req.params.id)
		.then((user) => {
			if (user) {
				res.render("profile/profile", {currentUser: req.user, userInfo: user });
			} else {
				req.flash("error", "User does not exist.");
				res.redirect("back")
			}
		})
}

exports.getProfileContent = (req, res) => {
	db("users")
		.innerJoin("profile", "users.id", "profile.user_id")
		.where("user_id", req.params.id)
		.then((user) => {
			if (user) {
				res.render("profile/content", {currentUser: req.user, userInfo: user});
			} else {
				req.flash("error", "User does not exist.");
				res.redirect("back")
			}
		})
}

exports.getProfileAbout = (req, res) => {
	db("users")
		.innerJoin("profile", "users.id", "profile.user_id")
		.where("user_id", req.params.id)
		.then((user) => {
			if (user) {
				db("profile_personal_info")
					.where("user_id", req.params.id)
					.first()
					.then((personalInfo) => {
						res.render("profile/about", {currentUser: req.user, userInfo: user, personalInfo});
					})
			} else {
				req.flash("error", "User does not exist.");
				res.redirect("back")
			}
		})
}
exports.editProfileAbout = (req, res) => {
    const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const birthday = req.body.birthday ? formatDate(req.body.birthday) : null;

    db("profile_personal_info")
        .where("user_id", req.params.id)
        .update({
            birthday: birthday,
            height: req.body.height,
            eye_color: req.body.eye_color,
            hair_color: req.body.hair_color,
            religion: req.body.religion,
            smoke: req.body.smoke,
            drink: req.body.drink,
            company: req.body.company,
            job_title: req.body.job_title,
            nationality: req.body.nationality,
            language: req.body.language,
            children: req.body.children,
            description: req.body.description,
            favorite: req.body.favorite,
            hobby: req.body.hobby,
            skill: req.body.skill,
            dream: req.body.dream,
            quote: req.body.quote,
            event: req.body.event,
            family: req.body.family,
            group: req.body.group,
            education: req.body.education,
            like: req.body.like,
            philosophy: req.body.philosophy,
            status: req.body.status,
            question: req.body.question,
            career: req.body.career,
            real_me: req.body.real_me,
            business: req.body.business,
            my_life: req.body.my_life,
            goal: req.body.goal,
            life_line: req.body.life_line,
            pet: req.body.pet,
        })
        .then(() => {
            res.redirect("back");
        })
        .catch((error) => {
            console.error("Error updating profile:", error);
            res.status(500).send("Internal Server Error");
        });
};
exports.uploadResume = (req, res) => {

}

exports.deleteResume = (req, res) => {
	
}

exports.getFriendsList = (req, res, next) => {
	db("users")
		.innerJoin("profile", "users.id", "profile.user_id")
		.where("user_id", req.params.id)
		.then((userInfo) => {
			db("users")
				.innerJoin("friends_list", "users.id", "friends_list.friend_id")
				.where("user_id", req.user.id)
				.then((userFriends) => {
					db("users")
						.innerJoin("friends_list", "users.id", "friends_list.user_id")
						.where("friend_id", req.user.id)
						.then((friendRequests) => {
							res.render("profile/friends-list", { currentUser: req.user, userInfo , userFriends, friendRequests})
						})
				})
		})
}

exports.friendRequest = (req, res) => {
	db("friends_list")
		.insert({
			user_id: req.user.id,
			friend_id: req.params.id,
		})
		.then(() => {
			req.flash("success", "Friend request successfully sent");
			res.redirect("back")
		})
}

exports.acceptFriendRequest = (req, res) => {
	db("friends_list")
		.where("id", req.params.friendslist_id)
		.update({
			approved: 1
		})
		.then((testing) => {
			db("friends_list")
				.where("id", req.params.friendslist_id)
				.first()
				.then((request) => {
					db("friends_list")
						.insert({
							user_id: req.user.id,
							friend_id: request.user_id,
							approved: 1
						})
						.then(() => {
							res.redirect("back")
						})
				})
		})
}

exports.getProfileinvite = (req, res) => {
	if (req.user.id != req.params.id) {
		res.render("403");
	}
	db("users")
		.innerJoin("profile", "users.id", "profile.user_id")
		.where("user_id", req.params.id)
		.then((user) => {
			if (user) {
				res.render("profile/invite-friend", {currentUser: req.user, userInfo: user, hostname: req.headers.host});
			} else {
				req.flash("error", "User does not exist.");
				res.redirect("back")
			}
		})
}

exports.getWall = (req, res) => {
	db("users")
		.innerJoin("profile", "users.id", "profile.user_id")
		.where("user_id", req.params.id)
		.then((userInfo) => {
			db("wall")
				.innerJoin("users", "wall.post_user_id", "users.id")
				.orderBy("post_id", "desc")
				.where("user_id", req.params.id)
				.then((posts) => {
					console.log(posts);
					db("wall")
						.innerJoin("users", "wall.post_user_id", "users.id")
						.orderBy("post_id", "desc")
						.where({user_id: req.params.id, app: "process_crm"})
						.then((crmPosts) => {
							res.render("profile/wall", { currentUser: req.user, userInfo, posts, crmPosts })
						}) 
				})
		})
}

exports.postWall = (req, res) => {
	if (req.body.post_text) {
		db("wall")
			.insert({
				user_id: req.params.id,
				post_user_id: req.user.id,
				post_text: req.body.post_text,
				date: new Date().today(),
				time: new Date().timeNow(),
				app: "profile"
			})
			.then(() => {
				db("users")
					.where("id", req.user.id)
					.first()
					.then((user) => {
						var newPoints = user.points + 1
						db("users")
							.where("id", req.user.id)
							.update({
								points: newPoints
							})
							.then(() => {
								res.redirect("back")
							})
					})
			})
	} else {
		var fstream;
		req.pipe(req.busboy);
		req.busboy.on("file", (fieldName, file, fileName) => {
			console.log("Uploading: " + fileName);
			fstream = fs.createWriteStream("./public/wall/" + fileName);
			file.pipe(fstream);
			fstream.on("close", () => {
			db("wall")
				.insert({
					user_id: req.params.id,
					post_user_id: req.user.id,
					post_media: fileName,
					date: new Date().today(),
					time: new Date().timeNow(),
					app: "profile"
				})
				.then(() => {
					db("users")
						.where("id", req.user.id)
						.first()
						.then((user) => {
							var newPoints = user.points + 1
							db("users")
								.where("id", req.user.id)
								.update({
									points: newPoints
								})
								.then(() => {
									next()
								})
					})
					if (req.user.id == req.params.id) {
						var temp = fileName.match(/([.][^.]+)$/);
						if (temp[0] == ".jpg" || temp[0] == ".JPG" || temp[0] == ".jpeg" || temp[0] == ".pdf" || temp[0] == ".PDF" || temp[0] == ".png" || temp[0] == ".PNG") {
							db("profile_media_photos")
								.insert({
									owner_id: req.user.id,
									image: fileName,
									migrated: 1
								})
								.then(() => { 
									res.redirect("back") 
								})
						}
						if (temp[0] == ".mov" || temp[0] == ".MOV" || temp[0] == ".mp4" || temp[0] == ".MP4" || temp[0] == ".mpeg" || temp[0] == ".MPEG") {
							db("profile_media_videos")
								.insert({
									owner_id: req.user.id,
									video: fileName,
									migrated: 1
								})
								.then(() => { 
									req.flash("success", "+1 points for you")
									res.redirect("back") 
								})
						}
					}
					
				})
			})
		})
	}
}

exports.editWallPost = (req, res) => {
	db("wall")
		.where("post_id", req.params.post_id)
		.update({
			post_text: req.body.post_text,
			date: new Date().today(),
			time: new Date().timeNow()
		})
		.then(() => {
			res.redirect("back")
		})
}

exports.deleteWallPost = (req, res) => {
	db("wall")
		.where("post_id", req.params.post_id)
		.del()
		.then(() => {
			req.flash("error", "Successfully deleted post")
			res.redirect("back")
		})
}

exports.getMedia = (req, res) => {
	db("users")
		.innerJoin("profile", "users.id", "profile.user_id")
		.where("user_id", req.params.id)
		.then((userInfo) => {
			db("users")
				.rightJoin("profile_media_photos", "users.id", "profile_media_photos.owner_id")
				.where("owner_id", req.params.id)
				.then((userPhotos) => {
					db("users")
						.rightJoin("profile_media_videos", "users.id", "profile_media_videos.owner_id")
						.where("owner_id", req.params.id)
						.then((userVideos) => {
							res.render("profile/media", {currentUser: req.user, userInfo, userPhotos, userVideos})
						})
				})
		})
}

exports.uploadPhotos = (req, res) => {
	if (req.params.id == req.user.id) {
		var fstream;
		req.pipe(req.busboy);
		req.busboy.on("file", (fieldName, file, fileName) => {
			if (fileName.length > 0) {
				console.log("Uploading: " + fileName);
				fstream = fs.createWriteStream("./public/images/media/" + fileName);
				file.pipe(fstream);
				fstream.on("close", () => {
					db("profile_media_photos")
						.where("owner_id", req.params.id)
						.insert({
							owner_id: req.user.id,
							image: fileName
						})
						.then(() => {
							req.flash("success", "Successfully uploaded image to photo album");
							res.redirect("back")
						})
				})
			} else {
				req.flash("error", "Please attach an image file");
				res.redirect("back")
			}
		})	
	} else {
		res.send("You are not authorized")
	}
}

exports.deletePhoto = (req, res) => {
	db("profile_media_photos")
		.where("photo_id", req.params.photoid)
		.del()
		.then(() => {
			res.redirect("back")
		})
}

exports.uploadVideo = (req, res) => {
	if (req.params.id == req.user.id) {
		var fstream;
		req.pipe(req.busboy);
		req.busboy.on("file", (fieldName, file, fileName) => {
			if (fileName.length > 0) {
				console.log("Uploading: " + fileName);
				fstream = fs.createWriteStream("./public/videos/media/" + fileName);
				file.pipe(fstream);
				fstream.on("close", () => {

				db("profile_media_videos")
					.where("owner_id", req.params.id)
					.insert({
						owner_id: req.user.id,
						video: fileName
					})
					.then(() => {
						req.flash("success", "Successfully uploaded video to video album");
						res.redirect("back")
					})
				})
			} else {
				req.flash("error", "Please attach an video file");
				res.redirect("back")
			}
		})	
	} else {
		res.send("You are not authorized")
	}
}

exports.deleteVideo = (req, res) => {
	db("profile_media_videos")
		.where("video_id", req.params.videoid)
		.del()
		.then(() => {
			res.redirect("back")
		})
}

exports.getProfileSettings = (req, res) => {
	if (req.user.id != req.params.id) {
		res.render("403");
	}
	db("users")
		.innerJoin("profile", "users.id", "profile.user_id")
		.where("user_id", req.params.id)
		.then((user) => {
			if (user) {
				res.render("profile/settings", {currentUser: req.user, userInfo: user, hostname: req.headers.host});
			} else {
				req.flash("error", "User does not exist.");
				res.redirect("back")
			}
		})
}

exports.editProfile = (req, res, next) => {
	db("users")
		.where("id", req.params.id)
		.update({
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email
		})
		.then(() => {
			req.flash("success", "Profile information successfully saved.")
			res.redirect("back")
		})
}

exports.uploadProfilePic = (req, res, next) => {
	if (req.params.id == req.user.id) {
		var fstream;
		req.pipe(req.busboy);
		req.busboy.on('field', (fieldName, val) => {
			req.busboy.on("file", (fieldName, file, fileName) => {
				if (fileName.length > 0) {
					console.log("Uploading: " + fileName);
					fstream = fs.createWriteStream("./public/images/profile-imgs/" + fileName);
					file.pipe(fstream);
					fstream.on("close", () => {
						db("profile")
							.where("user_id", req.params.id)
							.update({
								profile_img: fileName,
								profile_img_status: val
							})
							.then(() => {
								req.flash("success", "Successfully uploaded profile image");
								res.redirect("back")
							})
					})
				} else {
					req.flash("error", "Please attach an image file");
					res.redirect("back")
				}
			})
		})	
	} else {
		res.send("You are not authorized")
	}
}

exports.uploadWallPic = (req, res) => {
	if (req.params.id == req.user.id) {
		var fstream;
		req.pipe(req.busboy);
		req.busboy.on("file", (fieldName, file, fileName) => {
			if (fileName.length > 0) {
				console.log("Uploading: " + fileName);
				fstream = fs.createWriteStream("./public/images/wall-imgs/" + fileName);
				file.pipe(fstream);
				fstream.on("close", () => {
					db("profile")
						.where("user_id", req.params.id)
						.update({
							wall_img: fileName
						})
						.then(() => {
							req.flash("success", "Successfully uploaded wall image");
							res.redirect("back")
						})
				})
			} else {
				req.flash("error", "Please attach an image file");
				res.redirect("back")
			}
		})	
	} else {
		res.send("You are not authorized")
	}
}

// For todays date;
Date.prototype.today = function () { 
  return ((this.getDate() < 10)?"0":"") + (((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getDate() +"/"+ this.getFullYear();
}

// For the time now
Date.prototype.timeNow = function () {
	let hour = this.getHours()
	if (hour > 12) {
		hour = hour - 12;
	} 
  return ((hour < 10)?"0":"") + hour +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}