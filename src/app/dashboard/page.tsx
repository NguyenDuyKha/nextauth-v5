import { auth } from "@/auth";
import { redirect } from "next/navigation";

type MeResponse = {
    user: {
        id: number;
        email: string;
    };
};

export default async function DashboardPage() {
    const session = await auth();

    if (!session?.user?.token) {
        redirect("/login");
    }

    const res = await fetch(`${process.env.API_URL}/me`, {
        headers: {
            Authorization: `Bearer ${session.user.token}`,
        },
        cache: "no-store",
    });

    if (!res.ok) {
        redirect("/login");
    }

    const data: MeResponse = await res.json();

    return (
        <main>
            <h1>Dashboard</h1>
            <p>Welcome, {data.user.email}</p>
        </main>
    );
}
