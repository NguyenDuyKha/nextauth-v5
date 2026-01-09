import NextAuth, { DefaultSession } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
    /**
     * Returned by `auth()` and `useSession()`
     */
    interface Session {
        user: {
            token: string;
        } & DefaultSession["user"];
    }

    /**
     * Returned by `authorize()` and passed to `jwt()`
     */
    interface User {
        token: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken: string;
    }
}
