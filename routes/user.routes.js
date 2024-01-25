import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { registerUser } from "../controller/User/registerUser.js";
import { loginUser } from "../controller/User/loginUser.js";
import { allOrdersForUser } from "../controller/User/allOrdersForUser.js";
import { singleUserOrders } from "../controller/User/singleUserOrders.js";
import { updateUser } from "../controller/User/updateUser.js";
import { deleteUser } from "../controller/User/deleteUser.js";
import { usersOrderCounts } from "../controller/User/userOrderCounts.js";

const router = Router();

router.route("/usersOrderCounts").get(verifyJWT, usersOrderCounts);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/allOrders").get(verifyJWT, allOrdersForUser);
router
  .route("/:userId")
  .get(singleUserOrders)
  .patch(verifyJWT, updateUser)
  .delete(verifyJWT, deleteUser);
export default router;
