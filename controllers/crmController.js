const { Console } = require("console");
const db = require("../db"),
	nodemailer = require("nodemailer"),
	fs = require("fs"),
	busboy = require("busboy"),
	moment = require('moment');

exports.crm = (req, res) => {
	db("crm_users")
		.where("user_id", req.user.id)
		.first()
		.then((user) => {
			if (user) {
				res.redirect("/onlineoffice/home")
			} else {
				res.render("crm/crmStart", { currentUser: req.user });
			}
		})
}

exports.startcrm = (req, res) => {
	db("users")
		.where("user_code", req.body.referrer_code)
		.first()
		.then((user) => {
			if (user) {
				db("crm_users")
					.insert({
						user_id: req.user.id,
						referrer_code: req.body.referrer_code
					})
					.then(() => {
						db("crm_storage")
							.insert({
								owner_id: req.user.id
							})
							.then((storageId) => {
								db("crm_storage_folders")
									.insert({
										owner_id: req.user.id,
										title: "Business Cards",
										storage_id: storageId[0]
									})
									.then(() => {
										db("crm_storage_folders_users")
											.insert({
												user_id: req.user.id,
												source_id: storageId[0]
											})
											.then(() => {
												db("crm_voicemail")
													.insert({
														owner_id: req.user.id
													})
													.then(() => {
														res.redirect("/onlineoffice/home")
													})
											})
									})
							})
					})
			} else {
				// flash message: please enter valid referrer_code
				res.redirect("back")
			}
		})
}

exports.home = (req, res) => {
	db("users")
		.innerJoin("profile", "users.id", "profile.user_id")
		.where("user_id", req.user.id)
		.then((userInfo) => {
			res.render("crm/crmHome", { currentUser: req.user, userInfo })
		})
}

exports.crmWall = (req, res) => {
	db("users")
		.innerJoin("profile", "users.id", "profile.user_id")
		.where("user_id", req.user.id)
		.then((userInfo) => {
			db("users")
				.where("id", req.params.user_id)
				.first()
				.then((wallUser) => {
					db("wall")
						.innerJoin("users", "wall.post_user_id", "users.id")
						.orderBy("post_id", "desc")
						.where({ user_id: req.params.user_id, app: "process_crm" })
						.then((posts) => {
							db("crm_wall_users")
								.innerJoin("users", "crm_wall_users.invited_id", "users.id")
								.where("user_id", req.params.user_id)
								.then((usersInWall) => {
									db("crm_wall_users")
										.innerJoin("users", "crm_wall_users.user_id", "users.id")
										.where("invited_id", req.user.id)
										.then((invitedWalls) => {
											var isLeader = false;
											if (req.params.user_id == req.user.id) {
												isLeader = true;
											}
											res.render("crm/wall", { currentUser: req.user, isLeader, userInfo, posts, wallUser, usersInWall, invitedWalls })
										})
								})
						})
				})
		})
}

exports.wallInvite = (req, res) => {
	db("users")
		.where("username", req.body.username)
		.first()
		.then((user) => {
			if (user) {
				db("crm_wall_users")
					.insert({
						user_id: req.params.user_id,
						invited_id: user.id
					})
					.then(() => {
						res.redirect("back")
					})
			} else {
				res.redirect("back")
			}
		})
}

exports.wallRemove = (req, res) => {
	db("crm_wall_users")
		.where({
			user_id: req.params.user_id,
			invited_id: req.body.user_id
		})
		.del()
		.then(() => {
			res.redirect("back")
		})
}

exports.postCrmWall = (req, res) => {
	if (req.body.post_text) {
		db("wall")
			.insert({
				user_id: req.params.user_id,
				post_user_id: req.user.id,
				post_text: req.body.post_text,
				date: new Date().today(),
				time: new Date().timeNow(),
				app: "process_crm"
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
								req.flash("success", "+1 points for you")
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
						user_id: req.params.user_id,
						post_user_id: req.user.id,
						post_media: fileName,
						date: new Date().today(),
						time: new Date().timeNow(),
						app: "process_crm"
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
			})
		})
	}
}

