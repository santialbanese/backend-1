import fs from "fs"
import { v4 as uuid } from "uuid";

const path = "./src/managers/carts.json"

let carts = [];

const createCart = async () => { 
    await getCars();
    const newCart = {
        id: uuid(),
        products: []
    }
    carts.push(newCart);
    await fs.promises.writeFile(path, JSON.stringify(carts));
    return newCart;
}

const getCars = async () => {
    const cartsJson = await fs.promises.readFile(path, "utf-8")
    carts = JSON.parse(cartsJson) || [];
    return carts;
}

const getCartById = async (cid) => { 
    await getCars();
    const cart = carts.find(c => c.id === cid)
    return cart;
}

const addProductToCart = async (cid, pid) => { 
    await getCars();
    const cart = await getCartById(cid);
    const product = cart.products.find(p => p.id === pid);
    if(product){
        product.quantity += 1;
    }else{
        const product = {
            id: pid,
            quantity: 1
        }
        //pusheo el nuevo product ya que no existe
        console.log(product)
        cart.products.push(product)
    }
    await fs.promises.writeFile(path, JSON.stringify(carts));
    return carts;
}

export default {
    createCart,
    getCartById,
    addProductToCart
}