import {createRequire} from 'module';
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import { createServer } from 'http';
import setRoutes from './setRoutes.js'
import setupSocket from './socketLogic.js'
import path from 'path';
import { fileURLToPath } from 'url';

global.__filename = fileURLToPath(import.meta.url);
global.__dirname = path.dirname(__filename);

const port = process.env.PORT || 3000;
const _app = express();
const app = setRoutes(_app)
const httpServer = createServer(app)
const io = setupSocket(httpServer);
httpServer.listen(port);
console.log(`server listening on port ${port}`)
global.io = io
