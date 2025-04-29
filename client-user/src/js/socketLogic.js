/**
 * @global 
 * @typedef {import('socket.io-client').Socket} Socket 
 * 
 * @typedef {import('@shared/types').Coords} Coords
*/

/** @returns {(coords:Coords)=>void} */
function setupSocket(){

    //@ts-ignore
    const io = window.io ?? globalThis.io ?? console.error('socket-io unavailable');
    
    /** @type {Socket} */
    const socket = io('/user');
    socket.on('connect',()=>console.debug('client-user socket connected to sever'));
    socket.on('disconnecting',()=>console.debug('client-user socket disconnecting from server'));
    socket.on('disconnect',()=>console.debug('client-user socket disconnected from server'));
    
    /** @param {Coords} coords */
    function emitCoordsToScreen(coords){
        socket.emit('coords', coords)
    }
    
    return emitCoordsToScreen
}

export default setupSocket
