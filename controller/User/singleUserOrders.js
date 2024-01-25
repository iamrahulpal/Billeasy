import mongoose, { isValidObjectId } from "mongoose";
import { User } from "../../models/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const singleUserOrders = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  if (!isValidObjectId(userId)) {
    throw new ApiError(400, "This user id is not valid");
  }

  const orders = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(userId)
      }
    },
    {
      $lookup: {
        from: "orders",
        localField: "_id",
        foreignField: "userId",
        as: "orders"
      }
    }
  ]);
  if (!orders) {
    throw new ApiError(500, "something went wrong while fetching orders");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, orders, "User fetched successfully"));
});

export { singleUserOrders };
