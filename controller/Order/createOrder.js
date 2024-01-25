import { Order } from "../../models/order.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const createOrder = asyncHandler(async (req, res) => {
    
  const { totalAmount } = req.body;
  console.log("🚀 ~ totalAmount:", totalAmount);

  if (!totalAmount) {
    throw new ApiError(400, "totalAmount is required");
  }

  const order = await Order.create({
    totalAmount,
    userId: req.user._id
  });

  if (!order) {
    throw new ApiError(500, "Something went wrong while creating order");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, order, "order created successfully"));
});

export { createOrder };
