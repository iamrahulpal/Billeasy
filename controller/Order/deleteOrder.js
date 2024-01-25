import { isValidObjectId } from "mongoose";
import { Order } from "../../models/order.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const deleteOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  if (!isValidObjectId(orderId)) {
    throw new ApiError(400, "This order id is not valid");
  }

  const order = await Order.findById(orderId);

  if (!order) {
    throw new ApiError(404, "order not found!");
  }

  if (order.userId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You do not have permission to delete this order!");
  }

  const deleteOrder = await Order.deleteOne({ _id: orderId });
  console.log("🚀 ~ deleteOrder:", deleteOrder);

  if (deleteOrder.deletedCount !== 1) {
    throw new ApiError(500, "something went wrong while deleting order");
  }

  // return responce
  return res
    .status(201)
    .json(new ApiResponse(200, deleteOrder, "order deleted successfully!!"));
});

export { deleteOrder };
