import express from "express";
import cors from "cors";
import {dirname, join} from 'path'
import {fileURLToPath} from 'url'
import { PORT } from "./config.js";

import indexRoutes from "./routes/index.routes.js";
import taksRoute from "./routes/task.routes.js"

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url))
//console.log("Path:")
console.log(__dirname)
app.use(cors())
app.use(express.json())//habilitamos  json para que las peticiones puedan ser entendidas 

app.use(indexRoutes)
app.use(taksRoute)

app.use(express.static(join(__dirname, '../client/dist')))

app.listen(PORT);
console.log("server is running in port " + PORT )

