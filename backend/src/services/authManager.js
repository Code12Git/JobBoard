const { clerkClient } = require("@clerk/express");
const { NOT_FOUND, INVALID_CREDENTIALS } = require("../utils/errors");
const { appError } = require("../utils");
const _ = require("lodash");
const { fromEnv } = require("../utils");
const prisma = require("../lib");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const getUser = async (clerkId, token) => {
  try {
    const user = await clerkClient.users.getUser(clerkId);
    if (!user) {
      throw new appError(
        NOT_FOUND.code,
        NOT_FOUND.message,
        NOT_FOUND.statusCode
      );
    }

    const {
      id,
      emailAddresses,
      firstName,
      lastName,
      imageUrl,
      externalAccounts,
    } = user;
    const isSSOUser = externalAccounts && externalAccounts.length > 0;
    const clerkProvider = isSSOUser ? externalAccounts[0].provider : "manual";

    const providerMap = {
      oauth_google: "google",
      oauth_github: "github",
    };

    const provider = providerMap[clerkProvider] || "manual";
    const userData = await prisma.user.upsert({
      where: { clerkId: id },
      update: {
        email: emailAddresses[0]?.emailAddress || "",
        name: `${firstName || ""} ${lastName || ""}`.trim(),
        profilePic: imageUrl,
        role: "jobseeker",
        provider,
        token,
      },
      create: {
        clerkId: id,
        email: emailAddresses[0]?.emailAddress || "",
        name: `${firstName || ""} ${lastName || ""}`.trim(),
        profilePic: imageUrl,
        role: "jobseeker",
        provider,
        token,
      },
    });

    return userData;
  } catch (err) {
    console.error("Error fetching or updating user:", err);
    throw err;
  }
};

const createUser = async (body) => {
  if (!body || !body.clerkId) {
    throw new Error("Invalid request body: Missing role or clerkId");
  }

  const { clerkId, token } = body;
  try {
    const user = await getUser(clerkId, token);
    return user;
  } catch (err) {
    console.error("Error creating user:", err);
    throw err;
  }
};

const adminLogin = async (body) => {
  const { username, password } = body;

  if (!username || !password) {
    throw new appError({ statusCode: 400, message: "Admin details not found" });
  }

   const ADMIN_USERNAME = fromEnv('ADMIN_USERNAME');
  const ADMIN_PASSWORD = fromEnv('ADMIN_PASSWORD');

   if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    throw new appError({ ...INVALID_CREDENTIALS, message: "Invalid credentials" });
  }

   const token = jwt.sign(
    { username: username }, 
    process.env.JWT_SECRET,  
    { expiresIn: "1h" }
  );

  return { username, token };
};

const updateRole = async (body, user) => {
  const { role } = body;
  const { id } = user;
  console.log(role,id)
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { role },
    });

    if (!updatedUser) {
      throw new appError(
        NOT_FOUND.code,
        NOT_FOUND.message,
        NOT_FOUND.statusCode
      );
    }

    return updatedUser;
  } catch (err) {
    console.error("Error updating user role:", err);
    throw err;
  }
};



module.exports = { getUser, createUser, updateRole, adminLogin };
