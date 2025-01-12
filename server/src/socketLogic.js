import {Server} from "socket.io"
import {Server as httpServer} from 'http'

/**
 * sets up io server and event handling
 * @param {httpServer} server
 * @returns {Server}
 */
export default function setIo(server){
    const io = new Server(server)

    // DONE ?
    io.of('/screen').on('connection',(socket)=>{
        console.debug('screen connected');
        socket.join('screens');
    });
    
    
    // DONE ?
    // NOTE: OPTIONAL - add other user trackers (besides pointer coords)
    io.of('/user').on('connection',(socket)=>{
        console.log('socket connected');
        socket.join('users');
        socket.on('ptrCoords',data=>{
            io.to('screens').emit('newCoords',data);
	        console.debug(data.x,data.y);
        });
    });
    
    return io
}