exports.editCrmWall = (req, res) => {
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

exports.deleteCrmWall = (req, res) => {
	db("wall")
		.where("post_id", req.params.post_id)
		.del()
		.then(() => {
			req.flash("error", "Successfully deleted post")
			res.redirect("back")
		})
}

exports.dashboardInvite = (req, res) => {
	db("users")
		.where("username", req.body.username)
		.first()
		.then((user) => {
			if (user) {
				if (req.user.id == user.id)
					res.redirect("back");

				db("crm_community_dashboard_invitations")
					.insert({
						owner_id: req.user.id,
						invitee_id: user.id,
					})
					.then(() => {
						res.redirect("back")
					})
			}
		})
}

exports.viewUserDashboard = (req, res) => {
	db("users")
		.innerJoin("profile", "users.id", "profile.user_id")
		.where("user_id", req.user.id)
		.then((userInfo) => {
			db("crm_tasks")
				.where("user_id", req.params.user_id)
				.then((tasks) => {
					db("crm_users_org")
						.innerJoin("crm_org", "crm_users_org.org_id", "crm_org.id")
						.where("user_id", req.params.user_id)
						.then((orgs) => {
							db("crm_contacts")
								.where("user_id", req.params.user_id)
								.then((contacts) => {
									db("crm_events")
										.where("user_id", req.params.user_id)
										.then((events) => {
											db("crm_pipelines")
												.select("*")
												.then((pipelines) => {
													db("crm_inbox")
														.innerJoin("users", "crm_inbox.sender_id", "users.id")
														.where("receiver_id", req.params.user_id)
														.then((messages) => {
															db("crm_community_tasks")
																.innerJoin("crm_community_users_tasks", "crm_community_tasks.id", "crm_community_users_tasks.task_id")
																.where("user_id", req.params.user_id)
																// .where("date", moment().format('YYYY-MM-DD'))
																.then((comTasks) => {
																	db('crm_community_dashboard_invitations')
																		.innerJoin("users", "crm_community_dashboard_invitations.owner_id", "users.id")
																		.where("invitee_id", req.user.id)
																		.then((dashboardInvitations) => {
																			db('crm_community_dashboard_invitations')
																				.innerJoin("users", "crm_community_dashboard_invitations.invitee_id", "users.id")
																				.where("owner_id", req.user.id)
																				.then((dashboardInvited) => {
																					console.log("message",messages)
																					res.render("crm/dashboardView", { currentUser: req.user, tasks, orgs, contacts, events, pipelines, messages, comTasks, userInfo, dashboardInvitations, dashboardInvited })
																				})
																		})
																})
														})
												})
										})
								})
						})
				})
		})
}

exports.dashboard = (req, res) => {
	db("users")
		.innerJoin("profile", "users.id", "profile.user_id")
		.where("user_id", req.user.id)
		.then((userInfo) => {
			db("crm_tasks")
				.where("user_id", req.user.id)
				.then((tasks) => {
					db("crm_users_org")
						.innerJoin("crm_org", "crm_users_org.org_id", "crm_org.id")
						.where("user_id", req.user.id)
						.then((orgs) => {
							db("crm_contacts")
								.where("user_id", req.user.id)
								.then((contacts) => {
									db("crm_events")
										.where("user_id", req.user.id)
										.then((events) => {
											db("crm_pipelines")
												.select("*")
												.then((pipelines) => {
													db("crm_inbox")
														.leftJoin("users", "crm_inbox.sender_id", "users.id")
														//.where("sender_id", req.user.id)
														.then((messages) => {
															db("crm_community_tasks")
																.innerJoin("crm_community_users_tasks", "crm_community_tasks.id", "crm_community_users_tasks.task_id")
																.where("user_id", req.user.id)
																// .where("date", moment().format('YYYY-MM-DD'))
																.then((comTasks) => {
																	db('crm_community_dashboard_invitations')
																		.innerJoin("users", "crm_community_dashboard_invitations.owner_id", "users.id")
																		.where("invitee_id", req.user.id)
																		.then((dashboardInvitations) => {
																			db('crm_community_dashboard_invitations')
																				.innerJoin("users", "crm_community_dashboard_invitations.invitee_id", "users.id")
																				.where("owner_id", req.user.id)
																				.then((dashboardInvited) => {
																					var isLeader = false;
																					if (req.params.user_id == req.user.id) {
																						isLeader = true;
																					}
																					let temp = [];
																					let temp2 = [];
																					comTasks.forEach(function (e) {
																						e.task_date = moment.utc(e.task_date).local().format('MM/DD/YYYY');
																						temp.push(e.name)
																						temp2.push(e.task_date)
																					})
																					var taskNames = temp.filter(function (ele, index, self) {
																						return self.indexOf(ele) === index
																					})
																					var taskDates = temp2.filter(function (ele, index, self) {
																						return self.indexOf(ele) === index
																					})
																					// taskNames.reverse();
																					taskDates.reverse();
																					// comTasks.reverse();
																					console.log("messages",messages)
																					res.render("crm/dashboard", { currentUser: req.user, tasks, orgs, contacts, events, pipelines, messages, comTasks, userInfo, dashboardInvitations, dashboardInvited })
																				})
																		})
																})
														})
												})
										})
								})
						})
				})
		})
}
exports.addTask = (req, res) => {
	db("crm_tasks")
		.insert({
			user_id: req.user.id,
			title: req.body.title,
			description: req.body.description,
			// date_time: new Date()
		})
		.then(() => {
			res.redirect("back")
		})
}
exports.deleteComTask = (req, res) => {
	const taskId = req.params.id; // Get the task ID from the URL parameters

	// Ensure `taskId` is an integer
	if (!Number.isInteger(Number(taskId))) {
		return res.status(400).json({ message: "Invalid task ID" });
	}

	// Delete the task from the database
	db("crm_community_tasks")
		.where("id", taskId)
		.del()
		.then((deletedRows) => {
			if (deletedRows > 0) {
				res.redirect("back")
			} else {
				res.status(404).json({ message: "Task not found" });
			}
		})
		.catch((err) => {
			console.error("Error deleting task:", err);
			res.status(500).json({ message: "An error occurred while deleting the task" });
		});
};

exports.deleteTask = (req, res) => {
	db("crm_tasks")
		.where("id", req.params.task_id)
		.del()
		.then(() => {
			res.redirect("back")
		})
}

exports.viewOrganization = (req, res) => {
	console.log(req.user.id);
	db("users")
		.innerJoin("profile", "users.id", "profile.user_id")
		.where("user_id", req.user.id)
		.then((userInfo) => {
			db("users")
				.innerJoin("profile", "users.id", "profile.user_id")
				.where("user_id", req.params.user_id)
				.then((viewUserInfo) => {
					db("crm_users_org")
						.innerJoin("crm_org", "crm_users_org.org_id", "crm_org.id")
						.innerJoin("users", "crm_users_org.user_id", "users.id")
						.where("user_id", req.params.user_id)
						.then((org) => {
							console.log(userInfo);
							res.render("crm/organizationView", { currentUser: req.user, org, userInfo, viewUserInfo })

						})
				})
		});



}

exports.organizationInvite = (req, res) => {
	db("users")
		.where("username", req.body.username)
		.first()
		.then((user) => {
			if (user) {
				if (req.user.id == user.id)
					res.redirect("back");

				db("crm_community_organization_invitations")
					.insert({
						owner_id: req.user.id,
						invitee_id: user.id,
					})
					.then(() => {
						res.redirect("back")
					})
			}
		})
}

exports.organization = (req, res) => {
	db("users")
		.innerJoin("profile", "users.id", "profile.user_id")
		.where("user_id", req.user.id)
		.then((userInfo) => {
			db("crm_users_org")
				.innerJoin("crm_org", "crm_users_org.org_id", "crm_org.id")
				.innerJoin("users", "crm_users_org.user_id", "users.id")
				.where("user_id", req.user.id)
				.then((org) => {
					db('crm_community_organization_invitations')
						.innerJoin("users", "crm_community_organization_invitations.owner_id", "users.id")
						.where("invitee_id", req.user.id)
						.then((organizationInvitations) => {
							db('crm_community_organization_invitations')
								.innerJoin("users", "crm_community_organization_invitations.invitee_id", "users.id")
								.where("owner_id", req.user.id)
								.then((organizationInvited) => {
									res.render("crm/organization", { currentUser: req.user, org, userInfo, organizationInvitations, organizationInvited })
								})
						})

				})
		})
}

exports.addToOrg = (req, res) => {
	db("crm_org")
		.insert({
			name: req.body.downline_name
		})
		.then((orgId) => {
			db("crm_users_org")
				.insert({
					org_id: orgId,
					user_id: req.user.id
				})
				.then(() => {
					res.redirect("back")
				})
		})
}
exports.deleteOrganization = (req, res) => {
    db("crm_org")
        .where("id", req.params.org_id)
        .del()
        .then(() => {
            res.redirect("back");
        })
        .catch((error) => {
            console.error("Error deleting organization:", error);
            res.status(500).send("Internal Server Error");
        });
};
exports.editOrg = (req, res) => {
	db("crm_org")
		.where("id", req.params.org_id)
		.update({
			name: req.body.downline_name
		})
		.then(() => {
			res.redirect("back")
		})
}

exports.contacts = (req, res) => {
	db("users")
		.innerJoin("profile", "users.id", "profile.user_id")
		.where("user_id", req.user.id)
		.then((userInfo) => {
			db("crm_contacts")
				.where("user_id", req.user.id)
				.then((contacts) => {
					res.render("crm/contact", { currentUser: req.user, contacts, userInfo });
				})
		})
}

exports.addContact = (req, res) => {
	db("crm_contacts")
		.insert({
			user_id: req.user.id,
			name: req.body.name,
			email: req.body.email,
			phone: req.body.phone,
			company_name: req.body.company["name"],
			company_title: req.body.company["title"],
			address_street: req.body.address["street"],
			address_city: req.body.address["city"],
			address_state: req.body.address["state"],
			address_zip: req.body.address["zip"],
			address_country: req.body.address["country"],
			website: req.body.website,
			birthday: req.body.birthday,
			background_info: req.body.background_info,
			status: req.body.status,
			priority: req.body.priority
		})
		.then(() => {
			res.redirect("back")
		})
}

exports.editStatus = (req, res) => {
	db("crm_contacts")
		.where("name", req.query.name)
		.update({
			status: req.query.status
		})
		.then(() => { })
}

exports.contactPage = (req, res) => {
	var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

	var now = new Date();

	var day = days[now.getDay()];
	var month = months[now.getMonth()];
	var currentDate = day + ", " + month;
	db("users")
		.innerJoin("profile", "users.id", "profile.user_id")
		.where("user_id", req.user.id)
		.then((userInfo) => {
			db("crm_contacts")
				.where("id", req.params.id)
				.first()
				.then((contact) => {
					res.render("crm/eachContact", { currentUser: req.user, currentDate: currentDate, contact, userInfo });
				})
		})
}

exports.deleteContact = (req, res) => {
	db("crm_contacts")
		.where("id", req.params.id)
		.del()
		.then(() => {
			res.redirect('back');
		})
}

exports.calendar = (req, res) => {
  db("users")
    .innerJoin("profile", "users.id", "profile.user_id")
    .where("user_id", req.user.id)
    .then((userInfo) => {
      db("crm_events")
        .where("user_id", req.user.id)
        .orderBy("start_time", "asc") // Order by start_time in ascending order
        .then((events) => {
          db("crm_community_tasks")
            .innerJoin("crm_community_users_tasks", "crm_community_tasks.id", "crm_community_users_tasks.task_id")
            .where("user_id", req.params.user_id)
            .then((comTasks) => {
              db("crm_calendar_users")
                .innerJoin("users", "crm_calendar_users.invited_id", "users.id")
                .where("user_id", req.params.user_id)
                .then((usersInCalendar) => {
                  db("users")
                    .where("id", req.params.user_id)
                    .first()
                    .then((calendarOwner) => {
                      db("crm_calendar_users")
                        .innerJoin("users", "crm_calendar_users.user_id", "users.id")
                        .where("invited_id", req.user.id)
                        .then((invitedCalendars) => {
                          var isLeader = false;
                          if (req.params.user_id == req.user.id) {
                            isLeader = true;
                          }
                          res.render("crm/calendar", {
                            currentUser: req.user,
                            events,
                            isLeader,
                            comTasks,
                            usersInCalendar,
                            calendarOwner,
                            invitedCalendars,
                            userInfo,
                          });
                        });
                    });
                });
            });
        });
    });
};


exports.calendarInvite = (req, res) => {
	db("users")
		.where("username", req.body.username)
		.first()
		.then((user) => {
			if (user) {
				db("crm_calendar_users")
					.insert({
						user_id: req.params.user_id,
						invited_id: user.id
					})
					.then(() => {
						res.redirect("back")
					})
			} else {
				res.redirect("back")
			}
		})
}

exports.calendarRemove = (req, res) => {
	db("crm_calendar_users")
		.where({
			user_id: req.params.user_id,
			invited_id: req.body.user_id
		})
		.del()
		.then(() => {
			res.redirect("back")
		})
}

exports.completeComTask = (req, res) => {
	db("crm_community_users_tasks")
		.where("user_tasks_id", req.query.taskId)
		.update({
			completed: req.query.taskStatus
		})
		.then((result) => {
			res.json({ 'result': result })
		})
}

exports.inviteUserToTaskGrid = (req, res) => {
	db("users")
		.where("username", req.body.username)
		.first()
		.then((user) => {
			if (user) {
				if (req.user.id == user.id)
					res.redirect("back");

				db("crm_community_tasks_invitations")
					.insert({
						owner_id: req.user.id,
						invitee_id: user.id,
					})
					.then(() => {
						res.redirect("back")
					})
			}
		})
}

exports.addEvent = (req, res) => {
	db("crm_events")
		.insert({
			user_id: req.user.id,
			title: req.body.title,
			description: req.body.description,
			date: req.body.date_selected,
			start_time: req.body.start_time,
			end_time: req.body.end_time
		})
		.then(() => {
			res.redirect("back")
		})
}

exports.deleteEvent = (req, res) => {
	db("crm_events")
		.where("id", req.params.event_id)
		.del()
		.then(() => {
			res.redirect("back")
		})
}


function getDays(range) {
	// var filterDate = moment().format('YYYY-MM-DD');
	var days = 0;
	var daysArr = [];
	if (range === '1') {
		days = 0;
	} else if (range === '2') {
		days = 7;
	} else if (range === '3') {
		days = 30;
	} else if (range === '4') {
		days = 60;
	} else if (range === '5') {
		days = 90;
	} else if (range === '6') {
		days = 365;
	}

	tempDate = moment()
	daysArr.push(tempDate.format('MM/DD/YYYY'));
	for (var i = 0; i < days; i++) {
		date = tempDate.subtract(1, 'days');
		daysArr.push(date.format('MM/DD/YYYY'));
		tempDate = date;
	}

	return daysArr;
}

function getRangeDate(rangeType) {
	var filterDate = moment().format('YYYY-MM-DD');
	if (rangeType === '1') {
		var filterDate = moment().format('YYYY-MM-DD');
	} else if (rangeType === '2') {
		var filterDate = moment().subtract(7 - 1, 'days').format('YYYY-MM-DD');
	} else if (rangeType === '3') {
		var filterDate = moment().subtract(30 - 1, 'days').format('YYYY-MM-DD');
	} else if (rangeType === '4') {
		var filterDate = moment().subtract(60 - 1, 'days').format('YYYY-MM-DD');
	} else if (rangeType === '5') {
		var filterDate = moment().subtract(90 - 1, 'days').format('YYYY-MM-DD');
	} else if (rangeType === '6') {
		var filterDate = moment().subtract(365 - 1, 'days').format('YYYY-MM-DD');
	}
	return filterDate;
}

exports.duplicateTask = (req, res) => {
	var obj = {}
	db("crm_community_tasks")
		.then((tasks) => {
			tasks.forEach(function (task) {
				db("users")
					.then((users) => {
						users.forEach(function (user) {
							db("crm_community_users_tasks")
								.insert({
									user_id: user.id,
									task_id: task.id,
									task_date: "2022-10-19"
								})
								.then(() => {
									// next()
								})
						})
					})
			})
			console.log("new tasks created")
		})
}

exports.comTasksFilter = (req, res) => {
	var filter = req.query.filter;

	var filteredDays = getDays(filter)
	var filterDate = getRangeDate(filter);

	db("users")
		.innerJoin("profile", "users.id", "profile.user_id")
		.where("user_id", req.user.id)
		.then((userInfo) => {
			db("crm_community_tasks")
				.innerJoin("crm_community_users_tasks", "crm_community_tasks.id", "crm_community_users_tasks.task_id")
				.where("user_id", req.params.user_id)
				.andWhere('task_date', '>=', filterDate)
				.then((comTasks) => {
					db("crm_calendar_users")
						.innerJoin("users", "crm_calendar_users.invited_id", "users.id")
						.where("user_id", req.params.user_id)
						.then((usersInCalendar) => {
							db("users")
								.where("id", req.params.user_id)
								.first()
								.then((calendarOwner) => {
									db("crm_calendar_users")
										.innerJoin("users", "crm_calendar_users.user_id", "users.id")
										.where("invited_id", req.user.id)
										.then((invitedCalendars) => {
											var isLeader = false;
											if (req.params.user_id == req.user.id) {
												isLeader = true;
											}
											let temp = [];
											let temp2 = [];
											// console.log(comTasks)
											comTasks.forEach(function (e) {
												e.task_date = moment.utc(e.task_date).local().format('MM/DD/YYYY');
												temp.push(e.name)
												temp2.push(e.task_date)
											})
											var taskNames = temp.filter(function (ele, index, self) {
												return self.indexOf(ele) === index
											})
											var taskDates = temp2.filter(function (ele, index, self) {
												return self.indexOf(ele) === index
											})
											// taskNames.reverse();
											taskDates.reverse();
											// comTasks.reverse();
											res.render("crm/crm-partials/comTasksTable", { currentUser: req.user, isLeader, comTasks, usersInCalendar, calendarOwner, invitedCalendars, taskNames, taskDates, userInfo, filteredDays })
										})
								})
						})
				})
		})
}

exports.comTasks = (req, res) => {
	var filter = '2';
	var filteredDays = getDays(filter)
	var filterDate = getRangeDate(filter);
	db("users")
		.innerJoin("profile", "users.id", "profile.user_id")
		.where("user_id", req.user.id)
		.then((userInfo) => {
			db("crm_community_tasks")
				.innerJoin("crm_community_users_tasks", "crm_community_tasks.id", "crm_community_users_tasks.task_id")
				.where("user_id", req.params.user_id)
				.andWhere('task_date', '>=', filterDate)
				.then((comTasks) => {
					db("crm_calendar_users")
						.innerJoin("users", "crm_calendar_users.invited_id", "users.id")
						.where("user_id", req.params.user_id)
						.then((usersInCalendar) => {
							db("users")
								.where("id", req.params.user_id)
								.first()
								.then((calendarOwner) => {
									db("crm_calendar_users")
										.innerJoin("users", "crm_calendar_users.user_id", "users.id")
										.where("invited_id", req.user.id)
										.then((invitedCalendars) => {
											db('crm_community_tasks_invitations')
												.innerJoin("users", "crm_community_tasks_invitations.owner_id", "users.id")
												.where("invitee_id", req.user.id)
												.then((taskGridInvitations) => {
													db('crm_community_tasks_invitations')
														.innerJoin("users", "crm_community_tasks_invitations.invitee_id", "users.id")
														.where("owner_id", req.user.id)
														.then((taskGridInvited) => {
															var isLeader = false;
															if (req.params.user_id == req.user.id) {
																isLeader = true;
															}
															let temp = [];
															let temp2 = [];
															comTasks.forEach(function (e) {
																e.task_date = moment.utc(e.task_date).local().format('MM/DD/YYYY');
																temp.push(e.name)
																temp2.push(e.task_date)
															})
															var taskNames = temp.filter(function (ele, index, self) {
																return self.indexOf(ele) === index
															})
															var taskDates = temp2.filter(function (ele, index, self) {
																return self.indexOf(ele) === index
															})
															// taskNames.reverse();
															taskDates.reverse();
															// comTasks.reverse();
															res.render("crm/comTasks", { currentUser: req.user, isLeader, comTasks, usersInCalendar, calendarOwner, invitedCalendars, taskNames, taskDates, userInfo, filteredDays, taskGridInvitations, taskGridInvited })
														})
												})
										})
								})
						})
				})
		})
}

exports.viewComTasks = (req, res) => {
	var filter = '2';
	var filteredDays = getDays(filter)
	var filterDate = getRangeDate(filter);
	db('crm_community_tasks_invitations')
		.innerJoin("users", "crm_community_tasks_invitations.invitee_id", "users.id")
		.where("invitee_id", req.user.id)
		.where('owner_id', req.params.user_id)
		.then((taskGridInvitations) => {
			if (!taskGridInvitations.length) {
				res.redirect('back'); return;
			}

			db("users")
				.innerJoin("profile", "users.id", "profile.user_id")
				.where("user_id", req.user.id)
				.then((userInfo) => {
					db("crm_community_tasks")
						.innerJoin("crm_community_users_tasks", "crm_community_tasks.id", "crm_community_users_tasks.task_id")
						.where("user_id", req.params.user_id)
						.andWhere('task_date', '>=', filterDate)
						.then((comTasks) => {
							db("crm_calendar_users")
								.innerJoin("users", "crm_calendar_users.invited_id", "users.id")
								.where("user_id", req.params.user_id)
								.then((usersInCalendar) => {
									db("users")
										.where("id", req.params.user_id)
										.first()
										.then((calendarOwner) => {
											db("crm_calendar_users")
												.innerJoin("users", "crm_calendar_users.user_id", "users.id")
												.where("invited_id", req.user.id)
												.then((invitedCalendars) => {
													var isLeader = false;
													if (req.params.user_id == req.user.id) {
														isLeader = true;
													}
													let temp = [];
													let temp2 = [];
													comTasks.forEach(function (e) {
														e.task_date = moment.utc(e.task_date).local().format('MM/DD/YYYY');
														temp.push(e.name)
														temp2.push(e.task_date)
													})
													var taskNames = temp.filter(function (ele, index, self) {
														return self.indexOf(ele) === index
													})
													var taskDates = temp2.filter(function (ele, index, self) {
														return self.indexOf(ele) === index
													})
													// taskNames.reverse();
													taskDates.reverse();
													// comTasks.reverse();
													res.render("crm/comTasksView", { currentUser: req.user, isLeader, comTasks, usersInCalendar, calendarOwner, invitedCalendars, taskNames, taskDates, userInfo, filteredDays })
												})
										})
								})
						})
				})
		});


}

exports.projects = (req, res) => {
    // Fetch user info
    db("users")
        .innerJoin("profile", "users.id", "profile.user_id")
        .where("user_id", req.user.id)
        .then((userInfo) => {
            // Fetch projects for the current user
            db("crm_users_projects")
                .innerJoin("users", "crm_users_projects.user_id", "users.id")
                .innerJoin("crm_projects", "crm_users_projects.project_id", "crm_projects.id")
                .where("crm_users_projects.user_id", req.user.id)
                .then((projects) => {
                    // Fetch pipelines grouped by project ID, including project title
                    db("crm_pipelines")
                        .select("crm_pipelines.project_id", "crm_pipelines.id AS pipeline_id", "crm_pipelines.title AS pipeline_name", "crm_projects.title AS project_title") // Include project title here
                        .innerJoin("crm_projects", "crm_pipelines.project_id", "crm_projects.id")  // Join with crm_projects to get the project title
                        .then((pipelines) => {
                            // Prepare pipelines response grouped by project ID, include project title
                            const groupedPipelines = pipelines.reduce((acc, pipeline) => {
                                if (!acc[pipeline.project_id]) {
                                    acc[pipeline.project_id] = {
                                        project_title: pipeline.project_title,
                                        pipelines: []
                                    };
                                }
                                acc[pipeline.project_id].pipelines.push({
                                    pipeline_id: pipeline.pipeline_id,
                                    pipeline_name: pipeline.pipeline_name
                                });
                                return acc;
                            }, {});
							console.log("groupedPipelines", JSON.stringify(groupedPipelines, null, 2));
                            // Send response with both projects and pipelines
                            res.render("crm/project", {
                                currentUser: req.user,
                                projects,
                                pipelines: groupedPipelines,
                                userInfo
                            });
                        })
                        .catch((error) => {
                            console.error("Error fetching pipelines:", error);
                            res.status(500).send("Error fetching pipelines.");
                        });
                })
                .catch((error) => {
                    console.error("Error fetching projects:", error);
                    res.status(500).send("Error fetching projects.");
                });
        })
        .catch((error) => {
            console.error("Error fetching user info:", error);
            res.status(500).send("Error fetching user information.");
        });
};

exports.renameProject = (req, res) => {
    const { projectId } = req.params; // Extract projectId from route parameters
    const { title: newTitle } = req.body; // Extract the new title from the request body
console.log("projectId", projectId);
console.log("newTitle", newTitle);
    if (!projectId || !newTitle) {
        return res.status(400).json({ error: "Project ID and new title are required." });
    }

    db("crm_projects")
        .where("id", projectId)
        .update({ title: newTitle })
        .then((updatedCount) => {
            if (updatedCount) {
				res.redirect("back")
            } else {
                res.status(404).json({ error: "Project not found." });
            }
        })
        .catch((error) => {
            console.error("Error renaming project:", error);
            res.status(500).json({ error: "An error occurred while renaming the project." });
        });
};


exports.createProject = (req, res) => {
    db("crm_projects")
        .insert({
            leader_id: req.user.id,
            title: req.body.title,
            parent_project_id: req.body.parent_project_id || null
        })
        .then((newProjectId) => {
            db("crm_users_projects")
                .insert({
                    user_id: req.user.id,
                    project_id: newProjectId[0]
                })
                .then(() => {
                    res.redirect("back")
                })
        })
        .catch((error) => {
            console.error("Error:", error);
            res.status(500).send("Server Error");
        });
}

exports.projectPage = (req, res) => {
	db("users")
		.innerJoin("profile", "users.id", "profile.user_id")
		.where("user_id", req.user.id)
		.then((userInfo) => {
			// Fetch project details
			db("crm_users_projects")
				.innerJoin("users", "crm_users_projects.user_id", "users.id")
				.innerJoin("crm_projects", "crm_users_projects.project_id", "crm_projects.id")
				.where("project_id", req.params.project_id)
				.then((projects) => {
					let isSubLeader;
					let isLeader = false;
					let currentUserIsLeader = false;

					// Determine the user's role in the project
					projects.forEach((project) => {
						if (project.user_id === req.user.id) {
							isSubLeader = project.is_sub_leader;
							if (project.user_id === project.leader_id) {
								isLeader = true;
							}
							if (project.leader_id === req.user.id) {
								currentUserIsLeader = true;
							}
						}
					});

					// Fetch pipelines related to the project
					db("crm_pipelines")
						.where("project_id", req.params.project_id)
						.then((pipelines) => {
							// Fetch child projects (projects linked to this project)
							console.log("pipelines", pipelines);
							db("crm_projects")
								.where("parent_project_id", req.params.project_id)
								.then((childProjects) => {
									console.log("childProjects", childProjects);
									// Fetch all projects for context
									db("crm_projects")
										.then((allProjects) => {
											// Render the project page with the fetched data
											res.render("crm/eachProject", {
												currentUser: req.user,
												isLeader,
												isSubLeader,
												currentUserIsLeader,
												projects,
												pipelines,
												childProjects: childProjects || [],
												allProjects: allProjects || [],
												userInfo
											});
										});
								});
						});
				});
		})
		.catch((err) => {
			console.error("Error:", err);
			res.status(500).send("Internal Server Error");
		});
};


exports.editUserProjectLevel = (req, res) => {
	db("crm_users_projects")
		.innerJoin("users", "crm_users_projects.user_id", "users.id")
		.where({
			username: req.query.username,
			project_id: req.query.projectId
		})
		.update({
			is_sub_leader: req.query.status
		})
		.then(() => { })
}

exports.deleteProject = (req, res) => {
	db("crm_projects")
		.where("id", req.params.project_id)
		.del()
		.then(() => {
			db("crm_users_projects")
				.where("project_id", req.params.project_id)
				.del()
				.then(() => {
					res.redirect("/onlineoffice/projects")
				})
		})
}

exports.projectInviteUser = (req, res) => {
	db("users")
		.where("username", req.body.username)
		.first()
		.then((user) => {
			if (user) {
				db("crm_users_projects")
					.insert({
						user_id: user.id,
						project_id: req.params.project_id
					})
					.then(() => {
						res.redirect("back")
					})
			}
		})
}

exports.projectRemoveUser = (req, res) => {
	db("crm_users_projects")
		.where({ user_id: req.body.user_id, project_id: req.params.project_id })
		.del()
		.then(() => {
			res.redirect("back")
		})
}

exports.createPipeline = (req, res) => {
	db("crm_pipelines")
		.insert({
			title: req.body.title,
			project_id: req.params.project_id
		})
		.then(() => {
			res.redirect("back")
		})
}
exports.renamePipeline = (req, res) => {
	// Get projectId and pipelineId from URL parameters (req.params) and newTitle from the body
	const { projectId, pipelineId } = req.params;  // Using req.params for projectId and pipelineId
	const { title } = req.body;  // newTitle comes from the form body
  
	console.log(req.body);  // Log body to ensure it contains newTitle
	console.log(req.params);  // Log params to ensure it contains projectId and pipelineId
  
	// Validate that we have all necessary data
	if (!projectId || !pipelineId || !title) {
	  return res.status(400).json({ error: "Project ID, Pipeline ID, and new title are required." });
	}
  
	// Update the pipeline in the database
	db("crm_pipelines")
	  .where("id", pipelineId)
	  .andWhere("project_id", projectId)
	  .update({ title: title })
	  .then((updatedCount) => {
		if (updatedCount) {
		 
		  res.redirect("back");
		} else {
	
		  res.redirect('/onlineoffice/project/' + projectId);
		}
	  })
	  .catch((error) => {
		
		res.redirect('/onlineoffice/project/' + projectId);
	  });
  };
  
exports.pipelinePage = (req, res) => {
	console.log("rew",req.user.id)
    db("users")
        .innerJoin("profile", "users.id", "profile.user_id")
        .where("user_id", req.user.id)
        .then((userInfo) => {
            db("crm_users_projects")
                .innerJoin("users", "crm_users_projects.user_id", "users.id")
                .innerJoin("crm_projects", "crm_users_projects.project_id", "crm_projects.id")
                .where("project_id", req.params.project_id)
                .then((projects) => {
                    db("crm_pipelines")
                        .where("id", req.params.pipeline_id)
                        .then((pipeline) => {
							console.log("pipeline",pipeline);
                            db("crm_users_candidates")
                                .innerJoin("crm_candidates", "crm_users_candidates.candidate_id", "crm_candidates.id")
                                .innerJoin("users", "crm_users_candidates.user_id", "users.id")
                                .where("pipeline_id", req.params.pipeline_id)
                                .then((candidates) => {
                                    // Fetch all projects associated with the current user
                                    db("crm_projects")
                                        .innerJoin("crm_users_projects", "crm_projects.id", "crm_users_projects.project_id")
                                        .where("crm_users_projects.user_id", req.user.id) // Filter by current user
                                        .then((allProjects) => {
                                            res.render("crm/eachPipeline", { 
                                                currentUser: req.user, 
                                                pipeline, 
                                                projects, // Projects related to this pipeline
                                                allProjects, // All available projects for this user
                                                candidates, 
                                                userInfo 
                                            });
                                        });
                                });
                        });
                });
        });
};



exports.addTaskPipeline = (req, res) => {
	db("crm_tasks")
		.insert({
			pipeline_id: req.params.pipeline_id,
			user_id: req.user.id,
			title: req.body.title,
			description: req.body.description,
			date_time: new Date()
		})
		.then(() => {
			res.redirect("back")
		})
}

exports.addPostPipeline = (req, res) => {
	db("crm_posts")
		.insert({
			pipeline_id: req.params.pipeline_id,
			user_id: req.user.id,
			post: req.body.post,
			date_time: new Date()
		})
		.then(() => {
			res.redirect("back")
		})
}

exports.deletePostPipeline = (req, res) => {
	db("crm_posts")
		.where("post_id", req.params.post_id)
		.del()
		.then(() => {
			res.redirect("back")
		})
}

exports.deletePipeline = (req, res) => {
    db("crm_pipelines")
        .where("id", req.params.pipeline_id)
        .del()
        .then(() => {
            const referer = req.get('Referer');
            if (referer && referer.includes('/onlineoffice/dashboard')) {
                res.redirect('back');
            } else {
                var redirect = "/onlineoffice/project/" + req.params.project_id;
                res.redirect(redirect);
            }
        })
        .catch((error) => {
            console.error("Error deleting pipeline:", error);
            res.status(500).send("Internal Server Error");
        });
}

exports.createCandidate = (req, res) => {
	var dateTime = new Date().today() + " " + new Date().timeNow();
	console.log("excuted")
	db("crm_candidates")
		.insert({
			title: req.body.title,
			pipeline_id: req.params.pipeline_id,
			leader_id: req.user.id,
			created_at: dateTime
		})
		.then((candidateId) => {
			db("crm_users_candidates")
				.insert({
					user_id: req.user.id,
					candidate_id: candidateId
				})
				.then(() => {
					res.redirect("back")
				})
		})
}
exports.renameCandidate = (req, res) => {
    const { candidate_id } = req.params;
    const { newTitle } = req.body;

    if (!candidate_id || !newTitle) {
        return res.status(400).json({ error: "Candidate ID and new title are required." });
    }

    db("crm_candidates")
        .where("id", candidate_id)
        .update({ title: newTitle })
        .then((updatedCount) => {
            if (updatedCount) {
                req.flash('message', 'Candidate title updated successfully.');
                req.flash('type', 'success');
                res.redirect("back");
            } else {
                req.flash('message', 'Candidate not found.');
                req.flash('type', 'error');
                res.redirect('back');
            }
        })
        .catch((error) => {
            console.error("Error renaming candidate:", error);
            req.flash('message', 'An error occurred while renaming the candidate.');
            req.flash('type', 'error');
            res.redirect('back');
        });
};
function formatDateTime(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
} 
exports.candidatePage = (req, res) => {
    db("users")
        .innerJoin("profile", "users.id", "profile.user_id")
        .where("user_id", req.user.id)
        .then((userInfo) => {
            db("crm_users_projects")
                .innerJoin("users", "crm_users_projects.user_id", "users.id")
                .innerJoin("crm_projects", "crm_users_projects.project_id", "crm_projects.id")
                .where("project_id", req.params.project_id)
                .then((projects) => {
                    db("crm_pipelines")
                        .where("project_id", req.params.project_id)
                        .then((pipelines) => {
                            db("crm_users_candidates")
                                .innerJoin("users", "crm_users_candidates.user_id", "users.id")
                                .innerJoin("crm_candidates", "crm_users_candidates.candidate_id", "crm_candidates.id")
                                .where("candidate_id", req.params.candidate_id)
                                .then((candidate) => {
                                    db("users")
                                        .innerJoin("crm_posts", "users.id", "crm_posts.user_id")
                                        .where("candidate_id", req.params.candidate_id)
                                        .orderBy("date_time", "desc") // Sort notes by date_time in ascending order
                                        .then((notes) => {
                                            notes.forEach(note => {
                                                note.date_time = formatDateTime(new Date(note.date_time));
                                            });
                                            db("crm_uploads")
                                                .where("candidate_id", req.params.candidate_id)
                                                .then((uploads) => {
                                                    console.log("notes", notes);
                                                    res.render("crm/eachCandidate", { currentUser: req.user, pipelines, candidate, projectId: req.params.project_id, notes, uploads, userInfo });
                                                });
                                        });
                                });
                        });
                });
        });
};

exports.addNoteCandidate = (req, res) => {
    var m = new Date();
    var dateTime = formatDateTime(m);
    console.log("date", dateTime);
    db("crm_posts")
        .insert({
            candidate_id: req.params.candidate_id,
            user_id: req.user.id,
            post: req.body.note,
            date_time: dateTime
        })
        .then(() => {
            res.redirect("back");
        });
};

exports.candidateInviteUser = (req, res) => {
	db("users")
		.where("username", req.body.username)
		.first()
		.then((user) => {
			if (user) {
				db("crm_users_candidates")
					.insert({
						user_id: user.id,
						candidate_id: req.params.candidate_id
					})
					.then(() => {
						db("crm_users_candidates")
							.where({ user_id: user.id, candidate_id: req.params.candidate_id })
							.first()
							.then((match) => {
								if (match) {
									res.redirect("back")
								}
							})
					})
			}
		})
}

exports.candidateRemoveUser = (req, res) => {
	db("crm_users_candidates")
		.where({ user_id: req.body.user_id, candidate_id: req.params.candidate_id })
		.del()
		.then(() => {
			res.redirect("back")
		})
}
exports.deleteNoteCandidate = (req, res) => {
	console.log("nice one",req.params)
	db("crm_posts")
		.where("id", req.params.note_id)
		.del()
		.then(() => {
			res.redirect("back")
		})
}

exports.uploadFileCandidate = (req, res) => {
	var fstream;
	req.pipe(req.busboy);
	req.busboy.on("file", (fieldName, file, fileName) => {
		console.log("Uploading: " + fileName);
		fstream = fs.createWriteStream("./public/crm/uploads/" + fileName);
		file.pipe(fstream);
		fstream.on("close", () => {
			db("crm_uploads")
				.insert({
					candidate_id: req.params.candidate_id,
					file_name: fileName
				})
				.then(() => {
					res.redirect("back");
				})
		})
	})
}

exports.deleteCandidate = (req, res) => {
	db("crm_candidates")
		.where("id", req.params.candidate_id)
		.del()
		.then((result) => {
			db("crm_users_candidates")
				.where("candidate_id", req.params.candidate_id)
				.del()
				.then(() => {
					var redirect = "/onlineoffice/project/" + req.params.project_id + "/pipeline/" + req.params.pipeline_id
					res.redirect(redirect)
				})
		})
}

exports.moveCandidate = (req, res) => {
	// db("crm_pipelines")
	// 	.where("title", req.body.pipeline_id)
	// 	.first()
	// 	.then((pipeline) => {
	// 		db("crm_candidates")
	// 			.where("id", req.params.candidate_id)
	// 			.update({
	// 				pipeline_id: pipeline_id
	// 			})
	// 			.then((c) => {
	// 				res.redirect("back")
	// 			})
	// 	})
	db("crm_candidates")
		.where("id", req.params.candidate_id)
		.update({
			pipeline_id: req.body.pipeline_id
		})
		.then((c) => {
			res.redirect("back")
		})
}

exports.aboutCandidate = (req, res) => {
	db("crm_candidates")
		.where("id", req.params.candidate_id)
		.update({
			ca1: req.body.ca1,
			ca2: req.body.ca2,
			ca3: req.body.ca3,
			ca4: req.body.ca4,
			ca5: req.body.ca5,
			ca6: req.body.ca6,
			ca7: req.body.ca7,
			ca8: req.body.ca8,
			ca9: req.body.ca9,
			ca10: req.body.ca10
		})
		.then(() =>
			res.redirect("back")
		)
}


exports.inbox = (req, res) => {
	db("users")
		.innerJoin("profile", "users.id", "profile.user_id")
		.where("user_id", req.user.id)
		.then((userInfo) => {
			db("crm_inbox")
				.innerJoin("users", "crm_inbox.receiver_id", "users.id")
				.leftJoin(
					db('users')
						.select(db.raw('username as sender_username'), 'id').as('x'),
					'x.id',
					'crm_inbox.sender_id'
				)
				.where("receiver_id", req.user.id)
				.then((inbox) => {
					db("crm_inbox")
						.innerJoin("users", "crm_inbox.sender_id", "users.id")
						.leftJoin(
							db('users')
								.select(db.raw('username as receiver_username'), 'id').as('x'),
							'x.id',
							'crm_inbox.receiver_id'
						)
						.where("sender_id", req.user.id)
						.then((sentMessages) => {
							inbox.reverse();
							sentMessages.reverse();
							res.render("crm/inbox", { currentUser: req.user, inbox, sentMessages, userInfo })
						})
				})
		})
}

exports.sendMessage = (req, res) => {
	var fstream;
	req.pipe(req.busboy);

	let formData = new Map();
	req.busboy.on('field', function (fieldname, val) {
		formData.set(fieldname, val);
	});

	req.busboy.on("file", (fieldName, file, fileName) => {
		var username = formData.get('to_username');
		var subject = formData.get('subject');
		var message = formData.get('message');
		var fileAttachment = formData.get('file');
		if (fileName.length > 0) {
			console.log("Uploading: " + fileName);
			fstream = fs.createWriteStream("./public/inbox/" + fileName);
			file.pipe(fstream);
			fstream.on("close", () => {
				db("users")
					.where("username", username)
					.first()
					.then((user) => {
						if (user) {
							db("crm_inbox")
								.insert({
									sender_id: req.user.id,
									receiver_id: user.id,
									subject: subject,
									message: message,
									attachment: fileName
								})
								.then(() => {
									res.redirect("back")
								})
						} else {
							// flash message: user doesn't exist
							res.redirect("back")
						}
					})
			})
		} else {
			db("users")
				.where("username", username)
				.first()
				.then((user) => {
					if (user) {
						db("crm_inbox")
							.insert({
								sender_id: req.user.id,
								receiver_id: user.id,
								subject: subject,
								message: message,
								attachment: fileName
							})
							.then(() => {
								res.redirect("back")
							})
					} else {
						// flash message: user doesn't exist
						res.redirect("back")
					}
				})
		}
	})
}

exports.deleteMessage = (req, res) => {
	db("crm_inbox")
		.where("message_id", req.params.message_id)
		.del()
		.then(() => {
			res.redirect("back")
		})
}



exports.viewWhiteboard = (req, res) => {
	db("users")
		.innerJoin("profile", "users.id", "profile.user_id")
		.where("user_id", req.user.id)
		.then((userInfo) => {
			db('crm_community_whiteboard_invitations')
				.innerJoin("users", "crm_community_whiteboard_invitations.owner_id", "users.id")
				.where("invitee_id", req.user.id)
				.then((whiteboardInvitations) => {
					db('crm_community_whiteboard_invitations')
						.innerJoin("users", "crm_community_whiteboard_invitations.invitee_id", "users.id")
						.where("owner_id", req.user.id)
						.then((whiteboardInvited) => {
							res.render("crm/whiteboard", { userInfo, whiteboardInvitations, whiteboardInvited })
						})
				})
		})
}

exports.whiteboardInvite = (req, res) => {
	db("users")
		.where("username", req.body.username)
		.first()
		.then((user) => {
			if (user) {
				if (req.user.id == user.id)
					res.redirect("back");

				db("crm_community_whiteboard_invitations")
					.insert({
						owner_id: req.user.id,
						invitee_id: user.id,
					})
					.then(() => {
						res.redirect("back")
					})
			}
		})
}

exports.crmWhiteboard = (req, res) => {
	db("users")
		.innerJoin("profile", "users.id", "profile.user_id")
		.where("user_id", req.user.id)
		.then((userInfo) => {
			db('crm_community_whiteboard_invitations')
				.innerJoin("users", "crm_community_whiteboard_invitations.owner_id", "users.id")
				.where("invitee_id", req.user.id)
				.then((whiteboardInvitations) => {
					db('crm_community_whiteboard_invitations')
						.innerJoin("users", "crm_community_whiteboard_invitations.invitee_id", "users.id")
						.where("owner_id", req.user.id)
						.then((whiteboardInvited) => {
							res.render("crm/whiteboard", { userInfo, whiteboardInvitations, whiteboardInvited })
						})
				})

		})
}

exports.crmSettings = (req, res) => {
	db("users")
		.innerJoin("profile", "users.id", "profile.user_id")
		.where("user_id", req.user.id)
		.then((userInfo) => {
			res.render("crm/setting", { userInfo })
		})
}

exports.crmInvite = (req, res, next) => {
	db("users")
		.where("username", req.body.username)
		.first()
		.then((user) => {
			let defaultMsg = `You've been invited to join the Online Office CRM!\n\nApp Code: 4\n${req.user.username}'s User Code: ${req.user.user_code}\n\n`
			if (user) {
				db("inbox")
					.insert({
						owner_id: user.id,
						sender_id: req.user.id,
						message: defaultMsg + req.body.message,
						date: moment().format('YYYY-MM-DD'),
						time: moment().format('YYYY-MM-DD hh:mm:ss')
					})
					.then(() => {
						req.flash("success", "Message successfully sent")
						res.redirect("back")
					}
					)
			} else {
				req.flash("error", "Username doesn't exist")
				res.redirect("back");
			}
		})
}


exports.storageHome = (req, res, next) => {
	db("users")
		.innerJoin("profile", "users.id", "profile.user_id")
		.where("user_id", req.user.id)
		.then((userInfo) => {
			db("crm_storage")
				.innerJoin("users", "crm_storage.owner_id", "users.id")
				.leftJoin("crm_storage_files", "crm_storage.storage_id", "crm_storage_files.source_id")
				.where("owner_id", req.params.user_id)
				.then((storageInfo) => {
					db("crm_storage_users_storage")
						.innerJoin("users", "crm_storage_users_storage.user_id", "users.id")
						.innerJoin("crm_storage", "crm_storage_users_storage.source_id", "crm_storage.storage_id")
						.where("owner_id", req.params.user_id)
						.then((usersInStorage) => {
							db("crm_storage")
								.innerJoin("users", "crm_storage.owner_id", "users.id")
								.innerJoin("crm_storage_users_storage", "crm_storage.storage_id", "crm_storage_users_storage.source_id")
								.where("user_id", req.user.id)
								.then((invitedStorages) => {
									var isLeader = false;
									if (req.params.user_id == req.user.id) {
										isLeader = true;
									}
									if (storageInfo.length > 0) {
										db("crm_storage_folders")
											.leftJoin("crm_storage_folders_users", "crm_storage_folders.folder_id", "crm_storage_folders_users.source_id")
											.where("storage_id", storageInfo[0].storage_id)
											.then((folders) => {
												res.render("crm/storagePage", { currentUser: req.user, userInfo, isLeader, storageInfo, usersInStorage, invitedStorages, folders })
											})
									} else { 
										res.render("crm/storagePage", { currentUser: req.user, userInfo, isLeader, storageInfo, usersInStorage, invitedStorages })
									}

								})
						})
				})
		})
}

exports.inviteUser = (req, res) => {
	db("users")
		.where("username", req.body.username)
		.first()
		.then((user) => {
			if (user) {
				db("crm_storage_users_storage")
					.insert({
						user_id: user.id,
						source_id: req.params.storage_id
					})
					.then(() => {
						res.redirect("back")
					})
			} else {
				res.redirect("back")
			}
		})
}

exports.removeUserFromStorage = (req, res) => {
	db("crm_storage_users_storage")
		.where({ source_id: req.params.storage_id, user_id: req.body.user_id })
		.del()
		.then(() => {
			res.redirect("back")
		})
}

exports.upload = (req, res) => {
	var fstream;
	req.pipe(req.busboy);
	req.busboy.on("file", (fieldName, file, fileName) => {
		console.log("Uploading: " + fileName);
		fstream = fs.createWriteStream("./public/crm/storage/" + fileName);
		file.pipe(fstream);
		fstream.on("close", () => {
			db("crm_storage_files")
				.insert({
					source_id: req.params.storage_id,
					file: fileName
				})
				.then(() => {
					res.redirect("back");
				})
		})
	})
}

exports.createFolder = (req, res) => {
	db("crm_storage_folders")
		.insert({
			owner_id: req.params.owner_id,
			title: req.body.title,
			storage_id: req.params.storage_id,
		})
		.then((folderId) => {
			db("crm_storage_folders_users")
				.insert({
					user_id: req.user.id,
					source_id: folderId
				})
				.then(() => {
					res.redirect("back")
				})
		})
}

exports.deleteFolder = (req, res) => {
	db("crm_storage_folders")
		.where("storage_id", req.params.storage_id)
		.where("folder_id", req.params.folder_id)
		.del()
		.then((isDeleted) => {
			db('crm_storage_folders_users')
				.where("source_id", req.params.folder_id)
				.del().then(() => {
					res.redirect('back');
				})
		});
}


exports.deleteFile = (req, res) => {
  const { user_id, file_id } = req.params;

  // Fetch the file details from the database
  db("crm_storage_files")
    .where("id", file_id)
    .first()
    .then((file) => {
      if (!file) {
        return res.status(404).send("File not found");
      }

      // Delete the file from the filesystem
      const filePath = path.join(__dirname, '../public/crm/storage', file.file);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
          return res.status(500).send("Error deleting file");
        }

        // Delete the file record from the database
        db("crm_storage_files")
          .where("id", file_id)
          .del()
          .then(() => {
            res.redirect("back");
          })
          .catch((error) => {
            console.error("Error deleting file record:", error);
            res.status(500).send("Error deleting file record");
          });
      });
    })
    .catch((error) => {
      console.error("Error fetching file:", error);
      res.status(500).send("Error fetching file");
    });
};
exports.eachFolder = (req, res) => {
	db("users")
		.innerJoin("profile", "users.id", "profile.user_id")
		.where("user_id", req.user.id)
		.then((userInfo) => {
			db("crm_storage_folders")
				.where("folder_id", req.params.folder_id)
				.first()
				.then((folders) => {
					db("crm_storage_folders_users")
						.innerJoin("users", "crm_storage_folders_users.user_id", "users.id")
						.where("source_id", req.params.folder_id)
						.then((usersInFolder) => {
							db("crm_storage_folder_files")
								.where("source_id", req.params.folder_id)
								.then((files) => {
									var isLeader = false;
									if (folders.owner_id == req.user.id) {
										isLeader = true;
									}
									console.log("files",files)
									res.render("crm/eachStorageFolder", { currentUser: req.user, userInfo, folders, isLeader, files, usersInFolder })
								})
						})
				})
		})
}

