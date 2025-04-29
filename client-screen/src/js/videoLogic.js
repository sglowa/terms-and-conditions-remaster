/** @typedef {import("@shared/types").Coords} Coords */

/** @param {(Coords)=>void} listenToCoords*/
function setupVideoLogic(listenToCoords) {
    const screenDim = { x: window.innerWidth, y: window.innerHeight };

    /** @type {HTMLVideoElement} */
    const video = document.querySelector('#videoToMask');
    /** @type {HTMLImageElement} */
    const img = document.querySelector("#brushImg");
    /** @type {HTMLCanvasElement} */
    const drawCanvas = document.querySelector('#drawingCnv');
    const drawCtx = drawCanvas.getContext('2d');
    /** @type {HTMLCanvasElement} */
    const videoCanvas = document.querySelector('#videoCnv');
    const videoCtx = videoCanvas.getContext('2d');

    document.addEventListener('click',()=>{
        video.play();
        video.muted =false;
    },{once:true});

    video.addEventListener('ended',()=>{
        video.play();
        video.muted =false;
    });

    const coordsArr = [];
    const MAX_COORDS = 100; // prevent buffer overgrowth

    const renderingCtx0 = 'darken';
    const renderingCtx1 = 'multiply';
    const renderingCtx2 = 'darken';
    
    // Object.assign(window,{
    //     rendringCtx0: renderingCtx0,
    //     rendringCtx1: renderingCtx1,
    //     rendringCtx2: renderingCtx2
    // })
    //@ts-ignore
    window.renderingCtx0 = 'darken';
    //@ts-ignore
    window.renderingCtx1 = 'multiply';
    //@ts-ignore
    window.renderingCtx2 = 'darken';

    // Wait for brush image to load before initializing everything
    img.onload = () => {
        initCanvases();
        startDrawingLoop();
    };

    function initCanvases() {
        drawCanvas.width = screenDim.x;
        drawCanvas.height = screenDim.y;
        videoCanvas.width = screenDim.x;
        videoCanvas.height = screenDim.y;
    }

    function startDrawingLoop() {
        window.requestAnimationFrame(draw);
    }

    function draw() {
        updateDrawCanvas(drawCtx);
        updateVideoCanvas(videoCtx);
        window.requestAnimationFrame(draw);
    }

    listenToCoords(coords => {
        coordsArr.push({ x: coords.x, y: coords.y });
        if (coordsArr.length > MAX_COORDS) coordsArr.shift();
    })

    // Updates the draw canvas with brush masks
    function updateDrawCanvas(ctx) {
        // Fade the canvas slightly with each frame
        ctx.globalCompositeOperation = renderingCtx0;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, drawCanvas.width, drawCanvas.height);

        ctx.globalCompositeOperation = 'lighten';

        // Draw up to 2 new coords per frame
        const tempArr = coordsArr.splice(0, 2);
        for (let i = 0; i < tempArr.length; i++) {
            const posX = tempArr[i].x * drawCanvas.width - img.width / 2;
            const posY = tempArr[i].y * drawCanvas.height - img.height / 2;
            ctx.drawImage(img, posX, posY);
        }
    }

    // Updates the video canvas by masking with the draw canvas
    function updateVideoCanvas(ctx) {
        if (!video.videoWidth || !video.videoHeight) return;

        ctx.globalCompositeOperation = 'source-in';
        ctx.drawImage(video, 0, 0, screenDim.x, screenDim.y);

        ctx.globalCompositeOperation = renderingCtx1;
        ctx.drawImage(drawCanvas, 0, 0);
    }

}

export default setupVideoLogic;