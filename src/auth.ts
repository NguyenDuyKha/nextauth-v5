import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },

            authorize: async (credentials) => {
                if (!credentials?.email || !credentials.password) {
                    return null;
                }

                const res = await fetch(`${process.env.API_URL}/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: credentials.email,
                        password: credentials.password,
                    }),
                });

                if (!res.ok) return null;

                const data: { token?: string } = await res.json();

                if (!data.token) return null;

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
        async jwt({ token, user }) {
            if (user?.token) {
                token.accessToken = user.token;
            }
            return token;
        },

        async session({ session, token }) {
            session.user.token = token.accessToken;
            return session;
        },
    },

    session: {
        strategy: "jwt",
    },

    trustHost: true,
});
