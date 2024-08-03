import productManage from "./productManage.js";

productManage.addProducts({
    title: "producto 1",
    description:"Este es un producto 1",
    price:200,
    thumbnail:"Sin imagen",
    code:"abc678",
    stock:25,
});
productManage.addProducts({
    title: "producto 2",
    description:"Este es un producto 2",
    price:300,
    thumbnail:"Sin imagen",
    code:"ngd123",
    stock:12,
});
productManage.addProducts({
    title: "producto 3",
    description:"Este es un producto 3",
    price:400,
    thumbnail:"Sin imagen",
    code:"abd828",
    stock:46,
});

productManage.getProducts();

const testProducts = async () => { 
    /* const product = await productManage.getProductById(1)
    console.log(product) */
    /* const product = await productManage.updateProduct(1,{ price: 3000 })
    console.log(product) */
    /* const product = await productManage.deleteProduct(2);
    console.log(product) */
}
testProducts();