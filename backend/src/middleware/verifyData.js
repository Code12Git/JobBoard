const { appError } = require("../utils");

const verifyData = (schema) => async (req, res, next) => {
  try {
    const parsedBody = await schema.parse(req.body);
    req.body = parsedBody;
    next();
  } catch (err) {
    console.log("Error:", err);
    next(new appError("INTERNAL_SERVER_ERROR", "Something went wrong", 500));
  }
};

module.exports = verifyData;
