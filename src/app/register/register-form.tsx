"use client";

import { useActionState } from "react";
import { registerAction, RegisterState } from "./actions";

export default function RegisterForm() {
    const [state, formAction, pending] = useActionState<RegisterState>(
        registerAction as any,
        {}
    );

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                action={formAction}
                className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md space-y-4"
            >
                <h1 className="text-2xl font-semibold text-center">Create account</h1>

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />

                {state.error && (
                    <p className="text-red-500 text-sm">{state.error}</p>
                )}

                <button
                    disabled={pending}
                    className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 disabled:opacity-50 transition"
                >
                    {pending ? "Creating account..." : "Register"}
                </button>

                <p className="text-sm text-center text-gray-600">
                    Already have an account?{" "}
                    <a
                        href="/login"
                        className="text-black font-medium hover:underline"
                    >
                        Login
                    </a>
                </p>
            </form>
        </main>
    );
}
