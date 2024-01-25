import { Order } from "../../models/order.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const usersOrderCounts = asyncHandler(async (req, res) => {
  // get all order
  const usersWithOrders = await Order.find({})
    .populate({
      path: "userId",
      select: "email"
    })
    .exec();

  const usersData = usersWithOrders.map((order) => ({
    user: order.userId,
    totalOrders: 1
  }));


  const usersWithTotalOrders = usersData.reduce(
    (result, { user, totalOrders }) => {
      const existingUser = result.find((u) => u.user._id.equals(user._id));
      if (existingUser) {
        existingUser.totalOrders += totalOrders;
      } else {
        result.push({ user, totalOrders });
      }
      return result;
    },
    []
  );

  if (!usersWithTotalOrders) {
    throw new ApiError(500, "something went wrong while fetching orders");
  }

  // return response
  return res
    .status(200)
    .json(
      new ApiResponse(200, usersWithTotalOrders, "order fetched successfully!!")
    );
});

export { usersOrderCounts };
