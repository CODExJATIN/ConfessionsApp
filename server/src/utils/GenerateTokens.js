import { User } from "../models/user.models.js";  
import { ApiError } from "./apiError.js"; 

// Function to generate access and refresh tokens for the user
const GenerateAccessAndRefreshTokens = async function (user_id) {
  try {
    // Finding the user by their ID from the database
    const user = await User.findById(user_id);
    
    // If user does not exist, throw an ApiError with a custom message
    if (!user) {
      throw new ApiError(404, "incorrect user_id"); // 404 Not Found error
    }

    // Generate the access and refresh tokens for the user
    const Access_Token = await user.generateAccessToken();
    const Refresh_Token = await user.generateRefreshToken();

    // Save the refresh token in the user's document
    user.RefreshToken = Refresh_Token;

    // Save the updated user document without validating the fields (for efficiency)
    await user.save({ validateBeforeSave: false });
    

    // Return both the generated tokens
    return { Access_Token, Refresh_Token };

  } catch (error) {
    // Catch any error that occurs and log it
    console.error("error while generating tokens", error);

    // Throw a custom error in case of failure during token generation
    throw new ApiError(
      406,
      "error while generating refresh token and access token" // 406 Not Acceptable error
    );

    // Return null in case of an error (this line is unreachable)
    return null;
  }
};

export { GenerateAccessAndRefreshTokens }; // Export the function for use in other parts of the application
