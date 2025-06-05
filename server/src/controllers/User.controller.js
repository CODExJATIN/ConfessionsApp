import { AsyncHandler } from "../utils/asyncHandler.js"; 
import { ApiResponse } from "../utils/apiResponse.js"; 
import { ApiError } from "../utils/apiError.js"; 
import { User } from "../models/user.models.js";
import { GenerateAccessAndRefreshTokens } from "../utils/GenerateTokens.js";
import jwt, { decode } from "jsonwebtoken";

const User_registeration = AsyncHandler(async function (req, res) {
 
  try {
    // Check if the request body is empty
    if (Object.keys(req.body).length === 0) {
      throw new ApiError(400, "Request body cannot be empty");
    }

    // Extract user details from the request body
    const { fullName, email, username, password } = req.body;

    // Validate that none of the required fields are empty or just contain spaces
    if (
      [fullName, email, username, password].some(
        (fields) => fields?.trim() === "",
      )
    ) {
      throw new ApiError(400, "fields cannot be empty"); // Throw error if any field is empty
    }

    // Check if a user with the same username or email already exists
    const ExistingUser = await User.findOne({
      $or: [{ username: username.toLowerCase() }, { email: email.toLowerCase() }],
    });
    if (ExistingUser) {
      throw new ApiError(
        401,
        "User with same email or username already exists",
      ); // Throw error if the user exists
    }
   
  
    const user = await User.create({
      FullName: fullName,
      Username: username.toLowerCase(), // Ensure the username is stored in lowercase
      Email: email,
      Password: password, // Save the password (should be hashed in schema)
    });

    // Fetch the created user from the database, excluding password and refresh token for security
    const createdUser = await User.findById(user._id).select(
      "-password -RefreshToken",
    );

    // If user creation fails, throw an error
    if (!createdUser) {
      throw new ApiError(400, "something went wrong while registering");
    }

    // Send a successful response with the created user details
    return res
      .status(201)
      .json(new ApiResponse(201,  "User Registered successfully",createdUser,));
  } catch (error) {
    // Log the error and handle cleanup if user creation fails
    console.log("user creation failed", error);

        // Handle MongoDB duplicate key error
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyPattern)[0];
      const message = `A user with this ${duplicateField} already exists`;
      return res.status(409).json(new ApiResponse(409, message));
    }

    throw new ApiError(
      500,
      "something went wrong user was not created",
    );
  }
});

const User_login = AsyncHandler(async function (req, res) {
  try {
    // Check if the request body is empty
    if (Object.keys(req.body).length === 0) {
      throw new ApiError(400, "Request body cannot be empty");
    }

    const { username, password } = req.body;

    // Check if any field is empty
    if ([username, password].some((fields) => fields?.trim() === "")) {
      throw new ApiError(401, "All fields are required");
    }

    // Find user by email
    const user = await User.findOne({ Username: username });
    if (!user) {
      throw new ApiError(404, "User not found, incorrect username");
    }

    // Check if the password is correct
    const isPassword = await user.isPasswordCorrect(password);
    if (!isPassword) {
      throw new ApiError(402, "Invalid credentials");
    }

    // Generate access and refresh tokens
    const { Access_Token, Refresh_Token } = await GenerateAccessAndRefreshTokens(
      user._id,
    );

    // Fetch the user without sensitive data (e.g., Password and RefreshToken)
    const Logged_In_User = await User.findById(user._id).select(
      "-Password -RefreshToken",
    );
    if (!Logged_In_User) {
      throw new ApiError(400, "You are not logged in");
    }

    // Set cookie options (e.g., HttpOnly, Secure if in production)
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    // Respond with the tokens and user info
    return res
      .status(201)
      .cookie("Access_Token", Access_Token, options)
      .cookie("Refresh_Token", Refresh_Token, options)
      .json(
        new ApiResponse(
          201,
          "User logged in successfully",
           {
            User: Logged_In_User,
            Access_Token,
            Refresh_Token,
          },
        ),
      );
  } catch (error) {
    console.error("Error while logging in", error);
    throw new ApiError(402, "Error while login");
  }
});

