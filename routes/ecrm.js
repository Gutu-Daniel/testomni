const express = require("express"),
			router = express.Router(),
			ecrmController = require("../controllers/ecrmController.js")
router
	.get("/office", loginRequired, suspentionCheck, ecrmController.ecrm)
	.post("/office", loginRequired, suspentionCheck, ecrmController.startEcrm)
	.get("/office/home", loginRequired, suspentionCheck, ecrmController.home)
	.get("/office/dashboard", loginRequired, suspentionCheck, ecrmController.dashboard)
	.post("/office/addtask", loginRequired, suspentionCheck, ecrmController.addTask)
	.delete("/office/deletetask/:task_id", loginRequired, suspentionCheck, ecrmController.deleteTask)
	.get("/office/organization", loginRequired, suspentionCheck, ecrmController.organization)
	.post("/office/addorganization", loginRequired, suspentionCheck, ecrmController.addOrganization)
	.get("/office/contacts", loginRequired, suspentionCheck, ecrmController.contacts)
	.post("/office/addcontact", loginRequired, suspentionCheck, ecrmController.addContact)
	.get("/office/editstatus", loginRequired, suspentionCheck, ecrmController.editStatus)
	.get("/office/contact/:id", loginRequired, suspentionCheck, ecrmController.contactPage)
	.delete("/office/deletecontact/:id", loginRequired, suspentionCheck, ecrmController.deleteContact)
	.get("/office/calendar", loginRequired, suspentionCheck, ecrmController.calendar)
	.post("/office/addevent", loginRequired, suspentionCheck, ecrmController.addEvent)
	.delete("/office/deleteevent/:event_id", loginRequired, suspentionCheck, ecrmController.deleteEvent)
	.get("/office/projects", loginRequired, suspentionCheck, ecrmController.projects)
	.post("/office/createproject", loginRequired, suspentionCheck, ecrmController.createProject)
	.post("/office/createprojectall", loginRequired, suspentionCheck, ecrmController.createProjectAll)
	.get("/office/project/:project_id", loginRequired, suspentionCheck, ecrmController.projectPage)
	.get("/office/edituserprojectlevel", loginRequired, suspentionCheck, ecrmController.editUserProjectLevel)
	.post("/office/project/:project_id/invite", loginRequired, suspentionCheck, ecrmController.projectInviteUser)
	.delete("/office/project/:project_id/remove", loginRequired, suspentionCheck, ecrmController.projectRemoveUser)
	.post("/office/project/:project_id/createpipeline", loginRequired, suspentionCheck, ecrmController.createPipeline)
	.delete("/office/project/:project_id", loginRequired, suspentionCheck, ecrmController.deleteProject)
	.get("/office/project/:project_id/pipeline/:pipeline_id", loginRequired, suspentionCheck, ecrmController.pipelinePage)
	.post("/office/project/:project_id/pipeline/:pipeline_id/invite", loginRequired, suspentionCheck, ecrmController.pipelineInviteUser)
	.delete("/office/project/:project_id/pipeline/:pipeline_id/remove", loginRequired, suspentionCheck, ecrmController.pipelineRemoveUser)
	.post("/office/project/:project_id/pipeline/:pipeline_id/addtask", loginRequired, suspentionCheck, ecrmController.addTaskPipeline)
	.post("/office/project/:project_id/pipeline/:pipeline_id/addpost", loginRequired, suspentionCheck, ecrmController.addPostPipeline)
	.delete("/office/project/:project_id/pipeline/:pipeline_id/deletepost/:post_id", loginRequired, suspentionCheck, ecrmController.deletePostPipeline)
	.post("/office/project/:project_id/pipeline/:pipeline_id/createfolder", loginRequired, suspentionCheck, ecrmController.createFolder)
	.delete("/office/project/:project_id/pipeline/:pipeline_id", loginRequired, suspentionCheck, ecrmController.deletePipeline)
	.get("/office/project/:project_id/pipeline/:pipeline_id/folder/:folder_id", loginRequired, suspentionCheck, ecrmController.folderPage)
	.post("/office/project/:project_id/pipeline/:pipeline_id/folder/:folder_id/invite", loginRequired, suspentionCheck, ecrmController.folderInviteUser)
	.delete("/office/project/:project_id/pipeline/:pipeline_id/folder/:folder_id/remove", loginRequired, suspentionCheck, ecrmController.folderremoveUser)
	.delete("/office/project/:project_id/pipeline/:pipeline_id/folder/:folder_id", loginRequired, suspentionCheck, ecrmController.deleteFolder)
	.post("/office/project/:project_id/pipeline/:pipeline_id/folder/:folder_id/addnote", loginRequired, suspentionCheck, ecrmController.addNoteFolder)
	.delete("/office/project/:project_id/pipeline/:pipeline_id/folder/:folder_id/deletenote/:note_id", loginRequired, suspentionCheck, ecrmController.deleteNoteFolder)
	.post("/office/project/:project_id/pipeline/:pipeline_id/folder/:folder_id/uploadfile", loginRequired, suspentionCheck, ecrmController.uploadFileFolder)
	.get("/office/inbox", loginRequired, suspentionCheck, ecrmController.inbox)
	.post("/office/sendmessage", loginRequired, suspentionCheck, ecrmController.sendMessage)
	.delete("/office/deletemessage/:message_id", loginRequired, suspentionCheck, ecrmController.deleteMessage)
	.get("/office/whiteboard", loginRequired, suspentionCheck, ecrmController.ecrmWhiteboard)
	.get("/office/settings", loginRequired, suspentionCheck, ecrmController.ecrmSettings)


function loginRequired(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.redirect("/login")
	}
	next()
}

function superAdminRequired(req, res, next) {
	if (!req.user.is_superAdmin) {
		return res.render("403")
	}
	next()
}

function suspentionCheck(req, res, next) {
  if (req.user.is_suspended) {
    let reason = "Your account has been suspended.";
    console.log("subscription_end_date",req.user.subscription_end_date )
    const today = new Date();
    if (req.user.subscription_end_date && new Date(req.user.subscription_end_date) < today) {
      reason = "Your subscription has expired. Please renew your subscription.";
    }
    return res.render("user_suspention", { reason });
  }
  next();
}

module.exports = router;