(function () {
    //Tools panel DOM node
    const toolsPanel = <HTMLElement>document.querySelector('.tools_panel');

    //Selected tool DOM node
    const selected = document.querySelector('.selected');

    //Clear canvas button
    const clearCanvasBtn = <HTMLElement> document.querySelector('.clear_canvas');

    //Create canvas
    const canvas = <HTMLCanvasElement>document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    //Size % color variables with default values
    let size: number = 5;
    let color: string = '#000000';

    //Set canvas width & height
    canvas.width = 1200;
    canvas.height = 600;
    canvas.style.border = '1px solid #414141';

    //Set selected on click
    function setSelected(event: MouseEvent) {
        const target = event.target as HTMLElement;
        //Mark selected on click
        if (target.tagName === 'LI') {
            selected.textContent = target.textContent;
        }
    }

    //Pass mousemove event to all child
    function applyDrawTool(tool: string, downEvent: MouseEvent): void {
        switch (tool) {
            case 'Brush':
                //Call func for brush
                brush(downEvent)(size, color);
                break;
            case 'Draw line':
                //Call func for draw line
                break;
            case 'Draw rectangle':
                //Call func for draw rectangle
                break;
            case 'Draw circle':
                //Call func for draw circle
                break;
            default:
                break;
        }
    }

    function brush(downEvent: MouseEvent) {
        return (size: number, color: string) => {
            const clickX: Array<number> = new Array();
            const clickY: Array<number> = new Array();

            canvas.onmousemove = (moveEvent: MouseEvent) => {
                clickX.push(moveEvent.offsetX);
                clickY.push(moveEvent.offsetY);

                ctx.strokeStyle = color;
                ctx.lineJoin = 'round';
                ctx.lineWidth = size;

                for (let i: number = 0; i < clickX.length; i++) {
                    ctx.beginPath();
                    //Move to with delta X and Y pos
                    ctx.moveTo(clickX[i - 1], clickY[i - 1]);
                    ctx.lineTo(clickX[i], clickY[i]);
                    ctx.closePath();
                    ctx.stroke();
                }
            }
        }
    }

    //Clear canvas
    clearCanvasBtn.onclick = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    //Reset canvas events
    canvas.onmouseup = () => {
        canvas.onmousedown = null;
        canvas.onmousemove = null;
    }
    
    canvas.onmouseleave = () => {
        canvas.onmousedown = null;
        canvas.onmousemove = null;
    }

    canvas.addEventListener('mousedown', (event: MouseEvent) => {
        applyDrawTool(selected.textContent, event);
    });

    toolsPanel.addEventListener('click', setSelected);
})();