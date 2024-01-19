import { Router } from "express";
import userManager from "../../data/fs/user.Fs.Manager.js";

const userRouter = Router();

userRouter.get("/register", async (req, res, next) => {
  try {
   const one = userManager.readOne()
   return res.render("register",{one})
  } catch (error) {
    next(error);
  }
});


export default userRouter;