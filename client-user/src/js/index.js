import { generateCaptcha_gif } from "./captchaTest.js";
import setupSocket from "./socketLogic.js"
import trackPointer from "./pointerTracker.js"
// TODO: i can generateCaptcha_svg on server, to test axios / htmx + alpine but whatever
// import { generateCaptcha_gif, generateCaptcha_svg } from "./captchaTest.js";
console.log('bundle.js script init');

// @ts-ignore
window.generateCaptcha_gif = generateCaptcha_gif

const emitCoordsToScreen = setupSocket();
trackPointer(emitCoordsToScreen)


