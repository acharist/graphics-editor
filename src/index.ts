(function (){
    //Tools panel DOM node
    const toolsPanel = <HTMLElement> document.querySelector('.tools_panel');

    //Selected tool DOM node
    const selected = document.querySelectorAll('.selected');

    //Create canvas
    const canvas = <HTMLCanvasElement> document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    //Set canvas width & height
    canvas.width = 1200;
    canvas.height = 600;
    canvas.style.border = '1px solid #414141';

    //Set selected on click
    function setSelected(event: MouseEvent) {
        const target = event.target;
    }

    toolsPanel.addEventListener('click', setSelected);
})();