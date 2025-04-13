const _ = require('lodash');
const {appError} = require('../utils')
const {ClerkExpressRequireAuth} = require('@clerk/clerk-sdk-node')
const { NOT_FOUND, INVALID_ACCESS_TOKEN, NO_AUTH_HEADER, UNAUTHORIZED } = require('../utils/errors');
const prisma = require('../lib');
const {fromEnv} = require('../utils')
 const jwt = require('jsonwebtoken')
 const {clerkClient} = require('@clerk/clerk-sdk-node')
 const verifyToken = async (req, res, next) => {
  try {
    // 1. Verify and decode Clerk token
    const authHeader = req.headers.authorization;
    // console.log(authHeader)
    if (!authHeader?.startsWith("Bearer ")) {
      throw new appError(401, "Authorization header missing or invalid");
    }
    // console.log(authHeader)
    const token = authHeader.split(" ")[1];
    // console.log(token)
    const session = await clerkClient.verifyToken(token);
    // console.log(session)
    if (!session?.sub) {
      throw new appError(401, "Invalid authentication token");
    }
    // console.log(token,session)

    // 2. Find or create user in database
    let user = await prisma.user.findUnique({
      where: { clerkId: session.sub }
    });

    // console.log(user)

    if (!user) {
      const clerkUser = await clerkClient.users.getUser(session.sub);
      user = await prisma.user.create({
        data: {
          clerkId: clerkUser.id,
          email: clerkUser.emailAddresses[0]?.emailAddress,
          name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
          profilePic: clerkUser.imageUrl,
          role: "jobseeker" // Default role
        }
      });
    }

    // 3. Attach user to request
    req.user = user;
    next();

  } catch (error) {
    console.error("Authentication error:", error);
    next(error);
  }
};


// Employer role verification middleware
const verifyTokenAndEmployer = async (req, res, next) => {
  await verifyToken(req, res, async () => {
    try {
      if (req.user.role === 'employer') {
        return next();
      }
      throw new appError(
        UNAUTHORIZED.code,
        'You are not authorized as an employer',
        UNAUTHORIZED.statusCode
      );
    } catch (err) {
      next(err);
    }
  });
};

const verifyTokenAndEmployerOrAdmin = async (req, res, next) => {
  await verifyToken(req, res, async () => {
    try {
      if (req.user.role === 'employer' || req.user.role === 'admin') {
        return next();
      }
      throw new appError(
        UNAUTHORIZED.code,
        'You are not authorized as an employer or admin',
        UNAUTHORIZED.statusCode
      );
    } catch (err) {
      next(err);
    }
  });
};

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

     const user = await prisma.admin.findUnique({
      where: { username: decodedToken.username }
    });
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


module.exports = { verifyToken, verifyTokenAndAdmin , verifyTokenAndEmployer,verifyTokenAndEmployerOrAdmin };
