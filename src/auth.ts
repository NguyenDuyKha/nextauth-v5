import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

// Central NextAuth configuration
// Exports helpers used across the app (auth, signIn, signOut, handlers)
export const { handlers, signIn, signOut, auth } = NextAuth({
    // Use Credentials provider (email + password)
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            // Called when user submits the login form
            authorize: async (credentials) => {
                // Reject if missing credentials
                if (!credentials?.email || !credentials.password) {
                    return null;
                }
                // Forward credentials to backend API
                const res = await fetch(`${process.env.API_URL}/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: credentials.email,
                        password: credentials.password,
                    }),
                });
                // Invalid credentials or server error
                if (!res.ok) return null;
                // Expect a JWT token from backend
                const data: { token?: string } = await res.json();
                if (!data.token) return null;
                // Returned object becomes `user` in callbacks
                return {
                    email: credentials.email as string,
                    token: data.token,
                };
            },
        }),
    ],

    pages: {
        signIn: "/login",
    },

    callbacks: {
        // Used by middleware to determine if request is authorized
        authorized: async ({ auth }) => {
            return !!auth?.user?.token;
        },
        // Runs whenever a JWT is created/updated
        async jwt({ token, user }) {
            // Persist backend access token in JWT
            if (user?.token) {
                token.accessToken = user.token;
            }
            return token;
        },
        // Runs when session is checked (auth())
        async session({ session, token }) {
            session.user.token = token.accessToken;
            return session;
        },
    },
    // Use stateless JWT sessions
    session: {
        strategy: "jwt",
    },
    // Required when using middleware + app router
    trustHost: true,
});
