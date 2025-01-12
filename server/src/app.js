import express from 'express'
import setRoutes from './setRoutes'
import dotenv from 'dotenv'

dotenv.config()

const port = process.env.PORT || 3000;
const _app = express();
const app = setRoutes(_app)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))