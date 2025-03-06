const db = require("../db"),
			fs = require("fs"),
			busboy = require("connect-busboy"),
			nodemailer = require("nodemailer");

exports.process = (req, res) => {
	db("process_prospects")
		.where("user_id", req.user.id)
		.first()
		.then((prospect) => {
			if (prospect) {
				res.redirect("/opportunity/multiplechoice/introduction")
			} else {
				res.render("process/processStart", {currentUser: req.user});
			}
		})
}

exports.startProcess = (req, res) => {
	db("users")
		.where("user_code", req.body.referrer_code)
		.first()
		.then((user) => {
			if (user) {
				db("process_prospects")
					.insert({
						user_id: req.user.id,
						referrer_code: req.body.referrer_code
					})
					.then(() => {
						res.redirect("/opportunity/multiplechoice/introduction")
					})
			} else {
				// flash message: please enter valid referrer_code
				res.redirect("back")
			}
		})
}

exports.multiplechoice = (req, res) => {
	db("process_multiplechoices")
		.innerJoin("process_pages", "process_multiplechoices.page_id", "process_pages.id")
		.where("name", req.params.page_name)
		.first()
		.then((codeInfo) => {
			res.render("process/multiplechoice", {currentUser: req.user, codeInfo: codeInfo})
		})
}

exports.multiplechoiceToPage = (req, res) => {
	db("process_multiplechoices")
		.innerJoin("process_pages", "process_pages.id", "process_multiplechoices.page_id")
		.where("name", req.params.page_name)
		.first()
		.then((codeInfo) => {
			if (codeInfo.correct_answer === req.body.multiplechoice) {
				db("process_prospects")
					.where("user_id", req.user.id)
					.first()
					.then((user) => {
						if (codeInfo.id > user.latest_unlock_page_id) {
							db("process_prospects")
								.update({
									latest_unlock_page_id: codeInfo.id
								})
								.then(() => {
									res.redirect("/opportunity/page/" + codeInfo.name)
								})
						} else {
							res.redirect("/opportunity/page/" + codeInfo.name)
						}
					})
			} else {
				// flash message: please enter valid multiplechoice
				req.flash("error", "Incorrect choice. Please try again.");
				res.redirect("back")
			}
		})
}

exports.page = (req, res) => {
	db("process_pages")
		.leftJoin("process_questions", "process_pages.id", "process_questions.page_id")
		.where("name", req.params.page_name)
		.then((pagesInfo) => {
			if (pagesInfo.length > 0) {
				res.render("process/page", {currentUser: req.user, pagesInfo: pagesInfo})
			} else {
				// flash message: 404 that page doesn't exist
				console.log("404 that page doesnt exist")
				res.render("404")
			}
		})
}

exports.emailAnswers = (req, res) => {
	db("process_pages")
		.innerJoin("process_questions", "process_pages.id", "process_questions.page_id")
		.where("name", req.params.page_name)
		.then((pagesInfo) => {
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
				if (pagesInfo[0].next_page_id) {
					db("process_pages")
						.where("id", pagesInfo[0].next_page_id)
						.first()
						.then((pageInfo) => {
							res.redirect("/opportunity/multiplechoice/" + pageInfo.name)
						})
				} else {
					req.flash("success", "Answer successfully sent")
					req.flash("error", "This page doesn't have a 'next page'. Either this is the last page or you need to assign it a next page in the edit page");
					res.redirect("back")
				}
				
			})
		})
}

exports.pages = (req, res) => {
	db("process_prospects")
		.innerJoin("process_pages", "process_prospects.latest_unlock_page_id", "process_pages.id")
		.first()
		.then((result) => {
			if (result) {
				let latestPageId = result.id;
				db("process_pages")
					.select("*")
					.limit(latestPageId)
					.then((pagesInfo) => {
						res.render("process/pages", {currentUser: req.user, pagesInfo: pagesInfo})
					})
			} else {
				// flash message: something
				res.redirect("back")
			}
		})
}

exports.backoffice = (req, res) => {
	db("process_pages")
		.select("*")
		.then((pagesInfo) => {
			res.render("process/backoffice", {currentUser: req.user, pagesInfo: pagesInfo})
		})
}

exports.createPageForm = (req, res) => {
	res.render("process/createPage", {currentUser: req.user})
}

