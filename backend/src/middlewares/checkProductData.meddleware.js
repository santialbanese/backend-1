export const checkProductData = async (req, res, next) => { 
    try {
        const {title, description, price,thumbnail, code, stock, category, status} = req.body;
        const newProduct = {
            title,
            description,
            price,
            thumbnail, 
            code, 
            stock, 
            category,
            status: true
        }
        if(Object.values(newProduct).includes(undefined))
            return res.status(400).json({ status: "ERROR", msg: "se requieren todos los campos completos" })
        next()
    } catch (error) {
        console.log(`${error}`)
        res.status(500).json({ status:"error", msg:"Error interno del servidor" })
    }
}