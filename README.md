# SHOPEZ — E-commerce Application (MERN Stack)

ShopEZ is a full-stack e-commerce app: product catalog, cart, checkout,
user profile with order history, and an admin dashboard for managing
products, users, orders, and the homepage banner.

## Tech Stack
- **Frontend:** React (Vite), React Router, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Auth:** JWT + bcrypt password hashing

<img width="1024" height="559" alt="image" src="https://github.com/user-attachments/assets/09fc8a04-b7f9-4239-ac08-d74f447d22ad" />

## Folder Structure
```
shopez/
  client/   → React frontend (Vite)
  server/   → Express backend + MongoDB models
```

---

## Step 1: Set Up the Backend (Express Server)

```bash
cd server
npm install
```

Create a `.env` file inside `server/` (copy `.env.example`) and fill in:

```
MONGO_URI=mongodb://localhost:27017/shopez
JWT_SECRET=replace_this_with_a_long_random_secret_string
PORT=8000
```

- If using **MongoDB Compass / local MongoDB**, make sure `mongod` is running first.
- If using **MongoDB Atlas**, paste your Atlas connection string instead.

Start the backend:
```bash
npm run dev
```
Server runs on: **http://localhost:8000**

---

## Step 2: Set Up the Frontend (React App)

Open a new terminal:
```bash
cd client
npm install
npm run dev
```
App runs on: **http://localhost:5173**

---

## Step 3: Create Your First Admin Account
1. Go to `http://localhost:5173/register`
2. Fill the form and set **User type = Admin**
3. Log in — you'll see an "Admin" link in the navbar leading to `/admin`
4. From the Admin Dashboard, click **Add now** to add your first products
   (regular Customer accounts can then browse/buy them)

---

## Features Implemented
- User registration & login (JWT, hashed passwords)
- Product catalog with category/gender filters and sorting
- Product detail page with size + quantity selection
- Add to cart / remove from cart, live price breakdown
- Checkout flow (address + payment method) → creates orders
- User profile page with order history + cancel order
- Admin dashboard: stats, banner update, add product, view all users/orders
- Route-level protection (JWT middleware + Admin-only routes)

## API Overview
| Method | Route                     | Access        |
|--------|----------------------------|---------------|
| POST   | /api/auth/register          | Public        |
| POST   | /api/auth/login              | Public        |
| GET    | /api/auth/profile            | Logged in     |
| GET    | /api/products                 | Public        |
| GET    | /api/products/:id             | Public        |
| POST   | /api/products                 | Admin         |
| PUT    | /api/products/:id              | Admin         |
| DELETE | /api/products/:id               | Admin         |
| GET    | /api/cart                       | Logged in     |
| POST   | /api/cart                        | Logged in     |
| DELETE | /api/cart/:id                     | Logged in     |
| POST   | /api/orders                        | Logged in     |
| GET    | /api/orders/my                      | Logged in     |
| PUT    | /api/orders/:id/cancel                | Logged in     |
| GET    | /api/orders                            | Admin         |
| GET    | /api/admin/dashboard                    | Admin         |
| GET    | /api/admin/users                         | Admin         |
| GET    | /api/admin/settings                       | Public        |
| PUT    | /api/admin/settings                        | Admin         |

## Notes
- Product images use URLs (paste any image link when adding a product via
  the admin panel).
- Both servers were verified to build/start cleanly with no MongoDB running
  in this environment; connect a real Mongo instance to see live data.
<img width="638" height="846" alt="image" src="https://github.com/user-attachments/assets/228fb178-cdaf-4e3e-9f5e-05be06954de4" />  <img width="1545" height="917" alt="WhatsApp Image 2026-07-14 at 9 54 58 PM" src="https://github.com/user-attachments/assets/4b7f2c2e-29fc-40bd-874a-c2cd59c54544" />


