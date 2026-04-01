const USER = require("../models/user.model");
const bcrypt = require("bcrypt");
// const { v4: uuidv4 } = require("uuid");
// const sessionStore = require("../utils-services/sessionStore");
const jwt = require("jsonwebtoken");

// Signup
async function handleSignupUser(req, res) {
  try {
    const {
      user_name,
      user_email,
      user_password,
      user_age,
      user_gender,
      user_address,
    } = req.body;

    // Validation
    if (
      !user_name ||
      !user_email ||
      !user_password ||
      !user_age ||
      !user_gender ||
      !user_address
    ) {
      // return res.render("signup", { message: "All fields are required" });
      return res.status(400).json({ message: "All fields required" });
    }

    // Check existing user
    const existingUser = await USER.findOne({ user_email });

    if (existingUser) {
      // return res.render("signup", { message: "User already exists" });
      return res.status(400).json({ message: "User already exists" });
    }

    // 🔒 HASH PASSWORD
    const hashedPassword = await bcrypt.hash(user_password, 10);

    // Create user
    await USER.create({
      user_name,
      user_email,
      user_password: hashedPassword,
      user_age,
      user_gender,
      user_address,
    });

    // Signup ke baad signin pe redirect
    // return res.redirect("/signin");
    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    // res.render("signup", { message: `Error: ${error.message}` });
    res.status(500).json({ message: error.message });
  }
}

// Signin
async function handleSigninUser(req, res) {
  try {
    const { user_email, user_password } = req.body;

    // Validation
    if (!user_email || !user_password) {
      // return res.render("signin", {
      //   message: "Enter Email Or Password",
      // });
      return res.status(400).json({ message: "Enter Email & Password" });
    }

    // Check existing user
    const user = await USER.findOne({ user_email });
    if (!user) {
      // return res.render("signin", { message: "User not found" });
      return res.status(400).json({ message: "User not found" });
    }

    // Only password compare using url base
    // if (user.user_password !== user_password) {
    //   return res.render("signin", { message: "Wrong Password" });
    // }

    // Signin ke baad home pe redirect with user name in query
    // return res.redirect(`/?user_name=${user.user_name}`);

    // 🔒 COMPARE PASSWORD
    const isMatch = await bcrypt.compare(user_password, user.user_password);
    if (!isMatch) {
      // return res.render("signin", { message: "Wrong password" });
      return res.status(400).json({ message: "Wrong password" });
    }

    /**------------------------------------------------------------------------------------------------- */

    // 🔥 Session create :- Yeh jo user object hai → server side store hota hai
    // const sessionId = uuidv4();

    // sessionStore[sessionId] = {
    //   userId: user._id,
    //   user_name: user.user_name,
    // };

    // 🍪 cookie set
    // res.cookie("sessionId", sessionId, { httpOnly: true });

    /**------------------------------------------------------------------------------------------------- */

    // 🔥 JWT Token create: jwt.sign(payload, secret, options: expiry)

    // const token = jwt.sign(
    //   { userId: user._id, user_name: user.user_name },
    //   process.env.JWT_SECRET,
    //   {
    //     expiresIn: "1d",
    //   },
    // );

    /**------------------------------------------------------------------------------------------------- */

    const payload = {
      userId: user._id,
      user_name: user.user_name,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // 🍪 cookie set
    // ➡️ httpOnly: true :- Cookie ko JavaScript access nahi kar sakta | Hacker (XSS attack) cookie chura sakta hai
    // ➡️ sameSite: "lax" :- Cookie sirf same site requests me bheji jayegi | Ye CSRF attack (Cross-Site Request Forgery) se bachata hai.
    res.cookie("token", token, { httpOnly: true, sameSite: "lax" });

    // return res.redirect("/");
    res.json({
      message: "Login successful",
      user: { userId: user._id, user_name: user.user_name },
    });
  } catch (error) {
    // res.render("signin", { message: `Error: ${error.message}` });
    res.status(500).json({ message: error.message });
  }
}

/**------------------------------------------------------------------------------------------------- */

// Logout
// async function handleLogout(req, res) {
//   const sessionid = req.cookies.sessionId;

//   delete sessionStore[sessionid];
//   res.clearCookie("sessionId");

//   res.redirect("/signin");
// }

/**------------------------------------------------------------------------------------------------- */

async function handleLogout(req, res) {
  res.clearCookie("token");
  res.json({ success: true, message: "User logout successfully." });
}

module.exports = { handleSignupUser, handleSigninUser, handleLogout };
