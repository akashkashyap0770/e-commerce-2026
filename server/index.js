// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const MongodbConnected = require("./connection");

// // 💠 Automatically Authentication
// const session = require("express-session");

// // 💠 Manually Authentication
// // const cookieParser = require("cookie-parser");
// const checkAuth = require("./middlewares/auth.middleware");

// const userRoutes = require("./routes/user.route");

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// // Cors: cross origin system
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   }),
// );
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

// // Automatically Session setup
// app.use(
//   session({
//     secret: process.env.SECRETKEY,
//     resave: false, // Session ko har request pe dobara save nahi karega agar usme koi change nahi hua.
//     saveUninitialized: false, // Jab tak session me koi data store nahi hota, tab tak session create hi nahi karega.
//     cookie: {
//       httpOnly: true, // Browser me jo cookie store hoti hai, usse JavaScript (frontend code) access nahi kar sakta.
//     },
//   }),
// );

// /**-------------------------------------------------------------------------------------------------------- */

// // NO CACHE (BACK BUTTON FIX)
// /*
// - no-store → browser kuch bhi save nahi karega
// - no-cache → har request server se fresh data lega
// - must-revalidate → cache use karne se pehle server check kare
// - private → sirf user ke browser ke liye (shared cache nahi)
// */
// app.use((req, res, next) => {
//   res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
//   next();
// });

// // EJS setup
// app.set("view engine", "ejs");
// app.set("views", "./views");

// // Routes
// app.use("/", userRoutes);

// /**-------------------------------------------------------------------------------------------------------- */

// // (Protected) HOME
// app.get("/", checkAuth, (req, res) => {
//   // const user = req.query.user_name || null;
//   // if (!user) {
//   //   return res.redirect("/signup"); // 👈 default signup
//   // }

//   if (!req.session.user) {
//     return res.redirect("/signin");
//   }

//   res.render("home", { user: req.session.user.user_name });
// });

// LOGOUT;
// app.get("/logout", (req, res) => {
//   req.session.destroy(() => {
//     res.redirect("/signin");
//   });
// });

// /**-------------------------------------------------------------------------------------------------------- */

// // (Protected) HOME Manually
// // app.get("/", checkAuth, (req, res) => {
// //   // res.render("home", {
// //   //   user: req.user.user_name,
// //   // });
// //   res.json({ user: req.user });
// // });

// // Server start
// const startServer = async () => {
//   try {
//     await MongodbConnected(process.env.MONGODB_URL);

//     app.listen(PORT, () => {
//       console.log(`🚀 Server Started at PORT:${PORT}`);
//     });
//   } catch (error) {
//     console.log("Server start error:", error);
//   }
// };

// startServer();
