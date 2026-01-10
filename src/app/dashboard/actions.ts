"use server";

import { signOut } from "@/auth";
import { redirect } from "next/navigation";

export async function logoutAction() {
    // Clear NextAuth session (JWT)
    await signOut({ redirect: false });
    // Manually redirect after logout
    redirect("/login");
}
