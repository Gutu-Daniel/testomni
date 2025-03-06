const express = require("express"),
			router = express.Router(),
			crmController = require("../controllers/crmController.js")

router
	.get("/onlineoffice", loginRequired, suspentionCheck, crmController.crm)
	.post("/onlineoffice", loginRequired, suspentionCheck, crmController.startcrm)
	.get("/onlineoffice/home", loginRequired, suspentionCheck, crmController.home)
	.get("/onlineoffice/wall/:user_id", loginRequired, suspentionCheck, crmController.crmWall)
	.post("/onlineoffice/wall/:user_id/invite", loginRequired, suspentionCheck, crmController.wallInvite)
	.delete("/onlineoffice/wall/:user_id/delete/:invited_id", loginRequired, suspentionCheck, crmController.wallRemove)
	.post("/onlineoffice/wall/:user_id", loginRequired, suspentionCheck, crmController.postCrmWall)
	.put("/onlineoffice/wall/:user_id/post/:post_id", loginRequired, suspentionCheck, crmController.editCrmWall)
	.delete("/onlineoffice/wall/:user_id/post/:post_id", loginRequired, suspentionCheck, crmController.deleteCrmWall)
	.get("/onlineoffice/dashboard", loginRequired, suspentionCheck, crmController.dashboard)
	.post("/onlineoffice/dashboard/invite", loginRequired, suspentionCheck, crmController.dashboardInvite)
	.get("/onlineoffice/viewUserDashboard/:user_id", loginRequired, suspentionCheck, crmController.viewUserDashboard)
	.post("/onlineoffice/addtask", loginRequired, suspentionCheck, crmController.addTask)
	.delete("/onlineoffice/deletetask/:task_id", loginRequired, suspentionCheck, crmController.deleteTask)
	.get("/onlineoffice/organization", loginRequired, suspentionCheck, crmController.organization)
	.delete("/onlineoffice/organization/:org_id", loginRequired, suspentionCheck, crmController.deleteOrganization)
	.get("/onlineoffice/viewOrganization/:user_id", loginRequired, suspentionCheck, crmController.viewOrganization)
	.post("/onlineoffice/organization", loginRequired, suspentionCheck, crmController.addToOrg)
	.put("/onlineoffice/organization/:org_id", loginRequired, suspentionCheck, crmController.editOrg)
	.post("/onlineoffice/organizationInvite", loginRequired, suspentionCheck, crmController.organizationInvite)
	.get("/onlineoffice/contacts", loginRequired, suspentionCheck, crmController.contacts)
	.post("/onlineoffice/addcontact", loginRequired, suspentionCheck, crmController.addContact)
	.get("/onlineoffice/editstatus", loginRequired, suspentionCheck, crmController.editStatus)
	.get("/onlineoffice/contact/:id", loginRequired, suspentionCheck, crmController.contactPage)
	.delete("/onlineoffice/deletecontact/:id", loginRequired, suspentionCheck, crmController.deleteContact)
	.get("/onlineoffice/calendar/:user_id", loginRequired, suspentionCheck, crmController.calendar)
	.post("/onlineoffice/calendarinvite/:user_id", loginRequired, suspentionCheck, crmController.calendarInvite)
	.delete("/onlineoffice/calendarremove/:user_id", loginRequired, suspentionCheck, crmController.calendarRemove)
	.get("/onlineoffice/completecomtask/:task_id", loginRequired, suspentionCheck, crmController.completeComTask)
	.post("/onlineoffice/addevent", loginRequired, suspentionCheck, crmController.addEvent)
	.delete("/onlineoffice/deleteevent/:event_id", loginRequired, suspentionCheck, crmController.deleteEvent)
	.get("/onlineoffice/communitytasks/:user_id", loginRequired, suspentionCheck, crmController.comTasks)
	.get("/onlineoffice/viewComTasks/:user_id", loginRequired, suspentionCheck, crmController.viewComTasks)
	.post("/onlineoffice/communitytasksInvite", loginRequired, suspentionCheck, crmController.inviteUserToTaskGrid)
	.get("/onlineoffice/comTasksFilter/:user_id", loginRequired, suspentionCheck, crmController.comTasksFilter)

	.get("/onlineoffice/devDuplicateTask", loginRequired, suspentionCheck, crmController.duplicateTask)



	.get("/onlineoffice/projects", loginRequired, suspentionCheck, crmController.projects)
	.post("/onlineoffice/project/:projectId/rename", loginRequired, suspentionCheck, crmController.renameProject)
	.post("/onlineoffice/createproject", loginRequired, suspentionCheck, crmController.createProject)
	.get("/onlineoffice/project/:project_id", loginRequired, suspentionCheck, crmController.projectPage)
	.get("/onlineoffice/edituserprojectlevel", loginRequired, suspentionCheck, crmController.editUserProjectLevel)
	.post("/onlineoffice/project/:project_id/invite", loginRequired, suspentionCheck, crmController.projectInviteUser)
	.delete("/onlineoffice/project/:project_id/remove", loginRequired, suspentionCheck, crmController.projectRemoveUser)
	.post("/onlineoffice/project/:project_id/createpipeline", loginRequired, suspentionCheck, crmController.createPipeline)
	.post("/onlineoffice/project/:projectId/pipeline/:pipelineId/rename", loginRequired, suspentionCheck, crmController.renamePipeline)
	.delete("/onlineoffice/project/:project_id", loginRequired, suspentionCheck, crmController.deleteProject)
	.get("/onlineoffice/project/:project_id/pipeline/:pipeline_id", loginRequired, suspentionCheck, crmController.pipelinePage)
	.post("/onlineoffice/project/:project_id/pipeline/:pipeline_id/addtask", loginRequired, suspentionCheck, crmController.addTaskPipeline)
	.post("/onlineoffice/project/:project_id/pipeline/:pipeline_id/addpost", loginRequired, suspentionCheck, crmController.addPostPipeline)
	.delete("/onlineoffice/project/:project_id/pipeline/:pipeline_id/deletepost/:post_id", loginRequired, suspentionCheck, crmController.deletePostPipeline)
	.post("/onlineoffice/project/:project_id/pipeline/:pipeline_id/createcandidate", loginRequired, suspentionCheck, crmController.createCandidate)
	.post('/onlineoffice/project/:project_id/candidate/:candidate_id/rename', loginRequired, suspentionCheck, crmController.renameCandidate)
	.delete("/comTasks/:id", loginRequired, suspentionCheck, crmController.deleteComTask)

	.delete("/onlineoffice/project/:project_id/pipeline/:pipeline_id", loginRequired, suspentionCheck, crmController.deletePipeline)
	.get("/onlineoffice/project/:project_id/pipeline/:pipeline_id/candidate/:candidate_id", loginRequired, suspentionCheck, crmController.candidatePage)
	.post("/onlineoffice/project/:project_id/pipeline/:pipeline_id/candidate/:candidate_id/invite", loginRequired, suspentionCheck, crmController.candidateInviteUser)
	.delete("/onlineoffice/project/:project_id/pipeline/:pipeline_id/candidate/:candidate_id/remove", loginRequired, suspentionCheck, crmController.candidateRemoveUser)
	.delete("/onlineoffice/project/:project_id/pipeline/:pipeline_id/candidate/:candidate_id", loginRequired, suspentionCheck, crmController.deleteCandidate)
	.post("/onlineoffice/project/:project_id/pipeline/:pipeline_id/candidate/:candidate_id/addnote", loginRequired, suspentionCheck, crmController.addNoteCandidate)
	.delete("/onlineoffice/project/:project_id/pipeline/:pipeline_id/candidate/:candidate_id/deletenote/:note_id", loginRequired, suspentionCheck, crmController.deleteNoteCandidate)
	.post("/onlineoffice/project/:project_id/pipeline/:pipeline_id/candidate/:candidate_id/uploadfile", loginRequired, suspentionCheck, crmController.uploadFileCandidate)
	.put("/onlineoffice/candidate/:candidate_id/movecandidate", loginRequired, suspentionCheck, crmController.moveCandidate)
	.put("/onlineoffice/candidate/:candidate_id/aboutcandidate", loginRequired, suspentionCheck, crmController.aboutCandidate)

	.get("/onlineoffice/inbox", loginRequired, suspentionCheck, crmController.inbox)
	.post("/onlineoffice/sendmessage", loginRequired, suspentionCheck, crmController.sendMessage)
	.delete("/onlineoffice/deletemessage/:message_id", loginRequired, suspentionCheck, crmController.deleteMessage)
	.get("/onlineoffice/whiteboard", loginRequired, suspentionCheck, crmController.crmWhiteboard)
	.get("/onlineoffice/viewWhiteboard/:user_id", loginRequired, suspentionCheck, crmController.viewWhiteboard)
	.post("/onlineoffice/whiteboardInvite", loginRequired, suspentionCheck, crmController.whiteboardInvite)
	.get("/onlineoffice/settings", loginRequired, suspentionCheck, crmController.crmSettings)
	.post("/onlineoffice/invite", loginRequired, suspentionCheck, crmController.crmInvite)
 
	.get("/onlineoffice/storage/:user_id", loginRequired, suspentionCheck, crmController.storageHome) 
	.delete("/onlineoffice/storage/:user_id/deleteFile/:file_id", loginRequired, suspentionCheck, crmController.deleteFile)
	.post("/onlineoffice/storage/:user_id/invite/:storage_id", loginRequired, suspentionCheck, crmController.inviteUser)
	.delete("/onlineoffice/storage/:user_id/removeUser/:storage_id", loginRequired, suspentionCheck, crmController.removeUserFromStorage)
	.post("/onlineoffice/storage/:user_id/upload/:storage_id", loginRequired, suspentionCheck, crmController.upload)
	.post("/onlineoffice/storage/:storage_id/createfolder/:owner_id", loginRequired, suspentionCheck, crmController.createFolder)
	.get("/onlineoffice/storage/:storage_id/folder/:folder_id", loginRequired, suspentionCheck, crmController.eachFolder)
	.post("/onlineoffice/storage/:storage_id/folder/:folder_id/invite", loginRequired, suspentionCheck, crmController.inviteUserToFolder)
	.delete("/onlineoffice/storage/:storage_id/folder/:folder_id/removeUser", loginRequired, suspentionCheck, crmController.removeUserFromFolder)
	.post("/onlineoffice/storage/:storage_id/folder/:folder_id/upload", loginRequired, suspentionCheck, crmController.uploadInFolder)
	.delete("/onlineoffice/storage/:storage_id/folder/:folder_id/deleteFolder", loginRequired, suspentionCheck, crmController.deleteFolder)
	.delete("/onlineoffice/storage/:storage_id/folder/:folder_id/deleteFile/:file_id", loginRequired, suspentionCheck, crmController.deleteFileFromFolder)
	.get("/onlineoffice/voicemail/:user_id", loginRequired, suspentionCheck, crmController.voicemailHome)
	.post("/onlineoffice/voicemail/:user_id/invite/:voicemail_id", loginRequired, suspentionCheck, crmController.voicemailInviteUser)
	.delete("/onlineoffice/voicemail/:user_id/removeUser/:voicemail_id", loginRequired, suspentionCheck, crmController.removeUserFromVoicemail)
	.post("/onlineoffice/voicemail/:user_id/upload/:voicemail_id", loginRequired, suspentionCheck, crmController.uploadVoicemail)
	.delete("/onlineoffice/voicemail/:voicemail_id/delete/:audio_id", loginRequired, suspentionCheck, crmController.deleteVoicemail)
	.post("/onlineoffice/voicemail/:voicemail_id/createfolder/:owner_id", loginRequired, suspentionCheck, crmController.createVoicemailFolder)
	.get("/onlineoffice/voicemail/:voicemail_id/folder/:folder_id", loginRequired, suspentionCheck, crmController.eachVoicemailFolder)
	.delete("/onlineoffice/voicemail/:voicemail_id/folder/:folder_id", loginRequired, suspentionCheck, crmController.deleteVoicemailFolder)
	.post("/onlineoffice/voicemail/:voicemail_id/folder/:folder_id/invite", loginRequired, suspentionCheck, crmController.inviteUserToVoicemailFolder)
	.delete("/onlineoffice/voicemail/:voicemail_id/folder/:folder_id/removeUser", loginRequired, suspentionCheck, crmController.removeUserFromVoicemailFolder)
	.post("/onlineoffice/voicemail/:voicemail_id/folder/:folder_id/upload", loginRequired, suspentionCheck, crmController.uploadInVoicemailFolder)
	.delete("/onlineoffice/voicemail/:voicemail_id/folder/:folder_id/delete/:audio_id", loginRequired, suspentionCheck, crmController.deleteVoicemailFromFolder)
	
	.get("/onlineoffice/conference", loginRequired, suspentionCheck, crmController.conferenceHome)
	.get("/onlineoffice/payment", loginRequired, suspentionCheck, crmController.payment)

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