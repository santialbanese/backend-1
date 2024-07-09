import express from "express";
import productRouter from "./routes/productRouter.js";
import cartRouter from "./routes/cartRouter.js"
import handlebars from "express-handlebars"
import routes from "./routes/index.js";
import viewRoutes from "./routes/views.routes.js";
import __dirname from "./dirname.js";
import { Server } from "socket.io"; 

const PORT = 8080;
const app = express();

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//MIDDLEWARES --> intermediarios, se ejecuta antes del endpoint
app.use(express.urlencoded({extended: true})) //permite leer archivos con caracteres especiales
app.use(express.json()) //permite obtener archivos json
app.use("/api", productRouter);
app.use("/api", cartRouter); 
app.use(express.static("public"));

app.use("/api", routes);
app.use("/", viewRoutes ) 


const httpServer = app.listen(PORT, () => { 
    console.log(`server on port ${PORT}`)
})


export const io = new Server(httpServer) 

let products = [];

io.on("connection", (socket) => {  

}) 