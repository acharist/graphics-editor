var _this = this;
import draggable from './draggable';
import defineClick from './defineClick';
//Tools panel DOM node
var toolsPanel = document.querySelector('.tools-panel');
var toolsPanelDraggable = document.querySelector('.tools-panel__draggable');
var rect = document.querySelector('.rect');
//Selected tool DOM node
var selected = null;
//Create canvas
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
//Size % color variables with default values
var size = 2;
var color = '#000000';
draggable(toolsPanel, toolsPanelDraggable);
draggable(rect);
//Set canvas width & height
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// canvas.style.border = '1px solid #414141';
//Set params for all tools
ctx.strokeStyle = color;
ctx.lineJoin = 'round';
ctx.lineWidth = size;
var mouseup = function () {
    canvas.onmousedown = null;
    canvas.onmousemove = null;
};
//Pass mousemove event to all child
function applyDrawTool(tool, downEvent) {
    switch (tool) {
        case 'brush':
            //Call func for brush
            brush(size, color);
            break;
        case 'line':
            //Call func for draw line
            line(downEvent)(size, color);
            break;
        case 'rectangle':
            //Call func for draw rectangle
            rectangle(downEvent)(size, color);
            break;
        case 'circle':
            //Call func for draw circle
            circle(downEvent)(size, color);
            break;
        default:
            break;
    }
}
var brush = function (size, color) {
    var clickX = new Array();
    var clickY = new Array();
    var draw = function (x, y) {
        ctx.beginPath();
        ctx.moveTo(x[y.length - 2], y[y.length - 2]);
        ctx.lineTo(x[x.length - 1], y[y.length - 1]);
        ctx.closePath();
        ctx.stroke();
    };
    canvas.onmousemove = function (moveEvent) {
        clickX.push(moveEvent.pageX);
        clickY.push(moveEvent.pageY);
        draw(clickX, clickY);
    };
};
var line = function (downEvent) { return function (size, color) {
    var draw = function (lastX, lastY, newX, newY) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(newX, newY);
        ctx.closePath();
        ctx.stroke();
    };
    canvas.onmouseup = function (upEvent) {
        draw(downEvent.pageX, downEvent.pageY, upEvent.pageX, upEvent.pageY);
        canvas.onmouseup = mouseup;
    };
}; };
var rectangle = function (downEvent) { return function (size, color) {
    var draw = function (lastX, lastY, newX, newY) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(lastX, newY);
        ctx.lineTo(newX, newY);
        ctx.lineTo(newX, lastY);
        ctx.lineTo(lastX, lastY);
        ctx.stroke();
    };
    canvas.onmouseup = function (upEvent) {
        draw(downEvent.pageX, downEvent.pageY, upEvent.pageX, upEvent.pageY);
        canvas.onmouseup = mouseup;
    };
}; };
var circle = function (downEvent) { return function (size, color) {
    var draw = function (x, y, radius) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.stroke();
    };
    canvas.onmouseup = function (upEvent) {
        //Define distance between to ponts
        var radius = Math.sqrt(Math.pow(downEvent.pageX - upEvent.pageX, 2) + Math.pow(downEvent.pageY - upEvent.pageY, 2));
        draw(downEvent.pageX, downEvent.pageY, radius);
        canvas.onmouseup = mouseup;
    };
}; };
var clean = function (selected) {
    selected === 'clean' && ctx.clearRect(0, 0, canvas.width, canvas.height);
};
//Set background for selected
toolsPanel.addEventListener('click', function (event) {
    var target = event.target;
    selected = target = defineClick.apply(_this, [target, 'LI']);
    clean(selected);
});
//Reset canvas events
canvas.onmouseup = mouseup;
canvas.onmouseleave = function () {
    canvas.onmousedown = null;
    canvas.onmousemove = null;
};
canvas.addEventListener('mousedown', function (event) {
    if (selected !== null) {
        applyDrawTool(selected, event);
    }
});
