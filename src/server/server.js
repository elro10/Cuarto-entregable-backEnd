import express, {urlencoded} from "express";
import productManagerRouter from "../routes/productManager.router.js";
import cartManagerRouter from "../routes/cartManager.router.js"
import __dirname from "./utils.js";
import { engine} from "express-handlebars";
import { Server } from "socket.io";
import viewer from "../routes/views.router.js";

const app = express();
app.use(urlencoded({ extended: true }));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + "/../views");

app.use(express.json());
app.use(express.static(__dirname + "/../../public"));
//viewer route
app.use("/", viewer);

//products route
app.use("/api/products", productManagerRouter);
//cart route
app.use("/api/cart", cartManagerRouter);

//call de io
app.use((req,res, midSocket) =>{
     const data = req.enviarProds;
    req.socketServer = socketServer;
    socketServer.emit("productList", data);
    midSocket();
})

//escucha
const httpServer = app.listen(8080, () => {
console.log("listening 8080");
});


const socketServer = new Server(httpServer);
//listener se socket
socketServer.on("connection", (socket)=>{
    console.log("nuevo cliente conectado");
    socket.emit("productList", "mensaje desde server");
})

