const db = require("../db"),
			fs = require("fs"),
			busboy = require("connect-busboy");

exports.ecrm = (req, res) => {
	db("ecrm_users")
		.where("user_id", req.user.id)
		.first()
		.then((user) => {
			if (user) {
				res.redirect("/office/home")
			} else {
				res.render("ecrm/ecrmStart", {currentUser: req.user});
			}
		})
}

exports.startEcrm = (req, res) => {
	db("users")
		.where("user_code", req.body.referrer_code)
		.first()
		.then((user) => {
			if (user) {
				db("ecrm_users")
					.insert({
						user_id: req.user.id,
						referrer_code: req.body.referrer_code
					})
					.then(() => {
						res.redirect("/office/home")
					})
			} else {
				// flash message: please enter valid referrer_code
				res.redirect("back")
			}
		})
}

exports.home = (req, res) => {
	res.render("ecrm/ecrmHome")
}

exports.dashboard = (req, res) => {
	db("users")
		.innerJoin("profile", "users.id", "profile.user_id")
		.where("user_id", req.user.id)
		.then((userInfo) => {
			db("ecrm_tasks")
				.where("user_id", req.user.id)
				.then((tasks) => {
					db("ecrm_org")
						.innerJoin("ecrm_contacts", "ecrm_org.contact_id", "ecrm_contacts.id")
						.where("leader_id", req.user.id)
						.then((orgs) => {
							db("ecrm_contacts")
								.where("user_id", req.user.id)
								.then((contacts) => {
									db("ecrm_events")
										.where("user_id", req.user.id)
										.then((events) => {
											db("ecrm_users_projects")
												.innerJoin("ecrm_projects", "ecrm_users_projects.project_id", "ecrm_projects.id")
												.where("user_id", req.user.id)
												.then((projects) => {
													db("ecrm_inbox")
														.innerJoin("users", "ecrm_inbox.sender_id", "users.id")
														.where("receiver_id", req.user.id)
														.then((messages) => {
															res.render("ecrm/dashboard", {currentUser: req.user, tasks, orgs, contacts, events, projects, messages, userInfo })
														})
												})
										})
								})
						})
				})
		})
}
exports.addTask = (req, res) => {
	db("ecrm_tasks")
		.insert({
			user_id: req.user.id,
			title: req.body.title,
			description: req.body.description,
			date_time: new Date() 
		})
		.then(() => {
			res.redirect("back")
		})
}

exports.deleteTask = (req, res) => {
	db("ecrm_tasks")
		.where("task_id", req.params.task_id)
		.del()
		.then(() => {
			res.redirect("back")
		})
}

exports.organization = (req, res) => {
	db("users")
		.innerJoin("profile", "users.id", "profile.user_id")
		.where("user_id", req.user.id)
		.then((userInfo) => {
			db("ecrm_contacts")
				.where("user_id", req.user.id)
				.then((allContacts) => {
					db("ecrm_org")
						.innerJoin("ecrm_contacts", "ecrm_contacts.id", "ecrm_org.contact_id")
						.where("leader_id", req.user.id)
						.then((allOrg) => {
							res.render("ecrm/organization", {currentUser: req.user, allContacts, allOrg, userInfo});
						})
				})
		})
}

exports.addOrganization = (req, res, next) => {
	var toOrg = req.body.contacts;
	db("ecrm_contacts")
		.where("name", toOrg)
		.first()
		.then((contact) => {
			console.log(req.body.position0)
					console.log(req.body.position1)
					console.log(req.body.position2)
					console.log(req.body.position3)
					console.log(req.body.position4)
					console.log(req.body.position5)
					console.log(req.body.position6)
			db("ecrm_org")
				.insert({
					leader_id: req.user.id,
					contact_id: contact.id,
					position: req.body.position
				})
				.then(() => {
					next()
				})
			next()
			})	
	res.redirect("back")
}

exports.contacts = (req, res) => {
	db("users")
		.innerJoin("profile", "users.id", "profile.user_id")
		.where("user_id", req.user.id)
		.then((userInfo) => {
			db("ecrm_contacts")
				.where("user_id", req.user.id)
				.then((contacts) => {
					res.render("ecrm/contact", {currentUser: req.user, contacts, userInfo });
				})
		})
}

