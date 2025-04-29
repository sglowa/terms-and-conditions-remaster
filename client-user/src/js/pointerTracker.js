import PointerTracker from "pointer-tracker";

/** @typedef {import("@shared/types").Coords} Coords */

/** @param {(coords:Coords)=>void} emitFn */
function trackPointer(emitFn) {
  let pointerIsTracked = false;
  let lastEmitTime = 0;
  const emitInterval = 50; // ms, for ~20 fps
  let prevPos = { x: -1, y: -1 };

  const pointerTracker = new PointerTracker(document.querySelector('#root'), {
    start(pointer, event) {
      console.debug('Pointer started moving.', { pointer, event });
      pointerIsTracked = true;

      const xRaw = pointer.clientX;
      const yRaw = pointer.clientY;
      const { x, y } = normalizeCoords({ x: xRaw, y: yRaw });

      emitFn({ x, y });
      prevPos = { x, y };
      return true;
    },

    move(prevCoords, changedCoords, event) {
      const pointer = changedCoords[0];
      const now = performance.now();
      if (now - lastEmitTime < emitInterval) return;

      const xRaw = pointer.clientX;
      const yRaw = pointer.clientY;
      const { x, y } = normalizeCoords({ x: xRaw, y: yRaw });

      if (isDeltaMoveEnough({ x, y }, prevPos)) {
        emitFn({ x, y });
        prevPos = { x, y };
        lastEmitTime = now;
      }
    },

    end(pointer, event, cancelled) {
      console.debug('Pointer stopped moving.', { pointer, event });
      pointerIsTracked = false;
    }
  });
}

/**
 * @param {Coords} coords
 * @returns {Coords}
 */
function normalizeCoords(coords) {
  const x = coords.x / window.innerWidth;
  const y = coords.y / window.innerHeight;
  return { x, y };
}

/**
 * @param {Coords} current
 * @param {Coords} previous
 */
function isDeltaMoveEnough(current, previous) {
  const deltaX = Math.abs(current.x - previous.x);
  const deltaY = Math.abs(current.y - previous.y);
  const threshold = 0.01;

  if (deltaX < threshold && deltaY < threshold) {
    console.debug('Pointer coord delta below threshold', { deltaX, deltaY, threshold });
    return false;
  }
  return true;
}

export default trackPointer
