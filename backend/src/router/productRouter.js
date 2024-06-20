import { Router } from "express";
import productManage from "../managers/productManage.js";
import { checkProductData } from "../middlewares/checkProductData.meddleware.js";

const router = Router();

// CON PRODUCTOS DEL JSON
 
router.get("/products", async (req, res) => {      
    try {
        const {limit} = req.query;
        const products = await productManage.getProducts(Number(limit))  
        if (!products) return res.status(404).json({ status: "ERROR", msg: "Productos no encontrados" })
            res.status(200).json({ status: "ok", products }) 
        res.send(products)
    } catch (error) {
        console.log(`${error}`)
        res.status(500).json({ status:"error", msg:"Error interno del servidor" })
    }
})

router.get("/products/:pid", async (req, res) => { 
    try {
        const {pid} = req.params;
        const product = await productManage.getProductById(pid)
        if (!product) return res.status(404).json({ status: "ERROR", msg: "Producto no encontrado" })
        res.status(200).json({ status: "ok", product }) 
    } catch (error) {
        console.log(`${error}`)
        res.status(500).json({ status:"error", msg:"Error interno del servidor" })
    }
})

router.put("/products/:pid", async (req, res) => { 
    try {
        const { pid } = req.params;
        const body = req.body
        const product = await productManage.updateProduct(pid, body)
        if (!product) {
            return res.status(404).json({ status: "ERROR", msg: "Producto no encontrado" });
        }
        res.status(200).json({ status: "ok", product }) 
    } catch (error) {
        console.log(`${error}`)
        res.status(500).json({ status: "error", msg: "Error interno del servidor" });
    }
})

router.post("/products", checkProductData, async (req, res) => { 
    try {
        const body = req.body
        const product = await productManage.addProducts(body)
        res.status(201).json({ status: "ok", product }) 
    } catch (error) {
        console.log(`${error}`)
        res.status(500).json({ status: "error", msg: "Error interno del servidor" });
    }
})

router.delete("/products/:pid", async (req, res) => { 
    try { 
        const { pid } = req.params;
        const product = await productManage.getProductById(pid)
        if (!product) {
            return res.status(404).json({ status: "ERROR", msg: "Producto no encontrado" });
        }
        await productManage.deleteProduct(pid);
        res.status(200).json({ status: "ok", msg: `producto con el id ${pid} eliminado con éxito` }) 
    } catch (error) {
        console.log(`${error}`)
        res.status(500).json({ status: "error", msg: "Error interno del servidor" });
    }
 })




export default router;