import { Router, json } from "express";
import ProductManager from "../controller/productManager.js";

const item = new ProductManager();

const viewer = Router();

viewer.get("/", async (req,res) =>{
    const prods = await item.getProducts();
    console.log(prods);
    res.render("index", {prods});
})
viewer.get("/realtimeproducts", async (req,res) =>{
    const prods = await item.getProducts();
    //console.log(prods);
    res.render("realTimeProducts", {prods});
})

export default viewer;