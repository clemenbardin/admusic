import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    const url = req.nextUrl;
    const userRole = req.nextauth.token?.user?.role

    // Redirection si pas connecté
    if (!req.nextauth.token) {
      return NextResponse.redirect(new URL("/login", url));
    }

    // Bloquer l'accès aux pages admin si l'utilisateur n'est pas admin
    if (url.pathname.startsWith("/dashboard/admin") && userRole !== "Admin") {
      return NextResponse.redirect(new URL("/dashboard", url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    }
  }
);

export const config = {
  matcher: ["/dashboard/:path*"]
};
