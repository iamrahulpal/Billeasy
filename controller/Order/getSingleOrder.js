import { isValidObjectId } from "mongoose";
import { Order } from "../../models/order.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const getSingleOrder = asyncHandler(async (req, res) => {
  const orderId = req.params.orderId;
  if (!isValidObjectId(orderId)) {
    throw new ApiError(400, "This order id is not valid");
  }
  const order = await Order.findOne({
    _id: orderId
  });
  if (!order) {
    throw new ApiError(500, "something went wrong while fetching order");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, order, "order fetched successfully"));
});

export { getSingleOrder };
