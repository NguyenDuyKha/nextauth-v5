export { auth as middleware } from "@/auth";

console.log("hello from middleware");

export const config = {
  // matcher: ["/((?!api|/|_next/static|_next/image|favicon.ico).*)"],
  matcher: ["/dashboard/:path*"],
};
