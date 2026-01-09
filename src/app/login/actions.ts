"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export type LoginState = {
    error?: string;
};

export async function loginAction(
    _: LoginState,
    formData: FormData
): Promise<LoginState> {
    try {
        const email = formData.get("email");
        const password = formData.get("password");

        if (!email || !password) {
            return { error: "Email and password are required" };
        }

        await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        redirect("/dashboard");
    } catch (error) {
        if (error instanceof AuthError) {
            return { error: "Invalid email or password" };
        }
        throw error;
    }
}
