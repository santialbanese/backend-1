import productDao from "../dao/product.dao.js"
import cartDao from "../dao/cart.dao.js"
import { request, response } from "express"

export const checkProductAndCart = async (req = request , res= response, next) => { 
    try {

        const { cid, pid } = req.params;

        const product = await productDao.getById(pid);
        if (!product) return res.status(404).json({ status: "ERROR", msg: "Producto inexistente" })
        const cart = await cartDao.getById(cid);
        if(!cart) return res.status(404).json({ status: "ERROR", msg: "Carrito inexistente" }) 

        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", msg: "Error interno del servidor" });
    }
}