exports.inviteUserToFolder = (req, res) => {
	db("users")
		.where("username", req.body.username)
		.first()
		.then((user) => {
			if (user) {
				db("crm_storage_folders_users")
					.insert({
						user_id: user.id,
						source_id: req.params.folder_id
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
	db("crm_storage_folders_users")
		.where({ source_id: req.params.folder_id, user_id: req.body.user_id })
		.del()
		.then(() => {
			res.redirect("back")
		})
}

exports.uploadInFolder = (req, res) => {
	var fstream;
	req.pipe(req.busboy);
	req.busboy.on("file", (fieldName, file, fileName) => {
		console.log("Uploading: " + fileName);
		fstream = fs.createWriteStream("./public/crm/storage/" + fileName);
		file.pipe(fstream);
		fstream.on("close", () => {
			db("crm_storage_folder_files")
				.insert({
					file: fileName,
					source_id: req.params.folder_id
				})
				.then(() => {
					res.redirect("/onlineoffice/storage/" + req.params.storage_id + "/folder/" + req.params.folder_id)
				})
		})
	})
}

exports.deleteFileFromFolder = (req, res) => {
  const { storage_id, folder_id, file_id } = req.params;

  // Fetch the file details from the database
  db("crm_storage_folder_files")
    .where("source_id", file_id)
    .first()
    .then((file) => {
      if (!file) {
        return res.status(404).send("File not found");
      }

      // Delete the file from the filesystem
      const filePath = path.join(__dirname, '../public/crm/storage', file.file);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
          return res.status(500).send("Error deleting file");
        }

        // Delete the file record from the database
        db("crm_storage_folder_files")
          .where("source_id", file_id)
          .del()
          .then(() => {
            res.redirect("back");
          })
          .catch((error) => {
            console.error("Error deleting file record:", error);
            res.status(500).send("Error deleting file record");
          });
      });
    })
    .catch((error) => {
      console.error("Error fetching file:", error);
      res.status(500).send("Error fetching file");
    });
};


exports.voicemailHome = (req, res, next) => {
	db("users")
		.innerJoin("profile", "users.id", "profile.user_id")
		.where("user_id", req.user.id)
		.then((userInfo) => {
			db("crm_voicemail")
				.innerJoin("users", "crm_voicemail.owner_id", "users.id")
				.leftJoin("crm_voicemail_files", "crm_voicemail.voicemail_id", "crm_voicemail_files.source_id")
				.where("owner_id", req.params.user_id)
				.then((voicemailInfo) => {
					db("crm_voicemail_users")
						.innerJoin("users", "crm_voicemail_users.user_id", "users.id")
						.innerJoin("crm_voicemail", "crm_voicemail_users.source_id", "crm_voicemail.voicemail_id")
						.where("owner_id", req.params.user_id)
						.then((usersInVoicemail) => {
							db("crm_voicemail")
								.innerJoin("users", "crm_voicemail.owner_id", "users.id")
								.innerJoin("crm_voicemail_users", "crm_voicemail.voicemail_id", "crm_voicemail_users.source_id")
								.where("user_id", req.user.id)
								.then((invitedVoicemail) => {
									var isLeader = false;
									if (req.params.user_id == req.user.id) {
										isLeader = true;
									}
									if (voicemailInfo.length > 0) {
										db("crm_voicemail_folders")
											.leftJoin("crm_voicemail_folders_users", "crm_voicemail_folders.folder_id", "crm_voicemail_folders_users.source_id")
											.where("voicemail_id", voicemailInfo[0].voicemail_id)
											.then((folders) => {

												res.render("crm/voicemailPage", { currentUser: req.user, userInfo, isLeader, voicemailInfo, usersInVoicemail, invitedVoicemail, folders })
											})
									} else {
										res.render("crm/voicemailPage", { currentUser: req.user, userInfo, isLeader, voicemailInfo, usersInVoicemail, invitedVoicemail })
									}

								})
						})
				})
		})
}

exports.voicemailInviteUser = (req, res) => {
	db("users")
		.where("username", req.body.username)
		.first()
		.then((user) => {
			if (user) {
				db("crm_voicemail_users")
					.insert({
						user_id: user.id,
						source_id: req.params.voicemail_id
					})
					.then(() => {
						res.redirect("back")
					})
			} else {
				res.redirect("back")
			}
		})
}

exports.removeUserFromVoicemail = (req, res) => {
	db("crm_voicemail_users")
		.where({ source_id: req.params.voicemail_id, user_id: req.body.user_id })
		.del()
		.then(() => {
			res.redirect("back")
		})
}

exports.uploadVoicemail = (req, res) => {
	var fstream;
	req.pipe(req.busboy);
	req.busboy.on("file", (fieldName, file, fileName) => {
		console.log("Uploading: " + fileName);
		fstream = fs.createWriteStream("./public/crm/voicemail/" + fileName);
		file.pipe(fstream);
		fstream.on("close", () => {
			db("crm_voicemail_files")
				.insert({
					source_id: req.params.voicemail_id,
					file: fileName,
					date: new Date().today(),
					time: new Date().timeNow()
				})
				.then(() => {
					res.redirect("back");
				})
		})
	})
}

exports.deleteVoicemail = (req, res) => {
	db("crm_voicemail_files")
		.where("id", req.params.audio_id)
		.del()
		.then(() => {
			req.flash("error", "Successfully deleted file")
			res.redirect("back")
		})
}

exports.createVoicemailFolder = (req, res) => {
	db("crm_voicemail_folders")
		.insert({
			owner_id: req.params.owner_id,
			title: req.body.title,
			voicemail_id: req.params.voicemail_id,
		})
		.then((folderId) => {
			db("crm_voicemail_folders_users")
				.insert({
					user_id: req.user.id,
					source_id: folderId
				})
				.then(() => {
					res.redirect("back")
				})
		})
}

exports.eachVoicemailFolder = (req, res) => {
    db("users")
        .innerJoin("profile", "users.id", "profile.user_id")
        .where("user_id", req.user.id)
        .then((userInfo) => {
            db("crm_voicemail_folders")
                .where("folder_id", req.params.folder_id) // Correct column name
                .first()
                .then((folders) => {
                    if (!folders) {
                        return res.status(404).send('Folder not found');
                    }
                    db("crm_voicemail_folders_users")
                        .innerJoin("users", "crm_voicemail_folders_users.user_id", "users.id")
                        .where("source_id", req.params.folder_id) // Correct column name
                        .then((usersInFolder) => {
                            db("crm_voicemail_folder_files")
                                .where("folder_id", req.params.folder_id) // Correct column name
                                .then((files) => {
                                    var isLeader = false;
                                    if (folders.owner_id == req.user.id) {
                                        isLeader = true;
                                    }
                                    res.render("crm/eachVoicemailFolder", {
                                        currentUser: req.user,
                                        userInfo,
                                        folders,
                                        isLeader,
                                        files,
                                        usersInFolder
                                    });
                                })
                                .catch(err => {
                                    console.error('Error fetching files:', err);
                                    res.status(500).send('Internal Server Error');
                                });
                        })
                        .catch(err => {
                            console.error('Error fetching users in folder:', err);
                            res.status(500).send('Internal Server Error');
                        });
                })
                .catch(err => {
                    console.error('Error fetching folder:', err);
                    res.status(500).send('Internal Server Error');
                });
        })
        .catch(err => {
            console.error('Error fetching user info:', err);
            res.status(500).send('Internal Server Error');
        });
};
exports.deleteVoicemailFolder = (req, res) => {
	db("crm_voicemail_folders")
		.where("folder_id", req.params.folder_id)
		.del()
		.then(() => {
			var url = "/onlineoffice/voicemail/" + req.user.id
			req.flash("error", "Successfully deleted folder")
			res.redirect(url)
		})
}

exports.inviteUserToVoicemailFolder = (req, res) => {
	db("users")
		.where("username", req.body.username)
		.first()
		.then((user) => {
			if (user) {
				db("crm_voicemail_folders_users")
					.insert({
						user_id: user.id,
						source_id: req.params.folder_id
					})
					.then(() => {
						res.redirect("back")
					})
			} else {
				res.redirect("back")
			}
		})
}

exports.removeUserFromVoicemailFolder = (req, res) => {
	db("crm_voicemail_folders_users")
		.where({ source_id: req.params.folder_id, user_id: req.body.user_id })
		.del()
		.then(() => {
			res.redirect("back")
		})
}
const path = require('path');

exports.uploadInVoicemailFolder = (req, res) => {
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on("file", (fieldName, file, fileName) => {
        console.log("Uploading: " + fileName);
        const filePath = path.join(__dirname, '../public/crm/voicemail', fileName);
        fstream = fs.createWriteStream(filePath);
        file.pipe(fstream);
        fstream.on("close", () => {
            const now = new Date();
            const date = now.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
            const time = now.toISOString().replace('T', ' ').split('.')[0]; // Format timestamp as YYYY-MM-DD HH:MM:SS

            db("crm_voicemail_folder_files")
                .insert({
                    file: fileName,
                    folder_id: req.params.folder_id, // Correct column name
                    date: date, // Format date as YYYY-MM-DD
                    time: time // Format timestamp as YYYY-MM-DD HH:MM:SS
                })
                .then(() => {
                    res.redirect("/onlineoffice/voicemail/" + req.params.voicemail_id + "/folder/" + req.params.folder_id);
                })
                .catch(err => {
                    console.error('Error inserting file record:', err);
                    res.status(500).send('Internal Server Error');
                });
        });
    });
};
exports.deleteVoicemailFromFolder = (req, res) => {
	db("crm_voicemail_folder_files")
		.where("id", req.params.audio_id)
		.del()
		.then(() => {
			req.flash("error", "Successfully deleted file")
			res.redirect("back")
		})
}

exports.conferenceHome = (req, res) => {

	db("users")
		.innerJoin("profile", "users.id", "profile.user_id")
		.where("user_id", req.user.id)
		.then((userInfo) => {
			console.log(userInfo);
			res.render("crm/conference", { currentUser: req.user, userInfo })
		});


}

exports.payment = (req, res) => {

	db("users")
		.innerJoin("profile", "users.id", "profile.user_id")
		.where("user_id", req.user.id)
		.then((userInfo) => {
			console.log(userInfo);
			res.render("crm/payment", { currentUser: req.user, userInfo })
		});


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
