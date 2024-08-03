import { Router } from "express";
import productManage from "../dao/managers/productManage.js";
import { checkProductData } from "../middlewares/checkProductData.meddleware.js";
import productDao from "../dao/product.dao.js";

const router = Router();

// CON PRODUCTOS DEL JSON
 
router.get("/", async (req, res) => {      
    try {
        const {limit, page, sort, category, status} = req.query;
        const options = {
            limit: limit || 10,
            page: page || 1,
            sort: {
                price: sort === "asc" ? 1 : -1
            },

        }

        if(category){
            const products = await productDao.getAll({ category }, options);
            return res.status(200).json({ status: "ok", products }) 
        }  

        if(status){
            const products = await productDao.getAll({ status }, options);
            return res.status(200).json({ status: "ok", products }) 
        }  

        const products = await productDao.getAll({}, options);
        if (!products) return res.status(404).json({ status: "ERROR", msg: "Productos no encontrados" })
            res.status(200).json({ status: "ok", products }) 
        res.send(products)
    } catch (error) {
        console.log(`${error}`)
        res.status(500).json({ status:"error", msg:"Error interno del servidor" })
    }
})

router.get("/:pid", async (req, res) => { 
    try {
        const {pid} = req.params;
        const product = await productDao.getById(pid);
        if (!product) return res.status(404).json({ status: "ERROR", msg: "Producto no encontrado" })
        res.status(200).json({ status: "ok", product }) 
    } catch (error) {
        console.log(`${error}`)
        res.status(500).json({ status:"error", msg:"Error interno del servidor" })
    }
}) 

router.put("/:pid", async (req, res) => { 
    try {
        const { pid } = req.params;
        const body = req.body
        const product = await productDao.update(pid, body);
        if (!product) {
            return res.status(404).json({ status: "ERROR", msg: "Producto no encontrado" });
        }
        res.status(200).json({ status: "ok", product }) 
    } catch (error) {
        console.log(`${error}`)
        res.status(500).json({ status: "error", msg: "Error interno del servidor" });
    }
}) 

router.post("/", checkProductData, async (req, res) => { 
    try {
        const body = req.body
        const product = await productDao.create(body);  
        res.status(201).json({ status: "ok", product })  
    } catch (error) {
        console.log(`${error}`)
        res.status(500).json({ status: "error", msg: "Error interno del servidor" });
    }
})
 
router.delete("/:pid", async (req, res) => { 
    try { 
        const { pid } = req.params;
        const product = await productDao.getById(pid);
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