# 🛒 E-Commerce App  
🔗 Live Demo: https://e-commerce-2026.netlify.app/

A full-stack E-Commerce web application with user authentication,  
product browsing, and cart management.

---

## 🌐 Database (Cloud)

This project uses **MongoDB Atlas** as a cloud database.

- No local MongoDB setup required  
- Secure and scalable cloud database  
- Connected using Mongoose  

---

## 🛠️ Tech Stack

### Frontend (Client)

- React 19
- Vite
- Tailwind CSS
- React Router DOM
- Axios

### Backend (Server)

- Node.js
- Express 5
- MongoDB Atlas + Mongoose
- JWT Authentication
- Bcrypt (Password Hashing)
- Cookie Parser
- Express Session

---

## 📁 Project Structure

E-Commerce/
├── client/ → React + Vite Frontend
└── server/ → Node.js + Express Backend

---

## 🚀 Getting Started

### Install Dependencies

cd client && npm install  
cd server && npm install  

### Run Development Server

cd client  
npm run dev  

cd server  
npm run dev  

---

## 🔐 Environment Variables

Create a `.env` file in the server folder and add:

MONGO_URI=your_mongodb_atlas_connection_string  
JWT_SECRET=your_secret_key  

---

## ✨ Features

- User Authentication (Login / Signup)
- Secure Password Hashing (Bcrypt)
- JWT-based Authorization
- Product Listing
- Add to Cart Functionality
- REST API Integration
