import RegisterForm from "./register-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
    const session = await auth();

    if (session?.user?.token) {
        redirect("/dashboard");
    }
    return <RegisterForm />;
}