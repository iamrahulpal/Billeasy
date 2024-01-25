import { isValidObjectId } from "mongoose";
import { Order } from "../../models/order.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const updateOrder = asyncHandler(async (req, res) => {
  const { totalAmount } = req.body;
  const { orderId } = req.params;

  if (!totalAmount) {
    throw new ApiError(400, "totalAmount is required");
  }

  if (!isValidObjectId(orderId)) {
    throw new ApiError(400, "This order id is not valid");
  }

  const order = await Order.findById(orderId);

  if (!order) {
    throw new ApiError(404, "order not found!");
  }

  console.log("user: ", order.userId.toString());
  console.log("order: ", req.user._id.toString());

  if (order.userId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You do not have permission to update this order!");
  }

  const updateOrder = await Order.findByIdAndUpdate(
    { _id: orderId },
    {
      $set: {
        totalAmount
      }
    },
    {
      new: true
    }
  );

  if (!updateOrder) {
    throw new ApiError(500, "something went wrong while updating order");
  }

  // return responce
  return res
    .status(201)
    .json(new ApiResponse(200, updateOrder, "order updated successfully!!"));
});

export { updateOrder };
