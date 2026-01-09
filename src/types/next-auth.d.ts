import { DefaultSession } from "next-auth";
import "next-auth/jwt";

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

declare module "next-auth/jwt" {
    interface JWT {
        accessToken: string;
    }
}
