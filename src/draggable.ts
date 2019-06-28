export default function draggable(element: HTMLElement, dragElement?: HTMLElement,) {
    let shiftX: number = null;
    let shiftY: number = null;
    let zIndex: string = null;

    element.ondragstart = () => {
        return false;
    }

    const mousedown = (event: MouseEvent) => {
        //Save prev z-index
        zIndex = element.style.zIndex;
        setZIndex(element, '9999');

        const coords = getCoords(element);
        shiftX = event.pageX - coords.left;
        shiftY = event.pageY - coords.top;
        
        document.onmousemove = mousemove;
        document.onmouseup = mouseup;
    }

    const mousemove = (event: MouseEvent) => {
        setPosition(element, event);
    }

    const mouseup = () => {
        document.onmouseup = null;
        document.onmousemove = null;
        setZIndex(element, zIndex);
    }

    const setPosition = (element: HTMLElement, event: MouseEvent) => {
        element.style.zIndex = '9999';
        element.style.left = event.pageX - shiftX + 'px';
        element.style.top = event.pageY - shiftY + 'px';
    }

    const setZIndex = (element: HTMLElement, zIndex: string) => {
        element.style.zIndex = zIndex;
    }

    const getCoords = (element: HTMLElement) => {
        const box = element.getBoundingClientRect();
        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    }

    (dragElement ? dragElement : element).addEventListener('mousedown', mousedown);
}