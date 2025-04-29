import PointerTracker from "pointer-tracker"

/** @typedef {import("@shared/types").Coords} Coords */

/** @param {(coords:Coords)=>void} emitFn */
function trackPointer(emitFn){
    let pointerIsTracked
    const pointerTracker = new PointerTracker(document.querySelector('#root'),{
        start(pointer,event){
            console.debug('Pointer started moving.', {pointerTracker:this,pointer,event});
            if(!pointerIsTracked){
                pointerIsTracked=true;
                const xRaw = pointer.clientX;
                const yRaw = pointer.clientY;
                const {x,y} = normalizeCoords({x:xRaw,y:yRaw});
                emitFn({x,y});
                return true;
            }
            return false;
        },
        move(prevCoords, changedCoords, event){
            console.debug('Pointer moves.', {prevCoords, changedCoords, event});
            const xRaw = changedCoords[0].clientX;
            const yRaw = changedCoords[0].clientY;
            const {x,y} = normalizeCoords({x:xRaw,y:yRaw});

            let interval = 20;
            debounce(()=>{
                if(isDeltaMoveEnough({x,y})) emitFn({x,y});
            },interval)
        },
        end(pointer, event, cancelled){
            console.debug('Pointer stopped moving.', {pointer,event})
            pointerIsTracked = false;
        }
    })
}

/** 
 * @param {Coords} coords 
 * @returns {Coords}
*/
function normalizeCoords(coords){
    const x = coords.x/window.innerWidth;
    const y = coords.y/window.innerHeight;
    return {x,y};
}

let timeInterval, now, elapsed;
let then = window.performance.now();
/** @param {()=>void} cb emitter callback; @param {number} interval (in fps) */
function debounce(cb, interval){
    timeInterval = 1000/interval;
    elapsed = window.performance.now() - then;
    if(elapsed>timeInterval){
        requestAnimationFrame(cb)
        then = window.performance.now()
    }
}

let prevPos = {x:2,y:2};
let deltaTreshold = 0.005;
let velocityTreshold = 10;
/** @param {Coords} coords @return {boolean}  */
function isDeltaMoveEnough(coords){
    const currentPos = coords;
    const deltaX = Math.abs(currentPos.x - prevPos.x);
    const deltaY = Math.abs(currentPos.y - prevPos.y);
	if( deltaX < deltaTreshold || deltaY < deltaTreshold ){		
			console.debug('Pointer coord delta below treshhold', {deltaX,deltaY,deltaTreshold});
			return false;
    }
    return true;
}



