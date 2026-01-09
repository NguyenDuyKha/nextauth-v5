"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export type LoginState = {
    error?: string;
};

export async function loginAction(
    prevState: LoginState,
    formData: FormData
): Promise<LoginState> {
    try {
        // IMPORTANT: pass FormData directly
        // await signIn("credentials", formData);
        await signIn("credentials", {
            ...Object.fromEntries(formData),
            redirect: false, // ✅ FIX
        });

        redirect("/dashboard");
    } catch (error) {
        if (error instanceof AuthError) {
            if (error.type === "CredentialsSignin") {
                return { error: "Invalid email or password" };
            }
        }
        throw error;
    }
}
