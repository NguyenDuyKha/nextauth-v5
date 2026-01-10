import { auth } from "@/auth";
import { redirect } from "next/navigation";
import LoginForm from "./login-form";

// Login page rendered as a Server Component
export default async function LoginPage() {
    // Retrieve the current session (if any)
    // This runs on the server before the page is rendered
    const session = await auth();
    // If the user is already authenticated,
    // redirect them away from the login page
    if (session?.user?.token) {
        redirect("/dashboard");
    }
    // Otherwise, render the login form
    return <LoginForm />;
}
