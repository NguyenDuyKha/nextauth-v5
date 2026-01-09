import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function requireAuth() {
    const session = await auth();

    /**
     * Do we need to check `if (!session?.user?.token)` in the page?
     *
     * ❌ NOT strictly required when:
     * - The route is already protected by middleware
     * - The `authorized` callback guarantees a valid session
     *
     * ✅ HOWEVER, it is still RECOMMENDED to keep this check
     * inside a shared helper (best practice), because:
     *
     * - Future RBAC (role-based access control)
     * - Audit logging (tracking unauthorized access attempts)
     * - Refresh token handling / rotation
     * - Defensive programming against edge cases
     *
     * Middleware and `authorized` protect the route,
     * but the page (or helper) is responsible for business correctness.
    */
    if (!session?.user?.token) {
        redirect("/login");
    }

    return session;
}