exports.addContact = (req, res) => {
	db("ecrm_contacts")
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
	db("ecrm_contacts")
			.where("name", req.query.name)
			.update({
				status: req.query.status
			})
			.then(() => {})
}

exports.contactPage = (req, res) => {
	var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
	var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

	var now = new Date();

	var day = days[ now.getDay() ];
	var month = months[ now.getMonth() ];
	var currentDate = day + ", " + month;
	db("users")
		.innerJoin("profile", "users.id", "profile.user_id")
		.where("user_id", req.user.id)
		.then((userInfo) => {
			db("ecrm_contacts")
				.where("id", req.params.id)
				.first()
				.then((contact) => {
					res.render("ecrm/eachContact", {currentUser: req.user, currentDate: currentDate, contact, userInfo});
				})
		})
}

exports.deleteContact = (req, res) => {
	db("ecrm_contacts")
			.where("id", req.params.id)
			.del()
			.then(() => {
				res.redirect("/office/contacts")
			})
}

exports.calendar = (req, res) => {
	db("users")
		.innerJoin("profile", "users.id", "profile.user_id")
		.where("user_id", req.user.id)
		.then((userInfo) => {
			db("ecrm_events")
				.where("user_id", req.user.id)
				.then((events) => {
					res.render("ecrm/calendar", {currentUser: req.user, events, userInfo})
				})
		})
}

exports.addEvent = (req, res) => {
	db("ecrm_events")
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
	db("ecrm_events")
		.where("id", req.params.event_id)
		.del()
		.then(() => {
			res.redirect("back")
		})
}

