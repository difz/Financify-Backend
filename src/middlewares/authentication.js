  const { decodeSessionJwt } = require("../helpers/authentication");
  const { getUserBySessionToken } = require("../models/user");

  const ensureLogin = async (req, res, next) => {
    try {
      const decodedSession = decodeSessionJwt(req, res);

      const existingUser = await getUserBySessionToken(
        decodedSession.sessionToken,
      );

      if (!existingUser) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      req.user = existingUser;
      console.log("User", req.user);

      next();
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: error.message,
      }); 
    }
  };

  module.exports = {ensureLogin};

