import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                // Validate user (this runs on server)
                const { email, password } = credentials ?? {};

                // Example: call your Express API
                const res = await fetch(`${process.env.API_URL}/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                });

                const data = await res.json();

                if (res.ok && data.token) {
                    // return an object that can be stored in session or JWT
                    return { email, token: data.token };
                }

                // Return null for invalid credentials
                return null;
            }
        })
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized: async ({ auth }) => {
            // Logged in users are authenticated, otherwise redirect to login page
            return !!auth;
        },
        async jwt({ token, user }) {
            // Add token from backend into JWT
            if (user?.token) {
                token.accessToken = user.token;
            }
            return token;
        },

        async session({ session, token }) {
            // Add accessToken to session
            session.user = session.user || {};
            session.user.token = token.accessToken;
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
    trustHost: true,
});
