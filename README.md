# Next.js Authentication (NextAuth v5 + Credentials + JWT)

This project demonstrates a **full authentication flow** using:

- **Next.js App Router**
- **NextAuth v5**
- **Credentials Provider**
- **JWT session strategy**
- **External API (Express / Backend)**
- **Type-safe token handling (TypeScript)**
- **Tailwind CSS UI**

---

## ✨ Features

- ✅ Email & password authentication
- ✅ JWT-based session (no database required)
- ✅ Token stored securely in NextAuth JWT
- ✅ Protected routes using middleware
- ✅ Redirect logged-in users away from `/login` & `/register`
- ✅ Server Actions for login, logout, register
- ✅ Fully typed `session.user.token`
- ✅ Tailwind CSS UI

---

## 🧱 Project Structure

```

src/
├── app/
│   ├── api/auth/[...nextauth]/route.ts
│   ├── dashboard/
│   │   ├── actions.ts
│   │   └── page.tsx
│   ├── login/
│   │   ├── actions.ts
│   │   ├── login-form.tsx
│   │   └── page.tsx
│   ├── register/
│   │   ├── actions.ts
│   │   ├── register-form.tsx
│   │   └── page.tsx
│   └── globals.css
├── auth.ts
├── middleware.ts
└── types/
└── next-auth.d.ts

```

---

## 🔐 Authentication Flow

```

Login Form
    ↓
Server Action (loginAction)
    ↓
NextAuth signIn("credentials")
    ↓
authorize() → call backend API
    ↓
User.token
    ↓
jwt() callback → JWT.accessToken
    ↓
session() callback → session.user.token
    ↓
Protected Routes / API calls

```

---

## 🔑 Token Handling (Type-Safe)

### Token lifecycle
- Backend returns `token`
- Stored in **JWT cookie**
- Exposed as `session.user.token`

### Type augmentation
Located in:

```

src/types/next-auth.d.ts

````

This ensures:

```ts
session.user.token // ✅ string
user.token         // ✅ string
token.accessToken  // ✅ string
````

No `any`, no optional chaining hacks.

---

## 🛡️ Protected Routes

### Middleware

```
src/middleware.ts
```

```ts
export { auth as middleware } from "@/auth";

export const config = {
  matcher: ["/dashboard/:path*"],
};
```

Only authenticated users can access `/dashboard`.

---

## 📄 Pages Overview

### `/login`

* Server-side redirect if already logged in
* Uses Server Action + Credentials provider
* Tailwind styled UI

### `/register`

* Registers user via backend API
* Redirects to `/login`
* Prevents access when already logged in

### `/dashboard`

* Protected route
* Fetches user data from backend using Bearer token
* Logout via Server Action

---

## 🚪 Logout

Handled via **Server Action**:

```ts
await signOut({ redirect: false });
redirect("/login");
```

This clears the session and JWT cookie securely.

---

## 🎨 Styling

* Tailwind CSS
* Responsive
* Accessible focus states
* Shared UI patterns for Login & Register

---

## ⚙️ Environment Variables

Create a `.env.local` file:

```env
NEXTAUTH_SECRET=your-secret-key
API_URL=http://localhost:4000
```

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open:
👉 [http://localhost:3000/login](http://localhost:3000/login)

---

## 🧪 Example API Requirements

Your backend must expose:

### `POST /login`

```json
{
  "email": "user@example.com",
  "password": "password"
}
```

Response:

```json
{
  "token": "jwt-or-access-token"
}
```

### `GET /me`

```http
Authorization: Bearer <token>
```

---

## 🧠 Notes & Best Practices

* Uses **JWT strategy** (no database adapter needed)
* Secure server-only token handling
* App Router–friendly architecture
* Easily extensible to:

  * Refresh tokens
  * Roles / permissions
  * OAuth providers
