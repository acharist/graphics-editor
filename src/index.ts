(function () {
    //Tools panel DOM node
    const toolsPanel = <HTMLElement>document.querySelector('.tools-panel');

    //Selected tool DOM node
    let selected: string = null

    //Create canvas
    const canvas = <HTMLCanvasElement>document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    //Size % color variables with default values
    let size: number = 2;
    let color: string = '#000000';

    //Set canvas width & height
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // canvas.style.border = '1px solid #414141';

    //Set params for all tools
    ctx.strokeStyle = color;
    ctx.lineJoin = 'round';
    ctx.lineWidth = size;

    const mouseup = () => {
        canvas.onmousedown = null;
        canvas.onmousemove = null;
    }

    //Pass mousemove event to all child
    function applyDrawTool(tool: string, downEvent?: MouseEvent): void {
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

    const brush = (size: number, color: string) => {
        const clickX: Array<number> = new Array();
        const clickY: Array<number> = new Array();

        const draw = (x: Array<number>, y: Array<number>) => {
            ctx.beginPath();
            ctx.moveTo(x[y.length - 2], y[y.length - 2]);
            ctx.lineTo(x[x.length - 1], y[y.length - 1]);
            ctx.closePath();
            ctx.stroke();
        }

        canvas.onmousemove = (moveEvent: MouseEvent) => {
            clickX.push(moveEvent.offsetX);
            clickY.push(moveEvent.offsetY);

            draw(clickX, clickY);
        };
    }

    const line = (downEvent: MouseEvent) => (size: number, color: string) => {
        const draw = (lastX: number, lastY: number, newX: number, newY: number) => {
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(newX, newY);
            ctx.closePath();
            ctx.stroke();
        }

        canvas.onmouseup = (upEvent: MouseEvent) => {
            draw(downEvent.offsetX, downEvent.offsetY, upEvent.offsetX, upEvent.offsetY);
            canvas.onmouseup = mouseup;
        }
    }

    const rectangle = (downEvent: MouseEvent) => (size: number, color: string) => {
        const draw = (lastX: number, lastY: number, newX: number, newY: number) => {
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(lastX, newY);
            ctx.lineTo(newX, newY);
            ctx.lineTo(newX, lastY);
            ctx.lineTo(lastX, lastY);
            ctx.stroke();
        }

        canvas.onmouseup = (upEvent: MouseEvent) => {
            draw(downEvent.offsetX, downEvent.offsetY, upEvent.offsetX, upEvent.offsetY);
            canvas.onmouseup = mouseup;
        }
    }
    
    const circle = (downEvent: MouseEvent) => (size: number, color: string) => {
        const draw = (x: number, y: number, radius: number) => {
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            ctx.stroke();
        }
        
        canvas.onmouseup = (upEvent: MouseEvent) => {
            //Define distance between to ponts
            let radius: number = Math.sqrt(Math.pow(downEvent.offsetX - upEvent.offsetX, 2) + Math.pow(downEvent.offsetY - upEvent.offsetY, 2));
            draw(downEvent.offsetX, downEvent.offsetY, radius);
            canvas.onmouseup = mouseup;
        }
    }

    const clean = (selected: string) => {
        selected === 'clean' && ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function defineClick(target: HTMLElement, tag: string) {
        while(target !== this) {
            if(target.tagName === 'LI') {
                return target.dataset.tool;
            } else {
                target = target.parentElement;
            }
        }
    }

    //Set background for selected
    toolsPanel.addEventListener('click', (event: MouseEvent) => {
        let target = event.target as HTMLElement;
        selected = target = defineClick.apply(this, [target, 'LI']);
        clean(selected);
    });

    //Reset canvas events
    canvas.onmouseup = mouseup;

    canvas.onmouseleave = () => {
        canvas.onmousedown = null;
        canvas.onmousemove = null;
    }

    canvas.addEventListener('mousedown', (event: MouseEvent) => {
        if(selected !== null) {
            applyDrawTool(selected, event);
        }
    });
})();