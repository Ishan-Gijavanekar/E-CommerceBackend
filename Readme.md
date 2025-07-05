# 🛍️ E-Commerce Backend API

This is a feature-rich backend for an e-commerce platform powered by **Node.js**, **Express**, **MongoDB**, and **JWT authentication**. It supports user and admin functionalities, product and order management, analytics, image uploads via **Multer**, and secure API access.

---

## ⚙️ Features

- 🛡️ Authentication with **JWT** & protected routes via middleware
- 👤 Role-based access for users and admins
- 🗂️ Full **CRUD** for categories, products, and orders
- 📦 Image handling using **Multer**
- 📊 Admin-focused analytics routes
- 🚀 Fast & scalable architecture with modularized folders

---

## 🔧 Tech Stack

| Tech       | Description                         |
|------------|-------------------------------------|
| Node.js    | JavaScript runtime environment      |
| Express.js | Web framework for Node.js           |
| MongoDB    | NoSQL database                      |
| Mongoose   | ODM for MongoDB                     |
| JWT        | JSON Web Token for auth             |
| Multer     | Middleware for image uploads        |

---

## 🔐 Authentication Routes

```
POST   /api/register            → User registration  
POST   /api/login               → User/Admin login  
POST   /api/logout              → Logout (requires auth)
GET    /api/get-users           → Retrieve all users [Admin]  
GET    /api/get-user/:id        → Retrieve user by ID [Admin]
```

---

## 📦 Category Routes

```
POST   /api/add-category             → Add a new category  
DELETE /api/delete-category/:id     → Delete a category  
GET    /api/all-categories          → Get all categories  
GET    /api/get-category-by-id/:id  → Get category by ID  
PUT    /api/upadate-category/:id    → Update category details
```

---

## 📦 Product Routes

```
POST   /api/add-product                           → Add a new product  
GET    /api/get-products                          → Fetch all products  
GET    /api/get-product-by-id/:id                 → Get product details by ID  
PUT    /api/update-product/:id                    → Update a product  
DELETE /api/delete-product/:id                    → Delete a product  
GET    /api/get-product-with-category             → Get products with categories  
GET    /api/get-product-with-category/:id         → Get product (with category) by ID  
GET    /api/get-product-count/:count              → Get limited number of products  
GET    /api/get-featured-products                 → Get featured products  
GET    /api/get-product-by-category               → Get products by category
```

---

## 📦 Order Routes

```
POST   /api/new-order                → Create new order  
GET    /api/get-orders              → Get all orders  
GET    /api/get-user-orders/:id     → Get orders for a specific user  
GET    /api/get-order-by-id/:id     → Get order by ID  
PUT    /api/update-order-status/:id → Update the order status  
DELETE /api/delete-order/:id        → Delete an order  
GET    /api/total-sales             → View analytics: total sales
```

---

## 🖼️ Image Upload

```
POST   /api/upload                  → Upload product image (via Multer)
```

---

## 🗂️ Folder Structure

```
│
├── controllers/        → Route logic
├── models/             → MongoDB schemas
├── routes/             → API routing
├── middleware/         → Auth & error handling
├── uploads/            → Image storage (Multer)
├── utils/              → Helper functions
├── server.js           → App entry point
└── .env                → Environment variables
```

---

## ⚙️ Setup & Installation

```bash
git clone https://github.com/your-username/ecommerce-backend.git
cd ecommerce-backend
npm install
```

---

## 🧪 .env File Configuration

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

---

## ▶️ Running the Server

```bash
npm run dev
```

---

## 📬 Postman Collection

You can test all endpoints using [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/).

---

## 📝 License

Distributed under the MIT License.

---
