// const e = require("connect-flash");

// my org online office circle
$(document).on("click", ".org.member.largest-circle", function () {
	let pText = $(this).children("p");
	let div = $(this).children("div");
	pText.hide();
	div.show();
	$(this).addClass("org-padding").css("cursor", "default")
});

$(document).on("click", ".org.clickable.largest-circle", function () {
	let pText = $(this).children("p");
	let div = $(this).children("div");
	pText.hide();
	div.show();
	div.children(".inner-circle").css("cursor", "pointer")
	$(this).addClass("org-padding").css("cursor", "default")
});

// nav tabs
// var profileImg = document.querySelector(".profile-img");
var profileImg = document.querySelector(".nav-profile-img");
var tabs = document.querySelectorAll("#tabs>a");
profileImg.addEventListener("click", function () {
	for (i = 0; i < tabs.length; i++) {
		if (tabs[i].style.display == 'none') {
			tabs[i].style.display = 'inline-block';
		} else {
			tabs[i].style.display = 'none';
		}
	}
})

$(document).on('click', '.delete-btn', function (e) {
	e.preventDefault();
	$(this).parent().parent().find('.folderDelete').submit();
})



//jQuery
// slideCircles($("#profile-img"), $("#tabs>a"))
// function slideCircles(trigger, show) {
// 	trigger.on("click", function() {
// 		show.toggle("slide");
// 	})
// }

// calendar
// $(document).on("click", ".day-number", function () {
// 	var selectedDate = parseInt($(this).text()) + " " + $(".header>h1").text()
// 	$.get('/onlineoffice/calendar', function () {
// 		console.log($("#date-selected").text(selectedDate))
// 	})
// })
$(document).on("click", ".day-number", function () {
    var selectedDate = $(this).text().trim() + " " + $(".header>h1").text().trim();
    console.log("Selected date:", selectedDate); // Debugging statement
    var dateParts = selectedDate.split(" ");
    var month = new Date(Date.parse(dateParts[1] +" 1, 2012")).getMonth()+1;
    var day = dateParts[0];
    var year = dateParts[2];
    var formattedDate = year + "-" + (month < 10 ? "0" + month : month) + "-" + (day < 10 ? "0" + day : day);
    console.log("Formatted date:", formattedDate); // Debugging statement
    $("#date-selected").val(formattedDate);
    $('#add-event-form').modal('show');
})
clickableDates();
$(document).on("click", ".right, .left", function () {
	setTimeout(clickableDates, 1000)
})
function clickableDates() {
	var days = document.querySelectorAll(".day:not(.other)")
	for (var i = 0; i < days.length; i++) {
		var date = days[i];
		var number = date.children[1].textContent
		var day = date.children[0].textContent
		date.innerHTML = '<div class="day-name">' + day + '</div><div class="day-number" data-toggle="modal" data-target="#add-event-form"> ' + number + '</div>'
	}
}

// each contact
var contactStatus = $(".each-contact-status")
styleContactStatus();

$(contactStatus).on("click", function () {
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
	$.get('/onlineoffice/editstatus', { name: data, status: data2 }, function () {
		console.log("sending")
	})
	styleContactStatus();
})

function styleContactStatus() {
	for (var i = 0; i < contactStatus.length; i++) {
		if (contactStatus[i].textContent === "Active") {
			contactStatus[i].classList.remove("inactive-status")
			contactStatus[i].classList.add("active-status")
		} else if (contactStatus[i].textContent === "Closed") {
			contactStatus[i].classList.remove("active-status")
			contactStatus[i].classList.add("inactive-status")
		}
	}
}

// pipeline toggle sub leader 
var userPipe = $("li.user-pipeline")

userPipe.on("click", function () {
	var username = $(this)[0].textContent;
	var pipelineId = $(this).parent().children(0)[0].textContent;
	var status;
	if ($(this).children()[0].textContent === "Sub Leader") {
		username = $(this).clone().children().remove().end().text();
		status = 0;
	} else {
		status = 1;
	}
	$.get('/onlineoffice/edituserpipelinelevel', { username: username, pipelineId: pipelineId, status: status }, function () {
		console.log("sending")
	})
	location.reload();
})

var addDownline = $(".inner-circle.seven.add")
addDownline.on("click", function () {
	$("#edit-downline").hide()
	$(this).parent().parent().addClass("col-xs-12 col-sm-6 col-md-6")
	$("#create-downline").fadeIn()
})

var editDownline = $(".org.clickable .inner-circle.dl")
editDownline.on("click", function () {
	$("#create-downline").hide()
	$(this).parent().parent().parent().addClass("col-xs-12 col-sm-6 col-md-6")
	let editForm = $("#edit-downline")
	editForm.fadeIn()
	let editUrl = "/onlineoffice/organization/" + $(this).attr("class").split(" ")[3] + "?_method=PUT"
	editForm.attr("action", editUrl)
	let editName = $("#edit-downline-name")
	editName.val($(this).text().trim())
})

