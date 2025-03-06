const db = require("../db"),
			fs = require("fs"),
			busboy = require("connect-busboy"),
			nodemailer = require("nodemailer");
const path = require('path');

exports.interview = (req, res) => {
	db("interview_users")
		.where("user_id", req.user.id)
		.first()
		.then((prospect) => {
			if (prospect) {
				res.redirect("/interview/accesscode/introduction")
			} else {
				res.render("interview/interviewStart", {currentUser: req.user});
			}
		})
}

exports.startinterview = (req, res) => {
	db("users")
		.where("user_code", req.body.referrer_code)
		.first()
		.then((user) => {
			console.log("interview_users", user)
			if (user) {
				db("interview_users")
					.insert({
						user_id: req.user.id,
						referrer_code: req.body.referrer_code
					})
					.then(() => {
						res.redirect("/interview/accesscode/introduction")
					})
			} else {
				// flash message: please enter valid referrer_code
				res.redirect("back")
			}
		})
}

exports.accesscode = (req, res) => {
	db("interview_accesscodes")
		.innerJoin("interview_pages", "interview_accesscodes.page_id", "interview_pages.id")
		.where("name", req.params.page_name)
		.first()
		.then((codeInfo) => {
			res.render("interview/accesscode", {currentUser: req.user, codeInfo: codeInfo})
		})
}

exports.accesscodeToPage = (req, res) => {
	db("interview_accesscodes")
		.innerJoin("interview_pages", "interview_pages.id", "interview_accesscodes.page_id")
		.where("name", req.params.page_name)
		.first()
		.then((codeInfo) => {
			if (codeInfo.code === parseInt(req.body.accesscode)) {
				db("interview_users")
					.where("user_id", req.user.id)
					.first()
					.then((user) => {
						if (codeInfo.id > user.latest_unlock_page_id) {
							db("interview_users")
								.update({
									latest_unlock_page_id: codeInfo.id
								})
								.then(() => {
									res.redirect("/interview/page/" + codeInfo.name)
								})
						} else {
							res.redirect("/interview/page/" + codeInfo.name)
						}
					})
			} else {
				// flash message: please enter valid accesscode
				res.redirect("back")
			}
		})
}

exports.page = (req, res) => {
	db("interview_pages")
		.leftJoin("interview_questions", "interview_pages.id", "interview_questions.page_id")
		.where("name", req.params.page_name)
		.then((pagesInfo) => {
			if (pagesInfo.length > 0) {
				res.render("interview/page", {currentUser: req.user, pagesInfo: pagesInfo})
			} else {
				// flash message: 404 that page doesn't exist
				console.log("404 that page doesnt exist")
				res.render("404")
			}
		})
}

exports.emailAnswers = (req, res) => {
	db("interview_pages")
		.innerJoin("interview_questions", "interview_pages.id", "interview_questions.page_id")
		.where("name", req.params.page_name)
		.then((pagesInfo) => {
			console.log(pagesInfo)
			let transporter = nodemailer.createTransport({
				host: 'smtp.gmail.com',
				port: 465,
				secure: true, // use SSL
				auth: {
					user: "siromni.com@gmail.com",
					pass: "pvkvlnqqyuhohrcc"
				}
			})
			let message = ``
			for (var i=0;i<pagesInfo.length;i++) {
				let temp = i+1
				message += `
					<h3>${pagesInfo[i].question}</h3>
					<p>${req.body["answer" + temp]}</p>
				`
			}
			let mailOptions = {
				from: '"no-reply" <peterhantemp@gmail.com>',
				to: '"Peter Han" <peterhantemp@gmail.com>',
				subject: `Answers From: ${req.user.first_name} ${req.user.last_name} (${req.params.page_name} page)`,
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
				db("interview_pages")
					.where("id", pagesInfo[0].page_id)
					.first()
					.then((pageInfo) => {
						res.redirect("/interview/accesscode/" + pageInfo.name)
					})
			})
		})
}
exports.pages = (req, res) => {
    db("interview_pages")
        .select("*")
        .then((pagesInfo) => {
            res.render("interview/pages", { currentUser: req.user, pagesInfo: pagesInfo });
        })
        .catch((err) => {
            console.error('Error fetching pages:', err);
            res.status(500).send('Internal Server Error');
        });
};
exports.backoffice = (req, res) => {
	db("interview_pages")
		.select("*")
		.then((pagesInfo) => {
			res.render("interview/backoffice", {currentUser: req.user, pagesInfo: pagesInfo})
		})
}

exports.createPageForm = (req, res) => {
	res.render("interview/createPage", {currentUser: req.user})
}

