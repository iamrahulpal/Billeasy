import { isValidObjectId } from "mongoose";
import { Order } from "../../models/order.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const orderRevenue = asyncHandler(async (req, res) => {
  const revenue = await User.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$totalAmount" }
      }
    }
  ]);

  if (!revenue) {
    throw new ApiError(500, "something went wrong while fetching revenue");
  }

  const totalRevenue =
    revenue.length > 0 ? parseFloat(revenue[0].totalRevenue.toString()) : 0;

  return res
    .status(200)
    .json(new ApiResponse(200, totalRevenue, "Revenue fetched successfully"));
});

export { orderRevenue };