exports.projects = (req, res) => {
    db("users")
        .innerJoin("profile", "users.id", "profile.user_id")
        .where("user_id", req.user.id)
        .then((userInfo) => {
            db("ecrm_users_projects")
                .innerJoin("users", "ecrm_users_projects.user_id", "users.id")
                .innerJoin("ecrm_projects", "ecrm_users_projects.project_id", "ecrm_projects.id")
                .where("user_id", req.user.id)
                .then((projects) => {
                    const projectIds = projects.map(project => project.id);
                    db("ecrm_pipelines")
                        .whereIn("project_id", projectIds)
                        .then((pipelines) => {
                            // Associate pipelines with their respective projects
                            projects.forEach(project => {
                                project.pipelines = pipelines.filter(pipeline => pipeline.project_id === project.id);
                            });
                            res.render("ecrm/project", { currentUser: req.user, projects, userInfo });
                        });
                });
        });
};
exports.createProject = (req, res) => {
    db("ecrm_projects")
        .insert({
            leader_id: req.user.id,
            title: req.body.title,
            parent_project_id: req.body.parent_project_id || null
        })
        .then((newProjectId) => {
            db("ecrm_users_projects")
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
exports.createProjectAll = async (req, res) => {
    try {
        console.log("Request body:", req.body);

        // Insert the project
        const newProjectId = await db("ecrm_projects")
            .insert({
                leader_id: req.user.id,
                title: req.body.title,
                parent_project_id: req.body.parent_project_id || null
            })
            .returning('id');
        const projectId = newProjectId[0];
        console.log("New project ID:", projectId);

        // Insert the user-project relationship
        await db("ecrm_users_projects")
            .insert({
                user_id: req.user.id,
                project_id: projectId
            });

        res.redirect("back");
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Server Error");
    }
};
exports.projectPage = (req, res) => {
    db("users")
        .innerJoin("profile", "users.id", "profile.user_id")
        .where("user_id", req.user.id)
        .then((userInfo) => {
            db("ecrm_users_projects")
                .innerJoin("users", "ecrm_users_projects.user_id", "users.id")
                .innerJoin("ecrm_projects", "ecrm_users_projects.project_id", "ecrm_projects.id")
                .where("project_id", req.params.project_id)
                .then((projects) => {
                    console.log(projects);
                    var isSubLeader;
                    var isLeader = false;
                    var currentUserIsLeader = false;
                    projects.forEach(function(project) {
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
                    db("ecrm_users_pipelines")
                        .innerJoin("ecrm_pipelines", "ecrm_users_pipelines.pipeline_id", "ecrm_pipelines.id")
                        .innerJoin("users", "ecrm_users_pipelines.user_id", "users.id")
                        .where("project_id", req.params.project_id)
                        .andWhere("ecrm_users_pipelines.user_id", req.user.id) // Filter by current user ID
                        .then((pipelines) => {
                            db("ecrm_projects")
                                .where("parent_project_id", req.params.project_id)
                                .then((childProjects) => {
                                    db("ecrm_projects")
                                        .then((allProjects) => {
                                            res.render("ecrm/eachProject", {
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
	db("ecrm_users_projects")
		.innerJoin("users", "ecrm_users_projects.user_id", "users.id")
		.where({
			username: req.query.username,
			project_id: req.query.projectId
		})
		.update({
			is_sub_leader: req.query.status
		})
		.then(() => {})
}

exports.deleteProject = (req, res) => {
	db("ecrm_projects")
		.where("id", req.params.project_id)
		.del()
		.then(() => {
			db("ecrm_users_projects")
				.where("project_id", req.params.project_id)
				.del()
				.then(() => {
					res.redirect("/office/projects")
				})
		})
}

exports.projectInviteUser = (req, res) => {
	db("users")
		.where("username", req.body.username)
		.first()
		.then((user) => {
			if (user) {
				db("ecrm_users_projects")
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
	db("ecrm_users_projects")
		.where({user_id: req.body.user_id, project_id: req.params.project_id})
		.del()
		.then(() => {
			res.redirect("back")
		})
}

exports.createPipeline = (req, res) => {
    console.log("params", req.params);
    db("ecrm_pipelines")
        .insert({
            title: req.body.title,
            project_id: req.params.project_id
        })
        .returning('id') // Ensure the inserted ID is returned
        .then((pipelineIds) => {
            const pipelineId = pipelineIds[0]; // Extract the first element from the array
            console.log("pipelineId", pipelineId);
            db("ecrm_users_pipelines")
                .insert({
                    user_id: req.user.id,
                    pipeline_id: pipelineId
                })
                .then(() => {
                    res.redirect("back");
                })
                .catch((err) => {
                    console.error("Error inserting into ecrm_users_pipelines:", err);
                    res.status(500).send("Internal Server Error");
                });
        })
        .catch((err) => {
            console.error("Error inserting into ecrm_pipelines:", err);
            res.status(500).send("Internal Server Error");
        });
};

exports.pipelinePage = (req, res) => {
	db("users")
		.innerJoin("profile", "users.id", "profile.user_id")
		.where("user_id", req.user.id)
		.then((userInfo) => {
			db("ecrm_users_projects")
				.innerJoin("users", "ecrm_users_projects.user_id", "users.id")
				.innerJoin("ecrm_projects", "ecrm_users_projects.project_id", "ecrm_projects.id")
				.where("project_id", req.params.project_id)
				.then((projects) => {
					var isSubLeader;
					var isLeader = false;
					projects.forEach(function(project) {
						if (project.user_id === req.user.id) {
							isSubLeader = project.is_sub_leader
							if (project.user_id === project.leader_id) {
								isLeader = true;
							}
						}
					})
					db("ecrm_users_pipelines")
						.innerJoin("users", "ecrm_users_pipelines.user_id", "users.id")
						.innerJoin("ecrm_pipelines", "ecrm_users_pipelines.pipeline_id", "ecrm_pipelines.id")
						.where("pipeline_id", req.params.pipeline_id)
						.then((pipeline) => {
							console.log(pipeline)
							db("ecrm_users_folders")
								.innerJoin("ecrm_folders", "ecrm_users_folders.folder_id", "ecrm_folders.id")
								.innerJoin("users", "ecrm_users_folders.user_id", "users.id")
								.where("pipeline_id", req.params.pipeline_id)
								.then((folders) => {
									db("ecrm_tasks")
										.innerJoin("users", "ecrm_tasks.user_id", "users.id")
										.where("pipeline_id", req.params.pipeline_id)
										.then((tasks) => {
											db("ecrm_posts")
												.innerJoin("users", "ecrm_posts.user_id", "users.id")
												.where("pipeline_id", req.params.pipeline_id)
												.then((posts) => {
													res.render("ecrm/eachPipeline", {currentUser: req.user, isLeader, isSubLeader, pipeline, folders, tasks, posts, userInfo})
												})
										})
								})
						})
				})	
		})
}

exports.pipelineInviteUser = (req, res) => {
	db("users")
		.where("username", req.body.username)
		.first()
		.then((user) => {
			if (user) {
				console.log("params",req.params)
				db("ecrm_users_pipelines")
					.insert({
						user_id: user.id,
						pipeline_id: req.params.pipeline_id
					})
					.then(() => {
						db("ecrm_users_projects")
							.where({user_id: user.id, project_id: req.params.project_id})
							.first()
							.then((match) => {
								if (match) {
									res.redirect("back")
								} else {
									db("ecrm_users_projects")
										.insert({
											user_id: user.id,
											project_id: req.params.project_id
										})
										.then(() => {
											res.redirect("back")
										})
								}
							})
					})
			}
		})
}

exports.pipelineRemoveUser = (req, res) => {
	db("users")
		.where("id", req.body.user_id)
		.first()
		.then((user) => {
			db("ecrm_users_pipelines")
				.where({user_id: req.body.user_id, pipeline_id: req.params.pipeline_id})
				.del()
				.then(() => {
					res.redirect("back")
				})
		})
}

exports.addTaskPipeline = (req, res) => {
	db("ecrm_tasks")
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
	db("ecrm_posts")
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
	db("ecrm_posts")
		.where("post_id", req.params.post_id)
		.del()
		.then(() => {
			res.redirect("back")
		})
}

exports.deletePipeline = (req, res) => {
	db("ecrm_pipelines")
		.where("id", req.params.pipeline_id)
		.del()
		.then((result) => {
			db("ecrm_users_pipelines")
				.where("pipeline_id", req.params.pipeline_id)
				.del()
				.then(() => {
					var redirect = "/office/project/" + req.params.project_id
					res.redirect(redirect)
				})
		})
}

exports.createFolder = (req, res) => {
	db("ecrm_folders")
		.insert({
			title: req.body.title,
			pipeline_id: req.params.pipeline_id
		})
		.then((folderId) => {
			db("ecrm_users_folders")
				.insert({
					user_id: req.user.id,
					folder_id: folderId
				})
				.then(() => {
					res.redirect("back")
				})
		})
}

exports.folderPage = (req, res) => {
	db("users")
		.innerJoin("profile", "users.id", "profile.user_id")
		.where("user_id", req.user.id)
		.then((userInfo) => {
			db("ecrm_users_projects")
				.innerJoin("users", "ecrm_users_projects.user_id", "users.id")
				.innerJoin("ecrm_projects", "ecrm_users_projects.project_id", "ecrm_projects.id")
				.where("project_id", req.params.project_id)
				.then((projects) => {
					var isSubLeader;
					var isLeader = false;
					projects.forEach(function(project) {
						if (project.user_id === req.user.id) {
							isSubLeader = project.is_sub_leader
							if (project.user_id === project.leader_id) {
								isLeader = true;
							}
						}
					})
					db("ecrm_users_folders")
						.innerJoin("users", "ecrm_users_folders.user_id", "users.id")
						.innerJoin("ecrm_folders", "ecrm_users_folders.folder_id", "ecrm_folders.id")
						.where("folder_id", req.params.folder_id)
						.then((folder) => {
							db("users")
								.innerJoin("ecrm_posts", "users.id", "ecrm_posts.user_id")
								.where("folder_id", req.params.folder_id)
								.then((notes) => {
									db("ecrm_uploads")
										.where("folder_id", req.params.folder_id)
										.then((uploads) => {
											res.render("ecrm/eachFolder", {currentUser: req.user, isLeader, isSubLeader, folder, project_id: req.params.project_id, notes, uploads, userInfo})
										})
								})
						})
				})
		})
}

exports.folderInviteUser = (req, res) => {
	db("users")
		.where("username", req.body.username)
		.first()
		.then((user) => {
			if (user) {
				db("ecrm_users_folders")
					.insert({
						user_id: user.id,
						folder_id: req.params.folder_id
					})
					.then(() => {
						db("ecrm_users_folders")
							.where({user_id: user.id, folder_id: req.params.folder_id})
							.first()
							.then((match) => {
								if (match) {
									res.redirect("back")
								} else {
									db("ecrm_users_pipelines")
										.insert({
											user_id: user.id,
											pipeline_id: req.params.pipeline_id
										})
										.then(() => {
											res.redirect("back")
										})
								}
							})
					})
			}
		})
}

exports.folderremoveUser = (req, res) => {
	db("users")
		.where("id", req.body.user_id)
		.first()
		.then((user) => {
			db("ecrm_users_folders")
				.where({user_id: user.id, folder_id: req.params.folder_id})
				.del()
				.then(() => {
					res.redirect("back");
				})
		})
}

exports.addNoteFolder = (req, res) => {
	db("ecrm_posts")
		.insert({
			folder_id: req.params.folder_id,
			user_id: req.user.id,
			post: req.body.note 
		})
		.then(() => {
			res.redirect("back")
		})
}

exports.deleteNoteFolder = (req, res) => {
	db("ecrm_posts")
		.where("post_id", req.params.note_id)
		.del()
		.then(() => {
			res.redirect("back")
		})
}

exports.uploadFileFolder = (req, res) => {
	var fstream;
		req.pipe(req.busboy);
		req.busboy.on("file", (fieldName, file, fileName) => {
			console.log("Uploading: " + fileName);
			fstream = fs.createWriteStream("./public/ecrm/uploads/" + fileName);
			file.pipe(fstream);
			fstream.on("close", () => {
			db("ecrm_uploads")
				.insert({
					folder_id: req.params.folder_id,
					file_name: fileName
				})
				.then(() => {
					res.redirect("back");
				})
			})
		})
}

exports.deleteFolder = (req, res) => {
	db("ecrm_folders")
		.where("id", req.params.folder_id)
		.del()
		.then((result) => {
			db("ecrm_users_folders")
				.where("folder_id", req.params.folder_id)
				.del()
				.then(() => {
					var redirect = "/office/project/"+ req.params.project_id + "/pipeline/" + req.params.pipeline_id
					res.redirect(redirect)
				})
		})
}
exports.inbox = (req, res) => {
    db("users")
        .innerJoin("profile", "users.id", "profile.user_id")
        .where("user_id", req.user.id)
        .then((userInfo) => {
            db("ecrm_inbox")
                .innerJoin("users as receiver", "ecrm_inbox.receiver_id", "receiver.id")
                .where("receiver_id", req.user.id)
                .then((inbox) => {
                    db("ecrm_inbox")
                        .innerJoin("users as sender", "ecrm_inbox.sender_id", "sender.id")
                        .innerJoin("users as receiver", "ecrm_inbox.receiver_id", "receiver.id")
                        .where("sender_id", req.user.id)
                        .select("ecrm_inbox.*", "receiver.username as receiver_username")
                        .then((sentMessages) => {
                            console.log("sentMessages", sentMessages);
                            res.render("ecrm/inbox", { currentUser: req.user, inbox, sentMessages, userInfo });
                        });
                });
        });
};

exports.sendMessage = (req, res) => {
	console.log("req.body", req.user.id)
	db("users")
		.where("username", req.body.to_username)
		.first()
		.then((user) => {
			if (user) {
				console.log("user", user)
				db("ecrm_inbox")
					.insert({
						sender_id: req.user.id,
						receiver_id: user.id,
						subject: req.body.subject,
						message: req.body.message
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

exports.deleteMessage = (req, res) => {
	db("ecrm_inbox")
		.where("id", req.params.message_id)
		.del()
		.then(() => {
			res.redirect("back")
		})
}

exports.ecrmWhiteboard = (req, res) => {
	db("users")
		.innerJoin("profile", "users.id", "profile.user_id")
		.where("user_id", req.user.id)
		.then((userInfo) => {
			res.render("ecrm/whiteboard", {userInfo})
		})
}

exports.ecrmSettings = (req, res) => {
	db("users")
		.innerJoin("profile", "users.id", "profile.user_id")
		.where("user_id", req.user.id)
		.then((userInfo) => {
			res.render("ecrm/setting", {userInfo})
		})
}