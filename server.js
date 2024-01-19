import express from "express";
import productManager from "./src/data/fs/product.Fs.Manager.js";
import userManager from "./src/data/fs/user.Fs.Manager.js";
import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import __dirname from "./utils.js";
import morgan from "morgan";
import { engine } from "express-handlebars";
import { createServer } from "http";
import { Server } from "socket.io";

const server = express();
const PORT = 8080;
const ready = () => console.log("server ready on port " + PORT);
const httpServer = createServer(server);
const socketServer = new Server(httpServer);
httpServer.listen(PORT, ready);

//middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname+'/public'))
server.use(morgan("dev"))

//template engine
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

socketServer.on("connection", (socket) => {
    console.log(socket.id);
    socket.emit("movies", productManager.read()) 


  socket.on("newProduct", async (data) => {
    try {
        console.log(data);
        await productManager.create(data)
        socket.emit("movies", productManager.read())
    } catch (error) {
      next(error);
    }
  
  });
});

server.use("/", router);
server.use(errorHandler)
server.use(pathHandler)

