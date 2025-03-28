const _ = require('lodash');
const {appError} = require('../utils')
const {ClerkExpressRequireAuth} = require('@clerk/clerk-sdk-node')
const { NOT_FOUND, INVALID_ACCESS_TOKEN, NO_AUTH_HEADER, UNAUTHORIZED } = require('../utils/errors');
const prisma = require('../lib');
 
const verifyToken = async (req, res, next) => {
  ClerkExpressRequireAuth()(req, res, async () => {
    try {
      const { userId } = req.auth;

      if (!userId) {
        return next(new appError(INVALID_ACCESS_TOKEN.code, INVALID_ACCESS_TOKEN.message, INVALID_ACCESS_TOKEN.statusCode));
      }

      const user = await prisma.user.findUnique({
        where: { clerkId: userId },
      });

      console.log("User role:", user?.role);

      if (!user) {
        return next(new appError(NOT_FOUND.code, NOT_FOUND.message, NOT_FOUND.statusCode));
      }

      req.user = user;
      console.log("User in request:", req.user);
      next();
    } catch (err) {
      console.error("Error in verifyToken:", err);
      next(err); 
    }
  });
};


const verifyTokenAndEmployer = async(req , res , next ) => {
    try{
        await verifyToken(req,res,async() => {
            if(req.user.role==='employer'){
                return next()
            }
            throw new appError(UNAUTHORIZED.code,'You are not an employer',UNAUTHORIZED.statusCode)
        })
    }catch(err){
        next(err)
    }
}

const verifyTokenAndAdmin = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

     if (!authorization || !authorization.startsWith("Bearer ")) {
      throw new appError(NO_AUTH_HEADER.code, NO_AUTH_HEADER.message, NO_AUTH_HEADER.statusCode);
    }

    const accessToken = authorization.split(" ")[1];

     if (!accessToken) {
      throw new appError(INVALID_ACCESS_TOKEN.code, INVALID_ACCESS_TOKEN.message, INVALID_ACCESS_TOKEN.statusCode);
    }

     const decodedToken = jwt.verify(accessToken, fromEnv("JWT_SECRET"));

     const user = await prisma.admin.findUnique({ username: decodedToken.username });

    if (!user) {
      throw new appError(NOT_FOUND.code, NOT_FOUND.message, NOT_FOUND.statusCode);
    }

     req.user = user;

    if (req.user.role !== "admin") {
      throw new appError(403, "Unauthorized: Admin access required", 403);
    }

    next();
  } catch (err) {
    next(err);
  }
};


module.exports = { verifyToken, verifyTokenAndAdmin , verifyTokenAndEmployer };
