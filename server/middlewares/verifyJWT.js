import jwt from "jsonwebtoken";
export const verifyJWT = async(req,res,next)=>{
    const authHeader = req.headers.authorization || req.headers.Authorization;
    console.log(authHeader) 
    if(!authHeader?.startsWith('Bearer ')) return res.status(401).json({message : "bearer"});
    
   const  token = authHeader.split(' ')[1]; //Bearer token

   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(
    (err,decoded)=>{
        if(err) return res.sendStatus(403)  //invalid token
        req.user = decoded.UserInfo.id;
        req.role = decoded.UserInfo.role;
        next();
    }
   ))
   
    
}