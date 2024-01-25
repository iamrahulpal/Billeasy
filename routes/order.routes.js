import { Router } from "express";
import { createOrder } from "../controller/Order/createOrder.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getAllOrders } from "../controller/Order/getAllOrders.js"
import { getSingleOrder } from "../controller/Order/getSingleOrder.js"
import { updateOrder } from "../controller/Order/updateOrder.js"
import { deleteOrder } from "../controller/Order/deleteOrder.js"
import { orderRevenue } from "../controller/Order/orderRevenue.js"




const router = Router();

router.route("/create-order").post(verifyJWT, createOrder);
router.route("/user").post(verifyJWT, getAllOrders);
router.route("/revenue").post(verifyJWT, orderRevenue);
router.route("/:orderId").post(verifyJWT, getSingleOrder).patch(verifyJWT, updateOrder).delete(verifyJWT, deleteOrder)



export default router;
