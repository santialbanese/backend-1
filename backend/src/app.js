import express from "express";
import productRouter from "./router/productRouter.js";
import cartRouter from "./router/cartRouter.js"

const PORT = 8080;
const app = express();
//MIDDLEWARES --> intermediarios, se ejecuta antes del endpoint
app.use(express.urlencoded({extended: true})) //permite leer archivos con caracteres especiales
app.use(express.json()) //permite obtener archivos json
app.use("/api", productRouter);
app.use("/api", cartRouter);
app.use(express.static("public"));



app.listen(PORT, () => { 
    console.log(`servidor escuchando en el puerto ${PORT}`)
}) 