exports.createPage = (req, res) => {
	db("interview_pages")
		.where("name", req.body.name)
		.first()
		.then((existingPage) => {
			if (existingPage) {
				// flash message: that page name already exists
				res.redirect("back")
			} else {
				db("interview_pages")
					.insert({
						name: req.body.name,
						title: req.body.title,
						summary: req.body.summary,
						content: req.body.content,
						instruction: req.body.instruction
					})
					.then((newPage) => {
						db("interview_accesscodes")
							.insert({
								code: req.body.accesscode,
								accesscode_title: req.body.accesscode_title,
								accesscode_summary: req.body.accesscode_summary,
								page_id: newPage[0]
							})
							.then(() => {
								db("interview_questions")
									.insert({
										question: req.body.question,
										page_id: newPage[0]
									})
									.then(() => {
										res.redirect("/interview/page/" + req.body.name)
									})
							})
					})
			}
		})
}

exports.editPage = (req, res) => {
	db("interview_pages")
		.leftJoin("interview_questions", "interview_pages.id", "interview_questions.page_id")
		.leftJoin("interview_accesscodes", "interview_pages.id", "interview_accesscodes.page_id")
		.where("name", req.params.page_name)
		.then((pageInfo) => {
			res.render("interview/editPage", {currentUser: req.user, pageInfo: pageInfo})
		})
}

exports.updatePage = (req, res, next) => {
	db("interview_pages")
		.where("name", req.params.page_name)
		.update({
			name: req.body.name,
			title: req.body.title,
			summary: req.body.summary,
			content: req.body.content,
			instruction: req.body.instruction
		})
		.then(() => {
			// flash message: change done
			db("interview_pages")
				.where("name", req.params.page_name)
				.first()
				.then((pageInfo) => {
					db("interview_accesscodes")
						.where("page_id", pageInfo.id)
						.update({
							code: req.body.accesscode,
							accesscode_title: req.body.accesscode_title,
							accesscode_summary: req.body.accesscode_summary
						})
						.then(() => {
							if (pageInfo.id != 2) {
								db("interview_questions")
									.where("page_id", pageInfo.id)
									.update({
										question: req.body.question
									})
									.then(() => {
										next()
									})

							} else {
								req.body.question.forEach(function(e, i) {
									db("interview_questions")
										.where("question_number", i)
										.update({
											question: e
										})
										.then(() => {
											next()
										})
								})
							}
							res.redirect("back")
						})
				})
		})
}

// filepath: /home/oem/Documents/sera/Omni/controllers/interviewController.js
exports.updateImage = (req, res, next) => {
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on("file", (fieldName, file, fileName) => {
        console.log(fieldName);
        if (fileName.length > 0) {
            console.log("Uploading: " + fileName);
            const dir = path.join(__dirname, '../public/interview/images');
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir, { recursive: true });
            }
            const filePath = path.join(dir, fileName);
            fstream = fs.createWriteStream(filePath);
            file.pipe(fstream);
            fstream.on("close", () => {
                db("interview_pages")
                    .where("name", req.params.page_name)
                    .update({
                        image: fileName
                    })
                    .then(() => {
                        req.flash("success", "Successfully uploaded image");
                        res.redirect("back");
                    })
                    .catch(err => {
                        console.error('Error updating database:', err);
                        req.flash("error", "Error updating database");
                        res.redirect("back");
                    });
            });
        } else {
            req.flash("error", "Please attach an image file");
            res.redirect("back");
        }
    });
};
exports.updateVideo = (req, res, next) => {
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on("file", (fieldName, file, fileName) => {
        console.log(fieldName);
        if (fileName.length > 0) {
            console.log("Uploading: " + fileName);
            const dir = path.join(__dirname, '../public/interview/videos');
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir, { recursive: true });
            }
            const filePath = path.join(dir, fileName);
            fstream = fs.createWriteStream(filePath);
            file.pipe(fstream);
            fstream.on("close", () => {
                db("interview_pages")
                    .where("name", req.params.page_name)
                    .update({
                        video: fileName
                    })
                    .then(() => {
                        req.flash("success", "Successfully uploaded video");
                        res.redirect("back");
                    })
                    .catch(err => {
                        console.error('Error updating database:', err);
                        req.flash("error", "Error updating database");
                        res.redirect("back");
                    });
            });
        } else {
            req.flash("error", "Please attach a video file");
            res.redirect("back");
        }
    });
};

// filepath: /home/oem/Documents/sera/Omni/controllers/interviewController.js
exports.updateAudio = (req, res, next) => {
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on("file", (fieldName, file, fileName) => {
        console.log(fieldName);
        if (fileName.length > 0) {
            console.log("Uploading: " + fileName);
            const dir = path.join(__dirname, '../public/interview/audios');
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir, { recursive: true });
            }
            const filePath = path.join(dir, fileName);
            fstream = fs.createWriteStream(filePath);
            file.pipe(fstream);
            fstream.on("close", () => {
                db("interview_pages")
                    .where("name", req.params.page_name)
                    .update({
                        audio: fileName
                    })
                    .then(() => {
                        req.flash("success", "Successfully uploaded audio");
                        res.redirect("back");
                    })
                    .catch(err => {
                        console.error('Error updating database:', err);
                        req.flash("error", "Error updating database");
                        res.redirect("back");
                    });
            });
        } else {
            req.flash("error", "Please attach an audio file");
            res.redirect("back");
        }
    });
};