import { requireAuth } from "@/lib/require-auth";
import { logoutAction } from "./actions";
import { redirect } from "next/navigation";

// Expected response shape from /me endpoint
type MeResponse = {
    user: {
        id: number;
        email: string;
    };
};

export default async function DashboardPage() {
    // Ensure user is authenticated (server-side)
    const session = await requireAuth();
    // Fetch current user info from backend
    const res = await fetch(`${process.env.API_URL}/me`, {
        headers: {
            Authorization: `Bearer ${session.user.token}`,
        },
        cache: "no-store",
    });
    // Token invalid or expired
    if (!res.ok) {
        redirect("/login");
    }

    const data: MeResponse = await res.json();

    return (
        <main className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4">
                <h1 className="text-2xl font-semibold">Dashboard</h1>

                <p className="text-gray-600">
                    Welcome, <span className="font-medium">{data.user.email}</span>
                </p>

                <form action={logoutAction}>
                    <button className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
                        Logout
                    </button>
                </form>
            </div>
        </main>
    );
}
