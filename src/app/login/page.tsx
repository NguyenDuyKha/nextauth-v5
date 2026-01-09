"use client";

import { useActionState } from "react";
import { loginAction, LoginState } from "./actions";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState<LoginState>(
    loginAction as any,
    {}
  );

  return (
    <main>
      <h1>Login</h1>

      <form action={formAction}>
        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required />

        {state.error && <p style={{ color: "red" }}>{state.error}</p>}

        <button disabled={pending}>
          {pending ? "Signing in..." : "Login"}
        </button>
      </form>
    </main>
  );
}
