import productsRouter from "./productRouter.js"
import cartsRouter from "./cartRouter.js"
import { Router } from "express";

const router = Router();

router.use("/products", productsRouter);
router.use("/carts", cartsRouter);


export default router;


/* 
const socket = io();

const form = document.getElementById("addForm");
const deleteForm = document.getElementById("deleteForm");
const title = document.getElementById("title");
const price = document.getElementById("price");
const id = document.getElementById("id");
const description = document.getElementById("description");
const productList = document.getElementById("productsList");


socket.on("products", (data) => {
    productList.innerHTML = "";
    data.forEach((product) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
      <div class="card-body m-2">
        <h5 class="card-title">${product.title}</h5>
        <p class="card-text">ID: ${product.id}</p>
        <p class="card-text">${product.description}</p>
        <p class="card-text">$${product.price}</p>
      </div>
    `;
        productList.appendChild(card);
    })
})
addForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    await fetch("/realtimeproducts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: title.value, price: price.value, description: description.value }),
    })
})

deleteForm.addEventListener("submit", async (event) => { 
    event.preventDefault();
    await fetch("/realtimeproducts", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({id: id.value}),
    })
}) */