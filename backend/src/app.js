import express from "express";
import handlebars from "express-handlebars"
import __dirname from "./dirname.js"
import { Server } from "socket.io"; 
import { connectMongoDB } from "./config/mongoDb.config.js";
import envs from "./config/envs.config.js"
import router from "./routes/index.js"
import viewRoutes from "./routes/views.routes.js"


const app = express();

connectMongoDB();

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//MIDDLEWARES --> intermediarios, se ejecuta antes del endpoint
app.use(express.urlencoded({extended: true})) //permite leer archivos con caracteres especiales
app.use(express.json()) //permite obtener archivos json
app.use("/api", router);
app.use("/", viewRoutes);
app.use(express.static("public"));


const httpServer = app.listen(envs.PORT, () => { 
    console.log(`server on port ${envs.PORT}`)
})


export const io = new Server(httpServer) 



io.on("connection", (socket) => {  

}) 