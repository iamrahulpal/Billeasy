import { isValidObjectId } from "mongoose";
import { User } from "../../models/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const updateUser = asyncHandler(async (req, res) => {
  let update = {};

  const { userId } = req.params;

  if (!isValidObjectId(userId)) {
    throw new ApiError(400, "This user is not valid");
  }

  if (req.body.email) update.email = req.body.email;
  if (req.body.username) update.username = req.body.username;

  const user = await User.findByIdAndUpdate(
    { _id: userId },
    {
      $set: update
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User updated successfully"));
});

export { updateUser };
