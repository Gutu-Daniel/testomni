// nav tabs
var profileImg = document.querySelector("#profile-img");
var tabs = document.querySelectorAll("#tabs>a");
profileImg.addEventListener("click", function() {
	for (i=0;i<tabs.length;i++) {
		if (tabs[i].style.display == 'none') {
			tabs[i].style.display = 'inline-block';
		} else {
			tabs[i].style.display = 'none';
		}
	}
})
// slideCircles($("#profile-img"), $("#tabs>a"))
// function slideCircles(trigger, show) {
// 	trigger.on("click", function() {
// 		show.toggle("slide");
// 	})
// }

// calendar
$(document).on("click", ".day-number", function() {
	var selectedDate = parseInt($(this).text()) + " " + $(".header>h1").text()
	$.get('/onlineoffice/calendar', function() {
		console.log($("#date-selected").text(selectedDate))
	})
})
clickableDates();
$(document).on("click", ".right, .left", function() {
	setTimeout(clickableDates, 1000)
})
function clickableDates() {
	var days = document.querySelectorAll(".day:not(.other)")
	for (var i=0;i<days.length;i++) {
		var date = days[i];
		var number = date.children[1].textContent
		var day = date.children[0].textContent
		date.innerHTML = '<div class="day-name">' + day + '</div><div class="day-number" data-toggle="modal" data-target="#add-event-form"> ' + number + '</div>'
	}
}

// each contact
var contactStatus = $(".each-contact-status")
styleContactStatus();

$(contactStatus).on("click", function() {
	var data = $(this).parent().parent().parent().children()[0].children[0].textContent
	var data2;
	var confirming = confirm("Are you sure you want to edit this persons status?");
	if ($(this).text() === "Active" && confirming) {
		$(this).text("Closed");
		data2 = "Closed"
	} else if ($(this).text() === "Closed" && confirming) {
		$(this).text("Active");
		data2 = "Active"
	}
	$.get('/office/editstatus', { name: data, status: data2}, function() {
		console.log("sending")
	})
	styleContactStatus();
})

function styleContactStatus() {
	for (var i=0;i<contactStatus.length;i++) {
		if (contactStatus[i].textContent === "Active") {
			contactStatus[i].classList.remove("inactive-status")
			contactStatus[i].classList.add("active-status")
		} else if (contactStatus[i].textContent === "Closed") {
			contactStatus[i].classList.remove("active-status")
			contactStatus[i].classList.add("inactive-status")
		}
	}
}

// project toggle sub leader 
var userInProj = $("li.user-project")

userInProj.on("click", function() {
	var username = $(this)[0].textContent;
	var projectId = $(this).parent().children(0)[0].textContent;
	var status;
	if ($(this).children()[0].textContent === "Sub Leader") {
		username = $(this).clone().children().remove().end().text();
		status = 0;
	} else {
		status = 1;
	}
	$.get('/office/edituserprojectlevel', { username: username, projectId: projectId, status: status}, function() {
		console.log("sending")
	})
	location.reload();
})


// org
var position = document.querySelectorAll(".position");
var sh = document.querySelector("#sh");
var hq = document.querySelector("#hq");
var eo = document.querySelector("#eo");
var o = document.querySelector("#o");
var dvp = document.querySelector("#dvp");
var bm = document.querySelector("#bm");
var o = document.querySelector("#lo");
var dm = document.querySelector("#dm");

var orgPositions = document.querySelector("#select-position");
var orgCategory = document.querySelector("#select-category");
if (orgCategory) {
	var selIndex = orgCategory.selectedIndex;
	var selValue = orgCategory.options[selIndex].value;
	// function displayNone(elements){
	// 	for (var i=0;i<elements.length;i++) {
	// 		elements[i].style.display = "none";
	// 	}
	// }
	orgCategory.onchange = function() {
		selIndex = orgCategory.selectedIndex;
		selValue = orgCategory.options[selIndex].value;
		if (selValue === "Shareholders") {
			orgPositions.innerHTML = `<option>Owner</option>
												  			<option>Chairman Of the Board</option>
												  			<option>Secretary</option>
												  			<option>Board Member</option>`;
		} else if (selValue === "Headquarters") {
			orgPositions.innerHTML = `<option>Main Headquarters</option>
												  			<option>Global Office Sub Headquarters</option>
												  			<option>District Headquarters</option>
												  			<option>Local Flagship Office</option>
												  			<option>Local Office</option>`;
		} else if (selValue === "Executive Office") {
			orgPositions.innerHTML = `<option>Chief Executive Officer(CEO)</option>
												  			<option>Chief Financial Officer(CFO)</option>
												  			<option>Chief Operations Officer(COO)</option>
												  			<option>Chief Technology Officer(CTO)</option>`;
		} else if (selValue === "Office") {
			orgPositions.innerHTML = `<option>President</option>
												  			<option>Secretary</option>
												  			<option>Executive Vice President</option>`;
		} else if (selValue === "Department VP") {
			orgPositions.innerHTML = `<option>Research and Development</option>
											  				<option>Legal</option>
												  			<option>Human Resources</option>
												  			<option>Sales/Marketing</option>
												  			<option>Customer Service</option>
												  			<option>Tech Support</option>
												  			<option>Mail Room/Email Forwarding</option>`;
		} else if (selValue === "Branch Management") {
			orgPositions.innerHTML = `<option>Global Executive Branch/Office</option>
												  			<option>Regional Manager</option>
												  			<option>District Manager</option>`;
		} else if (selValue === "Local Office") {
			orgPositions.innerHTML = `<option>Office Manager</option>
												  			<option>Supervisor</option>
												  			<option>Trainer</option>
												  			<option>Team Leader</option>
																<option>Assistant</option>
																<option>Entry Level</option>`;
		} else if (selValue === "Business Development") {
			orgPositions.innerHTML = `<option>Representative</option>
																<option>Consultant</option>
																<option>Independent Contractor</option>
																<option>Partner</option>
																<option>Third Party</option>
																<option>Researcher</option>
																<option>Broker</option>
																<option>Agent</option>
																<option>Governement</option>
																<option>Miscellaneous</option>`;
		} else if (selValue === "Miscellaneous") {
			orgPositions.innerHTML = `<option>Associate</option>
																<option>Associate Broker</option>
																<option>Aid</option>
																<option>Assistant</option>`;
		}
	}
}
