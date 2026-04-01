// const sessionStore = require("../utils-services/sessionStore");

// 💠 Session Base Authentication ( stateFull )
// const checkAuth = (req, res, next) => {
//   const sessionId = req.cookies.sessionId;

//   if (!sessionId || !sessionStore[sessionId]) {
//     return res.redirect("/signin");
//   }

//   req.user = sessionStore[sessionId];
//   next();
// };

/**----------------------------------------------------------------------------------------------------- */
const jwt = require("jsonwebtoken");

// 💠 JWT Base Authentication ( stateLess )
const checkAuth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Token not found!" });
  // console.log(token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res
      .status(401)
      .json({ success: false, message: "Token expired or Invalid!" });
  }
};

module.exports = checkAuth;
