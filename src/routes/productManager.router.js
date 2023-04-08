import { Router, json } from "express";
import ProductManager from "../controller/productManager.js";

const productManagerRouter = Router();
productManagerRouter.use(json());
const item = new ProductManager();


productManagerRouter.get("/", async (req,res) => {
    const {limit} = req.query;
    const prods = await item.getProducts(); 
    if(!limit){
       await res.send(prods);
    }else{
        //envia el filtrado de el numero de datos
    const filtered = prods.splice(0,limit);
    await res.send(filtered);
    }
    
});

//segun el id
productManagerRouter.get("/:id", async (req,res) => {
    const prodId = await Number(req.params.id);
    const log = console.log(prodId);
    const result = await item.getProductById(prodId);
    await res.send(result);
})

//post carga de info code,

productManagerRouter.post("/addTest", async(req, res) => {
    const code = Number(req.body.code);
    const title = req.body.title;
    const test = console.log(code, title);
    await res.send(test)
})

productManagerRouter.post("/add", async(req, res, midSocket) => {
    const code = Number(req.body.code);
    const title = await req.body.title;
    const description = await req.body.description;
    const price = await Number(req.body.price);
    // const thumbnail = await req.query.thumbnail;
    const stock = await Number(req.body.stock);
    // const status = await req.query.status;
    const category = await req.body.category;
    const test = console.log(code+title+description+price
        +stock+category);
    const result = await item.addProduct(code,title,description,price,stock,category);
    const enviarProds = await item.getProducts()
    req.enviarProds = enviarProds;
    midSocket();
    await res.send(test)
})

productManagerRouter.post("/update", async (req,res) => {
    const prodIdUp = await Number(req.query.prodIdUp);
    const value = await req.query.value;
    const data = await req.query.data;
    // const result = prodIdUp + value + data;
    const result = await item.updateProdById(prodIdUp,value,data);
    await res.send(result);
})

productManagerRouter.get("/delete/:id", async (req,res) =>{
    const prodId = await Number(req.params.id);
    const result = await item.deleteProdById(prodId);
    await res.send(result);
})

export default productManagerRouter;