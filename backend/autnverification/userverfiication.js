import jwt from "jsonwebtoken";
import dotenv from'dotenv'
dotenv.config()
export default function userverification(req,res,next){
    const token = localStorage.getItem('token')

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        // Verify the token (assuming JWT is used)
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY );
        req.user = decoded; // Attach user information to the request object
        
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

}