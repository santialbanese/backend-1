import { Router } from "express";
import productManage from "../managers/productManage.js";
import { io } from "../app.js";

const router = Router();

router.get("/", async (req, res) => {
    const products = await productManage.getProducts();
    res.render("home", { products })
})

router.get("/realtimeproducts", async (req, res) => {
    const products = await productManage.getProducts();
    io.on("connection", (socket) => {
        console.log("nuevo usuario conectado en realTimeProducts");
        socket.emit("products", products);
    })
    res.render("realTimeProducts", { products })
})

router.post("/realtimeproducts", async (req, res) => {
    await productManage.addProducts(req.body);
    const products = await productManage.getProducts();
    io.emit("products", products);

    res.render("realTimeProducts");
});

router.delete("/realtimeproducts", async (req, res) => {
    const { id } = req.body;
    await productManage.deleteProduct(id);
    const products = await productManage.getProducts();
    io.emit("products", products);

    res.render("realTimeProducts");
}); 

export default router;  