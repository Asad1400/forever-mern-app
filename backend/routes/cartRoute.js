import express from "express";
import { addToCart, updateCart, getUserCart, deleteFromCart } from "../controllers/cartController.js";
import authUser from "../middlewares/auth.js";

const router = express.Router();

router.post("/add", authUser, addToCart);
router.put("/update", authUser, updateCart);
router.get("/get", authUser, getUserCart);
router.delete("/delete", authUser, deleteFromCart);

export default router;
