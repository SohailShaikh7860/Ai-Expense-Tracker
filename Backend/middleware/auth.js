import jwt from 'jsonwebtoken';

const authToken = (req,res,next)=>{
    const token = req?.cookies?.token || req.authorization?.split(" ")[1];

    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log("Error",error);
        res.status(500).json({message:"Internal server error"});
    }
}

export {
    authToken
}