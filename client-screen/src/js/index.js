import setupSocket from './socketLogic.js'
import setupVideoLogic from './videoLogic.js'

const listenToCoords = setupSocket();
setupVideoLogic(listenToCoords);