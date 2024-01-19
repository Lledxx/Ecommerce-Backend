import { Router } from "express";
import productsRouter from "./products.views.js";
import userRouter from "./user.views.js";
import productManager from "../../data/fs/product.Fs.Manager.js";


const viewsRouter = Router();

viewsRouter.get("/", (req, res, next) => {
  try {
   
    const date = new Date();
    const all =  productManager.read();
    return res.render("index", { Products: all });
  } catch (error) {
    next(error);
  }
});

viewsRouter.use("/", productsRouter);
viewsRouter.use("/", userRouter);

export default viewsRouter;