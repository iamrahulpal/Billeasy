import { isValidObjectId } from "mongoose";
import { User } from "../../models/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const deleteUser = asyncHandler(async (req, res) => {

  const { userId } = req.params;

  if (!isValidObjectId(userId)) {
    throw new ApiError(400, "This user id is not valid");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "user not found!");
  }


  const deleteUser = await User.deleteOne(
    { _id: userId }
  );
  console.log("🚀 ~ deleteUser:", deleteUser)

  if (deleteUser.deletedCount !== 1) {
    throw new ApiError(500, "something went wrong while deleting order");
  }

  // return responce
  return res
    .status(201)
    .json(new ApiResponse(200, deleteUser, "order deleted successfully!!"));
});

export { deleteUser };
