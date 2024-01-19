import { Router } from "express";
import productManager from "../../data/fs/product.Fs.Manager.js";

const productsRouter = Router();



productsRouter.get("/real", async (req, res, next) => {
  try {
    const all = await productManager.read();
    return res.render("products", { Products: all });
  } catch (error) {
    next(error);
  }
});
 

productsRouter.get("/form", (req, res, next) => {
  try {
    return res.render("real");
  } catch (error) {
    next(error);
  }
});

export default productsRouter;