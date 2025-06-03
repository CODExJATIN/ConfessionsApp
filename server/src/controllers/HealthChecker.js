import { ApiResponse } from "../utils/apiResponse.js"
import { ApiError } from "../utils/apiError.js"
import { AsyncHandler } from "../utils/asyncHandler.js"

const HealthChecker=AsyncHandler(async (req, res) => {
    return res
    .status(202).json(new ApiResponse(202,"OK",`HealthChecker-everything is good`))
})

export {HealthChecker}