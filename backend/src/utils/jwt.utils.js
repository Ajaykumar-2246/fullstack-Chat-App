import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  // Set token as a secure HTTP-only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // Only send over HTTPS
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    sameSite: "strict", 
  });
};
