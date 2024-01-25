import { Order } from "../../models/order.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = Order.find({
    userId: req.user._id
  });

  if (!orders) {
    throw new ApiError(500, "something went wrong while fetching ordres");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, orders, "order fetched successfully"));
});

export { getAllOrders };
