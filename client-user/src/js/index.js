import { generateCaptcha_gif } from "./captchaTest.js";
// TODO: i can generateCaptcha_svg on server, to test axios / htmx + alpine but whatever
// import { generateCaptcha_gif, generateCaptcha_svg } from "./captchaTest.js";
console.log('bundle.js script init');
// console.log('wtf');
// console.log('wtf3');

// @ts-ignore
window.generateCaptcha_gif = generateCaptcha_gif


