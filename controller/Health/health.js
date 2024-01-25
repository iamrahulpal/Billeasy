import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const health = asyncHandler(async (req, res) => {
  const health = {
    uptime: process.uptime,
    message: "ok",
    responseTime: process.hrtime(),
    timestamp: Date.now()
  };
  try {
    return res.status(200).json(new ApiResponse(200, health, "Health is good"));
  } catch (error) {
    throw new ApiError(503, "Getting error in health check time");
  }
});

export { health };
