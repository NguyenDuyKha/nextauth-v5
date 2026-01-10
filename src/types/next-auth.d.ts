import { DefaultSession } from "next-auth";
import "next-auth/jwt";

// Extend NextAuth session type
declare module "next-auth" {
    interface Session {
        user: {
            token: string;
        } & DefaultSession["user"];
    }

    interface User {
        token: string;
    }
}

// Extend JWT payload type
declare module "next-auth/jwt" {
    interface JWT {
        accessToken: string;
    }
}
