// import jwt from "jsonwebtoken";


// export const auth = async(req, res, next) =>{
//     const token = req.headers.authorization?.split
//     if(!token) return res.status(401).json({message: "Unauthorized"});


//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch (error) {
//         return res.status(401).json({message: "Invalid token or expired token"});
//     }
// }

import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Get the token after "Bearer"

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Assign decoded user to request
    next(); // Proceed to the next middleware
  } catch (error) {
    return res.status(401).json({ message: "Invalid token or expired token" });
  }
};