// task: only show today by default
var $comTaskDates = $(".task-dates");
var date = new Date;
var fullDateToday = dateFormat(date)

var allDatesPastWeek = [];
getAllWeekDates(7)
function getAllWeekDates(number) {
	while (number >= 0) {
		var temp = new Date(date.getFullYear(), date.getMonth(), date.getDate() - number)
		allDatesPastWeek.push(dateFormat(temp))
		number--;
	}
}

var allDatesPastMonth = [];
getAllMonthDates(30)
function getAllMonthDates(number) {
	while (number >= 0) {
		var temp = new Date(date.getFullYear(), date.getMonth(), date.getDate() - number)
		allDatesPastMonth.push(dateFormat(temp))
		number--;
	}
}

var allDatesPastTwoMonths = [];
getAllTwoMonthsDates(60)
function getAllTwoMonthsDates(number) {
	while (number >= 0) {
		var temp = new Date(date.getFullYear(), date.getMonth(), date.getDate() - number)
		allDatesPastTwoMonths.push(dateFormat(temp))
		number--;
	}
}

var allDatesPastThreeMonths = [];
getAllThreeMonthsDates(90)
function getAllThreeMonthsDates(number) {
	while (number >= 0) {
		var temp = new Date(date.getFullYear(), date.getMonth(), date.getDate() - number)
		allDatesPastThreeMonths.push(dateFormat(temp))
		number--;
	}
}

var allDatesPastYear = [];
getAllYearDates(365)
function getAllYearDates(number) {
	while (number >= 0) {
		var temp = new Date(date.getFullYear(), date.getMonth(), date.getDate() - number)
		allDatesPastYear.push(dateFormat(temp))
		number--;
	}
}

function dateFormat(date) {
	var month = date.getMonth() + 1;
	var day = (date.getDate() < 10 ? "0" : "") + date.getDate();
	var year = date.getFullYear();
	return month + "/" + day + "/" + year;
}

function showFiltered(date) {
	if ($gridTopDates.length > 0) {
		for (var i = 0; i < $comTaskDates.length; i++) {
			if ($comTaskDates[i].textContent === date) {
				$comTaskDates[i].parentNode.parentNode.classList.remove("display-none")
				$comTaskDates[i].parentNode.parentNode.classList.add("display-inline")
			}
		}

		for (var i = 0; i < $gridTopDates.length; i++) {
			if ($gridTopDates[i].textContent === date) {
				$gridTopDates[i].parentNode.classList.remove("display-none")
				$gridTopDates[i].parentNode.classList.add("display-inline")
			}
		}
	} else {
		for (var i = 0; i < $comTaskDates.length; i++) {
			if ($comTaskDates[i].textContent === date) {
				console.log($comTaskDates[i].textContent)
				$comTaskDates[i].parentNode.classList.remove("display-none")
			}
		}
	}
}

var filterBtn = $("#filter-btn")
var $gridTopDates = $(".grid-top-dates")

if ($gridTopDates.length > 0) {
	for (var i = 0; i < $comTaskDates.length; i++) {
		$comTaskDates[i].parentNode.parentNode.classList.remove("display-inline")
		$comTaskDates[i].parentNode.parentNode.classList.add("display-none")
	}
	allDatesPastThreeMonths.forEach(function (date) {
		showFiltered(date)
	})
} else {
	showFiltered(fullDateToday);
}

filterBtn.on("click", function () {
	filter = $('#community-task-filter').val();
	user_id = filterBtn.data('user-id');
	var url = '/onlineoffice/comTasksFilter/' + user_id
	$.get(url, { filter: filter }, function (d) {
		$('#comtasksTable').html(d);
	})
})

// filterBtn.on("click", function () {
// 	if ($gridTopDates.length > 0) {
// 		for (var i = 0; i < $comTaskDates.length; i++) {
// 			$comTaskDates[i].parentNode.parentNode.classList.remove("display-inline")
// 			$comTaskDates[i].parentNode.parentNode.classList.add("display-none")
// 		}
// 		for (var i = 0; i < $gridTopDates.length; i++) {
// 			$gridTopDates[i].parentNode.classList.remove("display-inline")
// 			$gridTopDates[i].parentNode.classList.add("display-none")
// 		}
// 	} else {
// 		for (var i = 0; i < $comTaskDates.length; i++) {
// 			$comTaskDates[i].parentNode.classList.add("display-none")
// 		}
// 	}
// 	if ($("#community-task-filter").val() === "Today") {
// 		showFiltered(fullDateToday);
// 	} else if ($("#community-task-filter").val() === "Past 7 Days") {
// 		allDatesPastWeek.forEach(function (date) {
// 			showFiltered(date)
// 		})
// 	} else if ($("#community-task-filter").val() === "Past 30 Days") {
// 		allDatesPastMonth.forEach(function (date) {
// 			showFiltered(date)
// 		})
// 	} else if ($("#community-task-filter").val() === "Past 60 Days") {
// 		allDatesPastTwoMonths.forEach(function (date) {
// 			showFiltered(date)
// 		})
// 	} else if ($("#community-task-filter").val() === "Past 90 Days") {
// 		allDatesPastThreeMonths.forEach(function (date) {
// 			showFiltered(date)
// 		})
// 	} else if ($("#community-task-filter").val() === "Past Year") {
// 		allDatesPastYear.forEach(function (date) {
// 			showFiltered(date)
// 		})
// 	}
// 	displayOnCalendar();
// })



