import defineClick from './defineClick';
export default function draggable(element, dragElement) {
    var _this = this;
    var selected = null;
    var shiftX = null;
    var shiftY = null;
    var zIndex = element.style.zIndex;
    element.ondragstart = function () {
        return false;
    };
    var mousedown = function (event) {
        var target = event.target;
        try {
            selected = defineClick.apply(_this, [target, 'LI']);
        }
        catch (err) {
            selected = null;
        }
        var coords = getCoords(element);
        shiftX = event.pageX - coords.left;
        shiftY = event.pageY - coords.top;
        document.onmousemove = mousemove;
        document.onmouseup = mouseup;
    };
    var mousemove = function (event) {
        if (dragElement) {
            if (selected === dragElement.dataset.tool) {
                setPosition(element, event);
            }
        }
        else {
            setPosition(element, event);
        }
    };
    var mouseup = function () {
        document.onmouseup = null;
        document.onmousemove = null;
    };
    var setPosition = function (element, event) {
        element.style.zIndex = '9999';
        element.style.left = event.pageX - shiftX + 'px';
        element.style.top = event.pageY - shiftY + 'px';
    };
    var getCoords = function (element) {
        var box = element.getBoundingClientRect();
        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    };
    (dragElement ? dragElement : element).addEventListener('mousedown', mousedown);
}