exports.createPage = (req, res) => {
	db("process_pages")
		.where("name", req.body.name)
		.first()
		.then((existingPage) => {
			if (existingPage) {
				// flash message: that page name already exists
				res.redirect("back")
			} else {
				db("process_pages")
					.insert({
						name: req.body.name,
						title: req.body.title,
						summary: req.body.summary,
						content: req.body.content,
						instruction: req.body.instruction
					})
					.then((newPage) => {
						db("process_multiplechoices")
							.insert({
								mc_question: req.body.mc_question,
								a: req.body.a,
								b: req.body.b,
								c: req.body.c,
								d: req.body.d,
								correct_answer: req.body.correct_answer,
								page_id: newPage[0]
							})
							.then(() => {
								db("process_questions")
									.insert({
										question: req.body.question,
										page_id: newPage[0]
									})
									.then(() => {
										db("process_pages")
											.where("id", newPage[0])
											.update({
												next_page_id: newPage[0] + 1
											})
											.then(() => {
												res.redirect("/opportunity/page/" + req.body.name)
											})
									})
							})
					})
			}
		})
}
 
exports.editPage = (req, res) => {
	db("process_pages")
		.leftJoin("process_questions", "process_pages.id", "process_questions.page_id")
		.leftJoin("process_multiplechoices", "process_pages.id", "process_multiplechoices.page_id")
		.where("name", req.params.page_name)
		.then((pageInfo) => {
			res.render("process/editPage", {currentUser: req.user, pageInfo: pageInfo})
		})
}

exports.updatePage = (req, res, next) => {
	db("process_pages")
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
			db("process_pages")
				.where("name", req.params.page_name)
				.first()
				.then((pageInfo) => {
					db("process_multiplechoices")
						.where("page_id", pageInfo.id)
						.update({
							mc_question: req.body.mc_question,
							a: req.body.a,
							b: req.body.b,
							c: req.body.c,
							d: req.body.d,
							correct_answer: req.body.correct_answer
						})
						.then(() => {
							if (pageInfo.id != 2) {
								db("process_questions")
									.where("page_id", pageInfo.id)
									.update({
										question: req.body.question
									})
									.then(() => {
										next()
									})

							} else {
								req.body.question.forEach(function(e, i) {
									db("process_questions")
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

exports.updateImage = (req, res, next) => {
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on("file", (fieldName, file, fileName) => {
        console.log(fieldName);
        if (fileName.length > 0) {
            console.log("Uploading: " + fileName);
            const dir = path.join(__dirname, '../public/process/images');
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir, { recursive: true });
            }
            fstream = fs.createWriteStream(path.join(dir, fileName));
            file.pipe(fstream);
            fstream.on("close", () => {
                db("process_pages")
                    .where("name", req.params.page_name)
                    .update({
                        image: fileName
                    })
                    .then(() => {
                        req.flash("success", "Successfully uploaded image");
                        res.redirect("back")
                    })
            })
        } else {
            req.flash("error", "Please attach an image file");
            res.redirect("back")
        }
    })
}
exports.updateVideo = (req, res, next) => {
	var fstream;
	req.pipe(req.busboy);
	req.busboy.on("file", (fieldName, file, fileName) => {
		console.log(fieldName);
		if (fileName.length > 0) {
			console.log("Uploading: " + fileName);
			fstream = fs.createWriteStream("./public/process/videos/" + fileName);
			file.pipe(fstream);
			fstream.on("close", () => {
				db("process_pages")
					.where("name", req.params.page_name)
					.update({
						video: fileName
					})
					.then(() => {
						req.flash("success", "Successfully uploaded video");
						res.redirect("back")
					})
			})
		} else {
			req.flash("error", "Please attach an video file");
			res.redirect("back")
		}
	})
}
const path = require('path');

exports.updateAudio = (req, res, next) => {
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on("file", (fieldName, file, fileName) => {
        console.log(fieldName);
        if (fileName.length > 0) {
            console.log("Uploading: " + fileName);
            const dir = path.join(__dirname, '../public/process/audios');
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir, { recursive: true });
            }
            fstream = fs.createWriteStream(path.join(dir, fileName));
            file.pipe(fstream);
            fstream.on("close", () => {
                db("process_pages")
                    .where("name", req.params.page_name)
                    .update({
                        audio: fileName
                    })
                    .then(() => {
                        req.flash("success", "Successfully uploaded audio");
                        res.redirect("back")
                    })
            })
        } else {
            req.flash("error", "Please attach an audio file");
            res.redirect("back")
        }
    })
}
