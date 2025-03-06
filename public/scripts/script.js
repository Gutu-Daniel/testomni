// login fade on click
$loginForm = $(".login-form")
$loginForm.on("click", function() {
	$loginForm.children("h1").hide();
	$loginForm.children("h2").fadeIn();
	$loginForm.children("form").fadeIn();
})

// circle preview
var $circles = $(".content.row").children().children().children();

$circles.on("click", function() {
	if ($circles.hasClass("expand-circle-tabs")) {
		$circles.removeClass("expand-circle-tabs")
		$circles.children(2).removeClass("show-content")
		$(this).addClass("expand-circle-tabs")
		$(this).children(2).addClass("show-content")
	} else {
		$(this).addClass("expand-circle-tabs")
		$(this).children(2).addClass("show-content")
	}
});

// semi circle tabs
(function() {
	function halfCircleTabToggle(halfCircle, section) {
		halfCircle.on("click", function() {
			halfCircle.removeClass("semi-circle-select");
			$(this).addClass("semi-circle-select");
			section.show();
			var temp = $(this).attr("data-attribute");
			section.not("." + temp + "").hide();
		})
	} 

	halfCircleTabToggle($(".content-tabs").children(), $(".section"))
	halfCircleTabToggle($(".wall-tabs").children(), $(".wall-section"))
	halfCircleTabToggle($(".app-tabs").children(), $(".apps"))

	// ++++++++ previous code +++++++++
	// var $semiCircles = $(".content-tabs").children();
	// var $section = $(".section");

	// $semiCircles.on("click", function() {
	// 	$semiCircles.removeClass("semi-circle-select");
	// 	$(this).addClass("semi-circle-select");
	// 	$section.show();
	// 	var temp = $(this).attr("data-attribute")
	// 	$section.not("." + temp + "").hide();
	// })
}())

// tabs show && hide
var $profileImgContent = $(".profile-img.content-page");
var $tabs = $(".tabs").children();

$profileImgContent.on("click", function() {
	if ($tabs.css("display") === "none") {
		$tabs.css("display", "inline-block");
	} else {
		$tabs.css("display", "none");
	}
})


// login
$("#login-text").fadeIn(3000).css("display","inline-block");

// index inner outer circle
$(".outer-circle").on("click", function() {
	if ($(this).children("p").is(":visible")) {
		$(this).children("a").css("display", "inline-block")
		$(this).children("p").hide()
	} else {
		$(this).children("a").hide()
		$(this).children("p").show()
	}
})

// for mobile uploads preventing sideways
function getOrientation(file, callback) {
  var reader = new FileReader();

  reader.onload = function(event) {
    var view = new DataView(event.target.result);

    if (view.getUint16(0, false) != 0xFFD8) return callback(-2);

    var length = view.byteLength,
        offset = 2;

    while (offset < length) {
      var marker = view.getUint16(offset, false);
      offset += 2;

      if (marker == 0xFFE1) {
        if (view.getUint32(offset += 2, false) != 0x45786966) {
          return callback(-1);
        }
        var little = view.getUint16(offset += 6, false) == 0x4949;
        offset += view.getUint32(offset + 4, little);
        var tags = view.getUint16(offset, little);
        offset += 2;

        for (var i = 0; i < tags; i++)
          if (view.getUint16(offset + (i * 12), little) == 0x0112)
            return callback(view.getUint16(offset + (i * 12) + 8, little));
      }
      else if ((marker & 0xFF00) != 0xFF00) break;
      else offset += view.getUint16(offset, false);
    }
    return callback(-1);
  };

  reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
};

var fileInput = document.getElementById("file-input");
if (fileInput) {
	fileInput.onchange = function(event) {
	  var file = event.target.files[0];

		getOrientation(file, function(orientation) {
	   	var temp = document.querySelector("#profile_orientation");
	   	temp.value = orientation;
	  });
	};
}


function resetOrientation(srcBase64, srcOrientation, callback) {
	var img = new Image();	

	img.onload = function() {
  	var width = img.width,
    		height = img.height,
        canvas = document.createElement('canvas'),
	  		ctx = canvas.getContext("2d");
		
    // set proper canvas dimensions before transform & export
		if (4 < srcOrientation && srcOrientation < 9) {
    	canvas.width = height;
      canvas.height = width;
    } else {
    	canvas.width = width;
      canvas.height = height;
    }
	
  	// transform context before drawing image
		switch (srcOrientation) {
      case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
      case 3: ctx.transform(-1, 0, 0, -1, width, height ); break;
      case 4: ctx.transform(1, 0, 0, -1, 0, height ); break;
      case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
      case 6: ctx.transform(0, 1, -1, 0, height , 0); break;
      case 7: ctx.transform(0, -1, -1, 0, height , width); break;
      case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
      default: break;
    }

		// draw image
    ctx.drawImage(img, 0, 0);

		// export base64
		callback(canvas.toDataURL());
  };

	img.src = srcBase64;
}

var originalImage = document.getElementById("rotate")
if (originalImage) {
	resetOrientation(originalImage.src, 5, function(resetBase64Image) {
		originalImage.src = resetBase64Image;
	});
}


// var video = document.querySelector(".each-video");
$video = $(".each-video")
if ($video) {
	$video.on("click", function() {
		var videoName = $(this).attr("id")
		$("#player").html("<video id='video-player' width='540' height='310' controls='true' loop autoplay><source src='/videos/media/" + videoName + "' type='video/mp4'></video>")
		$("#player-text").hide()
	})
}


// wall post
var $postEditBtn = $(".edit-post-btn")
$postEditBtn.on("click", function() {
	$form = $(this).parent().children(".post-edit-form")
	if ($(this).text() === "Edit") {
		$form.show();
		$(this).text("Hide");
	} else if ($(this).text() === "Hide") {
		$form.hide();
		$(this).text("Edit");
	}
})

// backoffice
var $sideNav = $(".sidebar-nav").children(".sidebar-tabs");
var $section = $(".section");

$sideNav.on("click", function() {
	$sideNav.removeClass("select");
	$(this).addClass("select");
	$section.show();
	var temp = $(this).attr("data-attribute")
	$section.not("." + temp + "").hide();
})

var backofficeOverlay = $(".backoffice-overlay");
var addDescription = $(".add-description");

// if (backofficeOverlay) {
// 	addDescription.on("click", function() {
// 		$(this).before(`<div class="form-group">
// 					<label for="task_description">Description</label>
// 					<textarea type="text" name="task_description" class="form-control"></textarea>
// 				</div>`)
// 	})
// }

(function() {
	var $instructions = $('#instructions');
	if ($instructions.length) {
		$('#instruction-handler').on('click', function() {
			$instructions.children('#instruction-text').toggle()
		})
	}
})();
