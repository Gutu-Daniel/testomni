const db = require("../db");
const moment = require('moment');

exports.backofficePage = (req, res) => {
	db("users")
		.innerJoin("profile", "users.id", "profile.user_id")
		.where("user_id", req.user.id)
		.then((userInfo) => {
			db("users")
				.innerJoin("profile", "users.id", "profile.user_id")
				.select("*")
				.then((allUsers) => {
					db("process_prospects")
						.innerJoin("users", "process_prospects.user_id", "users.id")
						.innerJoin("process_pages", "process_prospects.latest_unlock_page_id", "process_pages.id")
						.then((prospects) => {
							var counter = 0;
							prospects.forEach(function (prospect) {
								db("users")
									.where("user_code", prospect.referrer_code)
									.first()
									.then((referrer) => {
										prospect.referrer_code = '';
										counter++;
										if (counter === prospects.length) {
											db("crm_users")
												.innerJoin("users", "crm_users.user_id", "users.id")
												.then((crmUsers) => {
													var counter2 = 0;
													crmUsers.forEach(function (crmUser) {
														db("users")
															.where("user_code", crmUser.referrer_code)
															.first()
															.then((referrer) => {
																crmUser.referrer_code = ''
																counter2++;
																if (counter2 === crmUsers.length) {
																	db("ecrm_users")
																		.innerJoin("users", "ecrm_users.user_id", "users.id")
																		.then((ecrmUsers) => {
																			var counter3 = 0;
																			ecrmUsers.forEach(function (ecrmUser) {
																				db("users")
																					.where("user_code", ecrmUser.referrer_code)
																					.first()
																					.then((referrer) => {
																						db("crm_community_tasks")
																							.then((comTasks) => {
																								ecrmUser.referrer_code = ''
																								counter3++;
																								if (counter3 === ecrmUsers.length) {
																									db("feedbacks")
																										.innerJoin("users", "feedbacks.user_id", "users.id")
																										.innerJoin("apps", "feedbacks.app_id", "apps.id")
																										.then((userFeedbacks) => {
																											console.log("userFeedbacks",prospects )
																											res.render("backoffice/backoffice", { currentUser: req.user, userInfo, allUsers, prospects, crmUsers, ecrmUsers, comTasks, userFeedbacks })
																										})
																								}
																							})
																					})
																			})
																		})
																}
															})
													})
												})
										}
									})
							})
						})
				})
		})
}

exports.deactivateUser = (req, res) => {
	db("users")
		.where("id", req.params.user_id)
		.update({
			is_suspended: 1
		})
		.then(() => {
			res.redirect("back")
		})
}

exports.activateUser = (req, res) => {
	db("users")
		.where("id", req.params.user_id)
		.update({
			is_suspended: 0
		})
		.then(() => {
			res.redirect("back")
		})
}

exports.deleteUser = (req, res) => {
	db("users")
		.where("id", req.params.user_id)
		.del()
		.then(() => {
			res.redirect("back")
		})
}

exports.createCommunityTask = (req, res, next) => {
	db("crm_community_tasks")
		.insert({
			name: req.body.name,
			description: req.body.description,
			date: moment().format('YYYY-MM-DD')
		})
		.then((id) => {
			db("users")
				.then((users) => {
					users.forEach(function (user) {
						db("crm_community_users_tasks")
							.insert({
								task_id: id[0],
								user_id: user.id,
								task_date: moment().format('YYYY-MM-DD')
							})
							.then(() => {
								next()
							})
					})
					res.redirect("back")
				})
		})
}

exports.editCommunityTask = (req, res, next) => {
	db("crm_community_tasks")
		.where("id", req.params.task_id)
		.update({
			name: req.body.name,
			description: req.body.description
		})
		.then(() => {
			next()
		})
	res.redirect("back")
}

exports.deleteCommunityTask = (req, res) => {
	db("crm_community_tasks")
		.where("id", req.params.task_id)
		.del()
		.then(() => {
			res.redirect("back")
		})
}

exports.introPage = (req, res) => {
	db("backoffice_intro")
		.first()
		.then(introText => { res.render("backoffice/introPage", { currentUser: req.user, introText }) })
}

exports.introContent = (req, res) => {
	db("backoffice_intro")
		.update({
			title: req.body.title,
			secondary_title: req.body.secondary_title,
			intro_summary: req.body.intro_summary,
			mission_summary: req.body.mission_summary,
			about_summary: req.body.about_summary
		})
		.then(() => res.redirect("back"))
}

exports.setupPage = (req, res) => {
	db("backoffice_setup")
		.first()
		.then(setupText => res.render("backoffice/setupPage", { currentUser: req.user, setupText }))
}

exports.setupContent = (req, res) => {
	db("backoffice_setup")
		.update({
			title: req.body.title,
			secondary_title: req.body.secondary_title,
			steps_summary: req.body.steps_summary,
			step1_title: req.body.step1_title,
			step1_description: req.body.step1_description,
			step2_title: req.body.step2_title,
			step2_description: req.body.step2_description,
			step3_title: req.body.step3_title,
			step3_description: req.body.step3_description,
			step4_title: req.body.step4_title,
			step4_description: req.body.step4_description,
		})
		.then(() => res.redirect("back"))
}

// For todays date;
Date.prototype.today = function () {
	return ((this.getDate() < 10) ? "" : "") + (this.getMonth() + 1) + "/" + ((this.getDate() < 10) ? "0" : "") + this.getDate() + "/" + this.getFullYear();
}

// For the time now
Date.prototype.timeNow = function () {
	let hour = this.getHours()
	if (hour > 12) {
		hour = hour - 12;
	}
	return ((hour < 10) ? "0" : "") + hour + ":" + ((this.getMinutes() < 10) ? "0" : "") + this.getMinutes() + ":" + ((this.getSeconds() < 10) ? "0" : "") + this.getSeconds();
}
