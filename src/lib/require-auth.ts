import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function requireAuth() {
    const session = await auth();

    if (!session?.user?.token) {
        redirect("/login");
    }

    return session;
}
