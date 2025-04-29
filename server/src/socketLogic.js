import {Server} from "socket.io"
import {Server as httpServer} from 'http'

/** @typedef {import('@shared/types').Coords} Coords */

/**
 * sets up io server and event handling
 * @param {httpServer} server
 * @returns {Server}
 */
export default function setupSocket(server){
    const io = new Server(server)
    const screenNamespace = io.of('/screen');
    const userNamespace = io.of('/user')

    // DONE ?
    screenNamespace.on('connection',(socket)=>{
        console.debug('screen connected');
        socket.join('screens');
    });

    // DONE ?
    // NOTE: OPTIONAL - add other user trackers (besides pointer coords)
    userNamespace.on('connection',(socket)=>{
        console.log('user connected');
        socket.join('users');
        socket.on('coords', /** @param {Coords} data */ (data)=>{
	        console.debug(data.x,data.y);
            screenNamespace.emit('coords',data);
        });
    });
    
    return io;
}