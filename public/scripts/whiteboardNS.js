var isLoginScreen = true;
var canvasWidth = document.body.clientWidth;
var canvasHeight = document.body.clientHeight;

$("#open-whiteboard").on("click", function (e) {
    e.preventDefault();
    if ($(this).text() === "Whiteboard") {
        if ($(".whiteboard").length > 0) {
            $(".whiteboard").parent().css("height", "100vh");
            // canvasWidth = $(".whiteboard").parent().width();
            canvasHeight = $(".whiteboard").parent().height();
            $(".tools-login").prepend('<div class="cb-reg"><i id="clear_board" class="fa fa-trash-o fa-3x" aria-hidden="true"></i></div>');
            $(".whiteboard").show();
            whiteboard("myCanvas");
            $(this).text("Close Whiteboard");
            $(".container.login-form").hide();
        }
    } else if ($(this).text() === "Close Whiteboard") {
        $(".whiteboard").parent().css("height", "auto")
        $(".cb-reg").remove();
        $(".whiteboard").hide();
        $(this).text("Whiteboard");
        $(".container.login-form").show();
    }
});

if (!$('.login-screen').length) {
    // $("#open-whiteboard").on("click", function() {
    //    if ($(this).text() === "Whiteboard") {
    if ($(".whiteboard").length > 0) {
        $(".whiteboard").css("height", "100vh");
        // canvasWidth = $(".whiteboard").width();
        canvasHeight = $(".whiteboard").height();
        $(".tools-login").prepend('<div class="cb-reg"><i id="clear_board" class="fa fa-trash-o fa-3x" aria-hidden="true"></i></div>');
        $(".whiteboard").show();
        whiteboard("myCanvas");
        $(this).text("Close Whiteboard");
        $(".container.login-form").hide();
    }
    //    } else if ($(this).text() === "Close Whiteboard") {
    //       $(".whiteboard").parent().css("height", "auto")
    //       $(".cb-reg").remove();
    //       $(".whiteboard").hide();
    //       $(this).text("Whiteboard");
    //       $(".container.login-form").show();
    //    }
    // });
}

async function initWB() {
    if ($('.login-screen').length) {
        isLoginScreen = true;


    } else {

    }
}



function whiteboard(id) {
    var clickX = new Array();
    var clickY = new Array();
    var clickDrag = new Array();
    var clickColor = new Array();
    var clickSize = new Array();
    var paint;
    var toolSelected = 'paint'
    var colors = document.getElementsByClassName('color');

    // Settings
    var strokeColorSetting = "#000";
    var strokeSizeSetting;



    // Elements
    var canvas = document.getElementById(id);
    var control = document.getElementById("control");
    var context = canvas.getContext("2d");
    var brushDisplay = document.getElementById('brush');
    var colorDisplay = document.getElementById('color');
    var paintList = document.getElementsByClassName("tool-thin");
    var toolList = document.getElementsByClassName("tool");
    var paintKit = document.getElementById('paints');
    var toolKit = document.getElementById('tools');

    for (var i = 0; i < colors.length; i++) {
        colors[i].addEventListener('click', onColorUpdate, false);
    }

    // Document function
    function initializeDocument() {
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
    }

    function get_mouse_position(canvas, event) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    };

    function onColorUpdate(e) {
        strokeColorSetting = e.target.className.split(' ')[1];
    }

    // Drawing functions
    function addClick(x, y, dragging) {
        clickX.push(x);
        clickY.push(y);
        clickDrag.push(dragging);
        clickColor.push(strokeColorSetting);
        if (strokeColorSetting !== "white") {
            if ($("#size").val() <= 30 && $("#size").val() >= 1) {
                strokeSizeSetting = $("#size").val();
            } else {
                strokeSizeSetting = 3;
            }
        } else {
            strokeSizeSetting = 40;
        }
        clickSize.push(strokeSizeSetting);
    }

    function resetCanvas() {
        clickX = new Array();
        clickY = new Array();
        clickDrag = new Array();
        clickColor = new Array();
        clickSize = new Array();
        canvas.style.background = "none";
    }

    function clearCanvas(context) {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    }

    function redraw(context) {
        clearCanvas(context);
        context.lineJoin = "round";
        for (var i = 0; i < clickX.length; i++) {
            context.lineWidth = clickSize[i];
            context.beginPath();
            if (clickDrag[i] && i) {
                context.moveTo(clickX[i - 1], clickY[i - 1]);
            }
            else {
                context.moveTo(clickX[i] - 1, clickY[i]);
            }
            context.lineTo(clickX[i], clickY[i]);
            context.closePath();
            context.strokeStyle = clickColor[i];
            context.stroke();
        }
    }

    // main:
    initializeDocument();

    // Drawing board event functions
    function handleStart(event) {
        if (toolSelected == 'paint') {
            mouse_position = get_mouse_position(canvas, event);
            var mouseX = mouse_position.x;
            var mouseY = mouse_position.y;
            paint = true;
            addClick(mouse_position.x, mouse_position.y);
            redraw(context);
        }
        else if (toolSelected == 'background') {
            canvas.style.background = strokeColorSetting;
        }
    }

    function handleMove(event) {
        event.preventDefault();
        if (paint && toolSelected == 'paint') {
            mouse_position = (event.type != "touchmove") ? get_mouse_position(canvas, event) : get_mouse_position(canvas, event.touches[0]);
            addClick(mouse_position.x, mouse_position.y, true)
            redraw(context);
        }
    }

    function handleEnd(event) {
        if (toolSelected == 'paint') {
            paint = false;
        }
    }

    // Drawing board events
    canvas.addEventListener('mousedown', handleStart, false);
    canvas.addEventListener('mousemove', handleMove, false);
    canvas.addEventListener('mouseup', handleEnd, false);
    canvas.addEventListener('mouseleave', handleEnd, false);
    canvas.addEventListener("touchstart", handleStart, false);
    canvas.addEventListener("touchend", handleEnd, false);
    canvas.addEventListener("touchcancel", handleEnd, false);
    canvas.addEventListener("touchmove", handleMove, false);

    $("#clear_board").on("click", function () {
        clearCanvas(context);
        resetCanvas()
    });
}