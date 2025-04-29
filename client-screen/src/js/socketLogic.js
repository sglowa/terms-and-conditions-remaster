/**
 * @typedef {import('socket.io-client').Socket} Socket 
 * @typedef {import('@shared/types').Coords} Coords
*/


/** @returns {(coordsCb: (coords: Coords) => void) => void} */
function setupSocket(){

    //@ts-ignore
    const io = window.io ?? globalThis.io ?? console.error('socket-io unavailable');
    
    /** @type {Socket} */
    const socket = io('/screen');

    socket.on('connect',()=>console.debug('client-screen socket connected to sever'));
    socket.on('disconnecting',()=>console.debug('client-screen socket disconnecting from server'));
    socket.on('disconnect',()=>console.debug('client-screen socket disconnected from server'));
    socket.on('test',()=>console.log('aaaaa'))
    /** @param {(coords:Coords)=>void} coordsCb */
    function listenToCoords(coordsCb){
        socket.on('coords',data=>{
            coordsCb(data)
            console.debug('receiving coords',data);
        })
    }
    
    return listenToCoords;        
}

export default setupSocket