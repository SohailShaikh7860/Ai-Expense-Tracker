import jwt from 'jsonwebtoken';

const generateToken = (token)=>{
    return jwt.sign(token,process.env.JWT_SECRET,{expiresIn:'1d'});
}

const  setTokenCookie= (res,token)=>{
    res.cookie('token',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge:24*60*60*1000 
    });
}

export {
    generateToken,
    setTokenCookie
}