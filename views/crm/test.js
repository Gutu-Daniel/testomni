
<% include crm-partials/crmHeader %>

<div style="margin-top: 140px;" class="container crm page">
	<% include crm-partials/navTabs %>
	<hr>
	<p id="title">Projects</p>
	<% if (currentUser.is_superAdmin) { %>
		<p id="add-project" class="float-right point-cursor" data-toggle="modal" data-target="#add-project-form"><i class="fa fa-plus-circle" aria-hidden="true"></i> Add a new project</p>
	<% } %>
	<div class="project-list">
		<h4>Projects</h4>
		<% if (projects.length > 0) { %>
			<% for (var i=0;i<projects.length;i++) { %>
				<div class="project-list-each">
					<a href="/onlineoffice/project/<%= projects[i].project_id %>"><%= projects[i].title %></a>
					<form style="display: inline-block;" method="post" action="/onlineoffice/project/<%= projects[i].project_id %>?_method=DELETE" ><button type="submit" class="" style="background: transparent;
    border: none;"><i class="fa fa-close text-danger " aria-hidden="true"></i></button></form>
				</div>
			<% } %>	
		<% } else { %>
			<p>You don't have any projects</p>
		<% } %>
	</div>
</div>

<!-- modal start -->
<div class="modal" id="add-project-form" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	<div class="modal-dialog" role="document">
  	<div class="modal-content">
  		<button class="btn btn-danger btn-sm" id="close-modal-form" data-dismiss="modal">Close</button>
  		<h3>New Project</h3>
  		<form action="/onlineoffice/createproject %>" method="POST">
				<div class="form-group">
					<label for="title">Title</label>
					<input type="text" name="title" class="form-control">
				</div>
	  		<button class="btn btn-success">Create Project</button>
	  	</form>
		</div>
	</div>
</div>
<!-- modal end -->

<% include crm-partials/crmFooter %>