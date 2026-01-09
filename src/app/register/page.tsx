"use client";

import { useActionState } from "react";
import { registerAction, RegisterState } from "./actions";

export default function RegisterPage() {
    const [state, formAction, pending] = useActionState<RegisterState>(
        registerAction as any,
        {}
    );

    return (
        <main>
            <h1>Register</h1>

            <form action={formAction}>
                <input name="email" type="email" placeholder="Email" required />
                <input name="password" type="password" placeholder="Password" required />

                {state.error && <p style={{ color: "red" }}>{state.error}</p>}

                <button disabled={pending}>
                    {pending ? "Creating..." : "Register"}
                </button>
            </form>
        </main>
    );
}