const RefreshAccessToken = AsyncHandler(async function (req, res) {
  try {
    // Retrieve the refresh token from cookies or the request body
    const IncomingRefreshToken =
      req.cookies.Refresh_Token || req.body.Refresh_Token;

    // If no refresh token is provided, return a 400 (Bad Request) error
    if (!IncomingRefreshToken) {
      throw new ApiError(400, "Refresh token is required");
    }

    let DecodedToken;
    try {
      // Verify the incoming refresh token using the secret key
      DecodedToken = jwt.verify(
        IncomingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET,
      );
    } catch (error) {
      // If verification fails, log the error and return a 401 (Unauthorized) error
      console.error("Verification failed:", error);
      throw new ApiError(401, "Invalid refresh token");
    }

    // Ensure the decoded token exists (additional safeguard, usually redundant)
    if (!DecodedToken) {
      throw new ApiError(401, "Invalid refresh token");
    }

    // Fetch the user associated with the token's payload (_id)
    const user = await User.findById(DecodedToken?._id);
    if (!user) {
      // If the user is not found, return a 404 (Not Found) error
      throw new ApiError(404, "User not found");
    }

    // Check if the provided refresh token matches the one stored for the user
    if (IncomingRefreshToken !== user?.RefreshToken) {
      // If the tokens do not match, return a 403 (Forbidden) error
      throw new ApiError(403, "Incorrect refresh token");
    }

    // Generate new access and refresh tokens for the user
    const { Access_Token, Refresh_Token: New_Refresh_Token } =
      await GenerateAccessAndRefreshTokens(user._id);

    // Set cookie options
    const options = {
      httpOnly: true, // Makes the cookie inaccessible to client-side JavaScript
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    };

    // Respond with new tokens set in cookies and send a success message
    
    return res
      .status(201)
      .cookie("Access_Token", Access_Token, options)
      .cookie("Refresh_Token", New_Refresh_Token, options)
      .json(
        new ApiResponse(
          201,
          "Tokens refreshed successfully", 
           {
            User: user, 
            Access_Token,
            Refresh_Token: New_Refresh_Token,
          },
        ),
      );
  } catch (error) {
    // Log the error for debugging
    console.error("Error while refreshing access token:", error);

    // Return a generic error with the appropriate status code and message
    throw new ApiError(
      error.statusCode || 500, // Use specific error code if available, otherwise fallback to 500
      error.message || "Internal server error", // Use specific message if available
    );
  }
});

const Log_Out_User = AsyncHandler(async function (req, res) {
  try {
    // Clear the user's refresh token from the database
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          RefreshToken: null, // Remove the stored refresh token
        },
      },
      {
        new: true, // Return the updated user document (optional)
      },
    );

    // Set cookie options
    const options = {
      httpOnly: true, // Makes the cookie inaccessible to client-side JavaScript
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "strict", // Prevent cross-site cookie usage (added for better security)
    };

    // Clear cookies and respond
    return res
      .status(201)
      .clearCookie("Access_Token", options) // Fix: Removed typo
      .clearCookie("Refresh_Token", options)
      .json(
        new ApiResponse(
          201,
          "User logged out successfully", 
          {}
        ),
      );
  } catch (error) {
    console.error("Error while logging out", error);
    throw new ApiError(402, "Error while logging out");
  }
});

const Update_Password = AsyncHandler(async function (req, res) {
  try {
    const { NewPassword, OldPassword } = req.body;
    if ([NewPassword, OldPassword].some((field) => field?.trim() === "")) {
      throw new ApiError(400, "fields should not be empty");
    }
    const user = await User.findById(req.user._id);

    const isPassword = await user.isPasswordCorrect(OldPassword);

    if (!isPassword) {
      throw new ApiError(401, "password is incorrect");
    }

    user.Password = NewPassword;

    await user.save({ validateBeforeSave: false });

    return res.status(200).json(new ApiResponse(200,  "Password updated",{}));
  } catch (error) {
    console.error("error while updating password", error);
    throw new ApiError(
      error.statusCode || 500,
      error.message || "something went wrong while updating password",
    );
  }
});

const Current_User = AsyncHandler(async function (req, res) {
  return res.status(200).json(new ApiResponse(200,  "current user",req.user));
});

const Update_Account_Details = AsyncHandler(async function (req, res) {
  try {
    const { fullName, email, password } = req.body;

    if (!password) {
      throw new ApiError(400, "password is required to update account details");
    }
    const user = await User.findById(req.user._id);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const isPassword = await user.isPasswordCorrect(password);

    if (!isPassword) {
      throw new ApiError(401, "password is incorrect");
    }

    if (fullName?.trim() !== "") {
      user.FullName = fullName;
    }

    if (email?.trim() !== "") {
      user.Email = email;
    }

    await user.save();

    const savedUser = await User.findById(user._id).select(
      "-Password -RefreshToken",
    );

    if (!savedUser) {
      throw new ApiError(500, "something went wrong while saving updated user");
    }

    return res
      .status(200)
      .json(
       new ApiResponse(200, "Account details updated successfully", savedUser),
      );
  } catch (error) {
    console.error("error while updating account details", error);
    throw new ApiError(
      error.statusCode || 500,
      error.message || "something went wrong while updating account details",
    );
  }
});


export {
  User_registeration,
  User_login,
  RefreshAccessToken,
  Log_Out_User,
  Update_Password,
  Update_Account_Details,
  Current_User,
};

