# Express JWT Authentication API

This is a simple **JWT-based authentication API** built with **Express.js**. It includes the essential routes for user registration, login, and retrieving the current logged-in user using JWT access tokens.

---

## 🚀 Features

- User Registration — `POST /register`
- User Login — `POST /login`
- Get Profile — `GET /me` (protected by JWT)
- Password hashing with **bcryptjs**
- JWT authentication with **jsonwebtoken**

---

## 🛠️ Requirements

Before you begin, make sure you have the following installed:

* Node.js (v14+)
* npm

---

## 📦 Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd <your-repo-folder>
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file:

```env
JWT_SECRET=your_super_secret_jwt_key
PORT=4000
```

You **must set `JWT_SECRET`** — this secret is used to sign and verify JWTs.

---

## 🚀 Start the Server

```bash
node app.js
```

The server should now be running at:

```
http://localhost:4000
```

---

## 📡 API Endpoints

### 🧾 Register

**POST /register**

Creates a new user and returns a signed JWT token.

#### 📥 Request

```http
POST /register
Content-Type: application/json
```

Body:

```json
{
  "email": "you@example.com",
  "password": "your_password"
}
```

#### 📤 Response

```json
{
  "token": "<JWT_TOKEN>"
}
```

---

### 🔐 Login

**POST /login**

Logs in an existing user and returns a JWT token.

#### 📥 Request

```http
POST /login
Content-Type: application/json
```

Body:

```json
{
  "email": "you@example.com",
  "password": "your_password"
}
```

#### 📤 Response

```json
{
  "token": "<JWT_TOKEN>"
}
```

---

### 👤 Get Current User

**GET /me**

Protected endpoint. Requires an **Authorization header** with a Bearer token.

#### 📥 Request

```http
GET /me
Authorization: Bearer <JWT_TOKEN>
```

#### 📤 Response

```json
{
  "user": {
    "id": 1,
    "email": "you@example.com",
    "iat": 1234567890,
    "exp": 1234567890
  }
}
```

---

## 🧪 Example cURL Requests

Register a user:

```bash
curl --location 'http://localhost:4000/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "ndkha@example.com",
    "password": "123456"
}'
```

Get current user:

```bash
curl --location 'http://localhost:4000/me' \
--header 'Authorization: Bearer <JWT_TOKEN>'
```

---

## 🧠 How It Works

* Passwords are hashed using **bcryptjs** before saving.
* A JWT token is issued when a user registers or logs in.
* The `/me` route uses middleware to verify the **Bearer token** from the Authorization header and returns user info if valid.
* Tokens expire after a set duration and must be refreshed (optionally implemented later).
