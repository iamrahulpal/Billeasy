import { User } from "../../models/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const allOrdersForUser = asyncHandler(async (req, res) => {
  const orders = await User.aggregate([
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

export { allOrdersForUser };
