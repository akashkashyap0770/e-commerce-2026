const USER = require("../models/user.model");
const bcrypt = require("bcrypt");

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
      return res.render("signup", { message: "All fields are required" });
    }

    // Check existing user
    const existingUser = await USER.findOne({ user_email });

    if (existingUser) {
      return res.render("signup", { message: "User already exists" });
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
    return res.redirect("/signin");
  } catch (error) {
    res.render("signup", { message: `Error: ${error.message}` });
  }
}

async function handleSigninUser(req, res) {
  try {
    const { user_email, user_password } = req.body;

    // Validation
    if (!user_email || !user_password) {
      return res.render("signin", {
        message: "Enter Email Or Password",
      });
    }

    // Check existing user
    const user = await USER.findOne({ user_email });
    if (!user) {
      return res.render("signin", { message: "User not found" });
    }

    // Only password compare
    // if (user.user_password !== user_password) {
    //   return res.render("signin", { message: "Wrong Password" });
    // }

    // Signin ke baad home pe redirect with user name in query
    // return res.redirect(`/?user_name=${user.user_name}`);

    // 🔒 COMPARE PASSWORD
    const isMatch = await bcrypt.compare(user_password, user.user_password);
    if (!isMatch) {
      return res.render("signin", {
        message: "Wrong Password",
      });
    }

    // ✅ SESSION SET :- Yeh jo user object hai → server side store hota hai
    req.session.user = user;
    return res.redirect("/");
  } catch (error) {
    res.render("signin", { message: `Error: ${error.message}` });
  }
}

module.exports = { handleSignupUser, handleSigninUser };
