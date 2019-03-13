(function () {
    //Tools panel DOM node
    const toolsPanel = <HTMLElement>document.querySelector('.tools_panel');

    //Selected tool DOM node
    const selected = document.querySelector('.selected');

    //Clear canvas button
    const clearCanvasBtn = <HTMLElement>document.querySelector('.clear_canvas');

    //Create canvas
    const canvas = <HTMLCanvasElement>document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    //Size % color variables with default values
    let size: number = 10;
    let color: string = '#000000';

    //Set canvas width & height
    canvas.width = 1200;
    canvas.height = 600;
    canvas.style.border = '1px solid #414141';

    //Set params for all tools
    ctx.strokeStyle = color;
    ctx.lineJoin = 'round';
    ctx.lineWidth = size;

    const mouseup = () => {
        canvas.onmousedown = null;
        canvas.onmousemove = null;
    }

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
                line(downEvent)(size, color);
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

    const brush = (downEvent: MouseEvent) => (size: number, color: string) => {
        const clickX: Array<number> = new Array();
        const clickY: Array<number> = new Array();

        //Add coords of click immediately after mouse is pressed down
        clickX.push(downEvent.offsetX);
        clickY.push(downEvent.offsetY);

        const draw = (x: Array<number>, y: Array<number>) => {
            for (let i: number = 0; i < x.length; i++) {
                ctx.beginPath();
                //Move to with delta X and Y pos
                ctx.moveTo(x[i - 1], y[i - 1]);
                ctx.lineTo(x[i], y[i]);
                ctx.closePath();
                ctx.stroke();
            }
        }

        if (clickX.length || clickY.length) {
            //Add a value that is less than the original by one
            clickX.unshift(clickX[0] - 1);
            clickY.unshift(clickY[0] - 1);
            //Draw it immediately
            draw(clickX, clickY);
        }

        canvas.onmousemove = (moveEvent: MouseEvent) => {
            clickX.push(moveEvent.offsetX);
            clickY.push(moveEvent.offsetY);

            draw(clickX, clickY);
        };
    }

    const line = (downEvent: MouseEvent) => (size: number, color: string) => {
        let mouseX;
        let mouseY;
        let lastMouseX = downEvent.offsetX;
        let lastMouseY = downEvent.offsetY;
        
        canvas.onmouseup = (upEvent: MouseEvent) => {
            mouseX = upEvent.offsetX;
            mouseY = upEvent.offsetY;

            ctx.beginPath();
            //Move to with delta X and Y pos
            ctx.moveTo(lastMouseX, lastMouseY);
            ctx.lineTo(mouseX, mouseY);
            ctx.closePath();
            ctx.stroke();

            canvas.onmouseup = mouseup;
        }
    }

    //Clear canvas
    clearCanvasBtn.onclick = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    //Reset canvas events
    canvas.onmouseup = mouseup; 

    canvas.onmouseleave = () => {
        canvas.onmousedown = null;
        canvas.onmousemove = null;
    }

    canvas.addEventListener('mousedown', (event: MouseEvent) => {
        applyDrawTool(selected.textContent, event);
    });

    toolsPanel.addEventListener('click', setSelected);
})();