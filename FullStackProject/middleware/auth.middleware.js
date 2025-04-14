import jwt from "jsonwebtoken";

export const isLoggedIn = async (req, res, next) => {
  try {
    console.log(req.cookies);
    let token = req.cookies.token;
    console.log("Token found: ", token ? "Yes" : "No");
    if (!token) {
      console.log("No Token");
      return res.status(401).json({
        success: false,
        message: "Authentication Failed",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded token", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Auth Middleware Failure");
    return res.status(501).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
