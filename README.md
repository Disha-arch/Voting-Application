# CastVote API 🗳️

A secure RESTful backend for a voting system built with **Node.js**, **Express**, and **MongoDB**. Users can authenticate and cast votes for candidates, with results stored persistently in the database.

---

## 📌 Features

- User registration and login with secure password hashing
- JWT-based authentication to protect voting routes
- Cast votes for candidates (one vote per user enforced)
- Retrieve live vote counts for all candidates
- Modular route and model structure for clean, scalable code

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Authentication | JWT (jsonwebtoken) |
| Password Hashing | bcrypt |
| Environment Config | dotenv |

---

## 📁 Project Structure

```
Voting-Application/
├── model/
│   ├── user.js         # User schema (name, age, mobile, email, password, role, isVoted)
│   └── candidate.js    # Candidate schema (name, party, votes)
├── routes/
│   ├── authRoutes.js   # Signup, Login endpoints
│   └── candidateRoutes.js  # Vote & candidate result endpoints
├── db.js               # MongoDB connection
├── jwt.js              # JWT token generation utility
├── server.js           # Entry point
├── .env                # Environment variables (not committed)
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Disha-arch/Voting-Application.git
   cd Voting-Application
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory
   ```env
   PORT=3000
   MONGODB_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Start the server**
   ```bash
   npm start
   ```
   Server runs at `http://localhost:3000`

---

## 🔑 API Endpoints

### Auth Routes — `/auth`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/auth/signup` | Register a new user | ❌ |
| POST | `/auth/login` | Login and receive JWT token | ❌ |

#### Signup Request Body
```json
{
  "name": "John Doe",
  "age": 25,
  "mobile": "9876543210",
  "email": "john@example.com",
  "password": "yourpassword",
  "address": "123 Main St",
  "aadharCardNumber": 123456789012
}
```

#### Login Request Body
```json
{
  "aadharCardNumber": 123456789012,
  "password": "yourpassword"
}
```

#### Login Response
```json
{
  "token": "your.jwt.token"
}
```

---

### Candidate Routes — `/candidate`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/candidate` | Get all candidates | ✅ |
| POST | `/candidate` | Add a candidate (admin only) | ✅ |
| PUT | `/candidate/:id` | Update a candidate (admin only) | ✅ |
| DELETE | `/candidate/:id` | Delete a candidate (admin only) | ✅ |
| POST | `/candidate/vote/:id` | Cast a vote for a candidate | ✅ |
| GET | `/candidate/vote/count` | Get vote counts for all candidates | ✅ |

> **Note:** Admin users cannot cast votes. Each user can vote only once.

---

## 🔒 Authentication

Protected routes require a Bearer token in the `Authorization` header:

```
Authorization: Bearer <your_jwt_token>
```

---

## 📦 Dependencies

```json
{
  "express": "^5.2.1",
  "mongoose": "^9.3.1",
  "bcrypt": "^6.0.0",
  "jsonwebtoken": "^9.0.3",
  "dotenv": "^16.3.1",
  "body-parser": "^1.20.2",
  "nodemon": "^3.1.14"
}
```

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 👩‍💻 Author

**Disha** — [GitHub](https://github.com/Disha-arch)
