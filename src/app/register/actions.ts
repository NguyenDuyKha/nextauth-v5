"use server";

import { redirect } from "next/navigation";

export type RegisterState = {
    error?: string;
};

export async function registerAction(
    prevState: RegisterState,
    formData: FormData
): Promise<RegisterState> {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await fetch(`${process.env.API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        const data = await res.json();
        return { error: data.error ?? "Registration failed" };
    }

    redirect("/login");
}
