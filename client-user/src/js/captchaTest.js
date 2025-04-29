// Doesn't work ? i think
// import Captcha from '@haileybot/captcha-generator'

// let captcha = new Captcha()
// captcha.PNGStream.pipe(fs.createWriteStream(path.join(__dirname,`${captcha.value}.png`)))
// captcha.JPEGStream.pipe(fs.createWriteStream(path.join(__dirname,`${captcha.value}.jpeg`)))


import { Captcha as gifCaptcha } from 'captcha.gif'

// NOTE: problems with webpacking svg-captcha, might generate it on server but low priority / optional
// import svgCaptcha from 'svg-captcha'; // problems with webpacking cause fs.readfilesync?
// function generateCaptcha_svg(){
//     const captcha = svgCaptcha.create();
//     console.log(captcha.data)
//     console.log(captcha.text)
//     return captcha
// }


const captcha2 = new gifCaptcha({
    "filter":false,
    "blur":false,
    "numberOfDots": 0});

// this works now, but required some wrangling with webpack, for browser support of node stuff equivalents (buffer)
function generateCaptcha_gif(){
    const {token, buffer} = captcha2.generate();
    const captchaImgBase64 = buffer.toString('base64');
    // fs.writeFileSync('./captchaoutput.gif',buffer);   
    return {token, captchaImgBase64};
}

export {
    // generateCaptcha_svg,
    generateCaptcha_gif
}