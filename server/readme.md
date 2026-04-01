# Folder and File Structure

project-root/
│
├── connection.js
│
├── models/
│ └── user.model.js
│
├── controllers/
│ ├── auto.user.controller.js
│ └── manual.user.controller.js
│
├── routes/
│ └── user.routes.js  
│
├── middlewares/
│ └── auth.middleware.js
│
├── utils-services/
│ └── sessionStore.js # (manual session storage)
│
├── views/
│ ├── partials/
│ │ ├── head.ejs
│ │ ├── navbar.ejs
│ │ └── scripts.ejs
│ │
│ ├── pages/
│ │ ├── home.ejs
│ │ ├── signup.ejs
│ │ └── signin.ejs
│
├── public/ # static files (CSS, JS, images)
│ ├── css/
│ ├── js/
│ └── images/
│
├── .env
├── app.js
└── package.json