// tasks: toggle task status
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December"]
var $task = $(".com-tasks");
$task.on("click", function () {
	var taskStatus;
	var taskId = $(this).attr("id");
	if ($(this).hasClass("completed-task")) {
		$(this).removeClass("completed-task")
		taskStatus = 0;
	} else {
		$(this).addClass("completed-task")
		taskStatus = 1;
	}
	var url = '/onlineoffice/completecomtask/' + taskId
	$.get(url, { taskStatus: taskStatus, taskId: taskId }, function () {
		console.log("sending")
	}).then(function () {
		location.reload();
	})
})

displayOnCalendar();
function displayOnCalendar() {
	var calendarDate = $(".header h1").text()
	var calendarDay = $(".day:not(.other) .day-number")

	var taskDates = []

	for (var i = 0; i < $task.length; i++) {
		if ($task[i].dataset.attribute && !$task[i].classList.contains("display-none")) {
			taskDates.push($task[i].dataset.attribute.split("/"))
		}
	}

	taskDates.forEach(function (dates) {
		if (months[dates[0] - 1] + " " + dates[2] === calendarDate) {
			for (var i = 0; i < calendarDay.length; i++) {
				if (calendarDay[i].textContent.trim() === dates[1]) {
					calendarDay[i].classList.add("testing")
				}
			}
		}
	})
}


// GRID 
$(".each-task-status").on("click", function () {
	var taskStatus;
	var taskId = $(this).attr("id");
	if ($(this).hasClass("completed")) {
		taskStatus = 0;
	} else {
		taskStatus = 1;
	}
	var url = '/onlineoffice/completecomtask/' + taskId
	$.get(url, { taskStatus: taskStatus, taskId: taskId }, function () {
		console.log("sending")
	})
	setTimeout(function () {
		location.reload();
	}, 250)
})

$(document).on('click', '.task-checkbox', function () {

	var taskStatus = $(this).is(":checked") ? 1 : 0;
	var taskId = $(this).data('id');

	var checkbox = $(this);
	var parent = checkbox.parent();
	checkbox.hide();
	parent.append('<i class="fa fa-spinner rotate loading-ind" style="color: grey" aria-hidden="true"></i>')

	var url = '/onlineoffice/completecomtask/' + taskId
	$.get(url, { taskStatus: taskStatus, taskId: taskId }, function () {
		$('.loading-ind').hide();
		checkbox.show();
		// parent.html('<i class="fa fa-check-circle fa-2x" style="color: green" aria-hidden="true"></i>');
	})
})

// $(document).on('click', '.delete-btn', function(e){
// 	e.preventDefault();
// 	var btn = $(this);
// 	var url = btn.data('url');
// 	$.post(url, {_method: 'DELETE'}, function (d) {
// 		// console.log(d);
// 		btn.remove()
// 		// parent.html('<i class="fa fa-check-circle fa-2x" style="color: green" aria-hidden="true"></i>');
// 	})
// })

$(document).ready(function () {
	// $('#myModal').modal();
	$('#chatBtn1').click(function (e) {
		e.preventDefault();

	});
});

let jitsiInitiated = false;
$(document).on('click', '#chatBtn', function (e) {
	e.preventDefault();

	if (!jitsiInitiated) {
		$('#meet').show();

		let dName = $('input[name="dispay_name"]').val()
		let email = $('input[name="user_email"]').val()
		let roomName = $('input[name="room_name"]').val()
		let width = document.body.clientWidth - 200;
		let height = screen.height - 300;

		if (width < 800)
			width += 150;

		const domain = 'meet.jit.si';
		const options = {
			roomName: roomName,
			enableWelcomePage: false,
			width: width,
			height: height,
			userInfo: {
				displayName: dName,
				email: email,
			},
			parentNode: document.querySelector('#meet'),
			// configOverwrite: {
			// 	disableDeepLinking: true
			// },
			// interfaceConfigOverwrite: {
			// 	MOBILE_APP_PROMO: false,
			// },
		};
		const api = new JitsiMeetExternalAPI(domain, options);
	}

})

function toggleInvite(){
	$('.usersSection').toggle();
}