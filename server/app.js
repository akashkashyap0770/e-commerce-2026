require("dotenv").config();
const express = require("express");
const cors = require("cors");
const MongodbConnected = require("./connection");
const cookieParser = require("cookie-parser");
const checkAuth = require("./middlewares/auth.middleware");

const userRoutes = require("./routes/user.route");
const productRoutes = require("./routes/product.route");

const app = express();
const PORT = process.env.PORT || 5000;

// Cors: cross origin system
app.use(
  cors({
    origin: ["http://localhost:5173", "https://e-commerce-2026.netlify.app/"],
    credentials: true,
  }),
);
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/**-------------------------------------------------------------------------------------------------------- */

// NO CACHE (BACK BUTTON FIX)
/*
- no-store → browser kuch bhi save nahi karega
- no-cache → har request server se fresh data lega
- must-revalidate → cache use karne se pehle server check kare
- private → sirf user ke browser ke liye (shared cache nahi)
*/
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  next();
});

// EJS setup
// app.set("view engine", "ejs");
// app.set("views", "./views");

// Routes
app.use("/", userRoutes);
app.use("/api", productRoutes);

// (Protected) User Home Manually
app.get("/me", checkAuth, (req, res) => {
  // res.render("home", {
  //   user: req.user.user_name,
  // });
  res.json({ user: req.user });
});

// Server start
const startServer = async () => {
  try {
    await MongodbConnected(process.env.MONGODB_URL);

    app.listen(PORT, () => {
      console.log(`🚀 Server Started at PORT:${PORT}`);
    });
  } catch (error) {
    console.log("Server start error:", error);
  }
};

startServer();
