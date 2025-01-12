import {createRequire} from 'module';
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import { createServer } from 'http';
import setRoutes from './setRoutes'
import setIo from './socketLogic'

const port = process.env.PORT || 3000;
const _app = express();
const app = setRoutes(_app)
const httpServer = createServer(app)
const io = setIo(httpServer);
httpServer.listen(port);
console.log(`server listening on port ${port}`)
global.io = io
