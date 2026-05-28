# 💰 MERN Ledger Backend

A secure backend API for a Ledger/Banking application built using Node.js, Express.js, MongoDB, and JWT Authentication.

---

## 🚀 Features

- User Authentication (Signup/Login)
- JWT Token Authentication
- Account Management
- Balance Tracking
- Money Transfer Between Users
- Transaction History
- MongoDB Transactions & Sessions
- Secure Password Hashing using bcrypt
- RESTful APIs
- Error Handling Middleware
- MVC Architecture

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- dotenv

---

## 📁 Folder Structure

```bash
project/
│
├── controllers/
├── models/
├── routes/
├── middleware/
├── config/
├── services/
├── utils/
├── app.js
├── server.js
└── package.json
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/your-username/ledger-backend.git
```

### Navigate into the project

```bash
cd ledger-backend
```

### Install dependencies

```bash
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file in root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

---

## ▶️ Run the Server

### Development mode

```bash
npm run dev
```

### Production mode

```bash
npm start
```

---

## 📌 API Endpoints

### Auth Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/signup | Register User |
| POST | /api/auth/login | Login User |

---

### Account Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/account/balance | Get User Balance |
| POST | /api/account/transfer | Transfer Money |

---

## 🔐 Authentication

Protected routes require JWT token:

```bash
Authorization: Bearer <token>
```

---

## 🧠 Learning Concepts Used

- MVC Architecture
- Authentication & Authorization
- MongoDB Transactions
- Express Middleware
- REST APIs
- Session Handling

---

## 📷 Sample Response

```json
{
  "success": true,
  "message": "Transfer successful"
}
```

---

## 🚧 Future Improvements

- Email Verification
- OTP Authentication
- Admin Dashboard
- Transaction Analytics
- Rate Limiting
- Docker Deployment

---

## 👨‍💻 Author

Harsh Singh

---

## ⭐ Support

If you liked this project, give it a ⭐ on GitHub.
