import type { NextRequest } from "next/server";
import { ROUTES } from "./app/shared/routes/routes";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("jwt")?.value;

  /** if user is logged in, moves to login page then redirect user to home page */
  if (currentUser && request.nextUrl.pathname.includes(ROUTES.LOGIN)) {
    return Response.redirect(new URL("/", request.url));
  }

  /** if user is logged out, moves to any page other than login/signup page then redirect user to login page */
  if (
    !currentUser &&
    !request.nextUrl.pathname.includes(ROUTES.LOGIN) &&
    !request.nextUrl.pathname.includes(ROUTES.SIGNUP)
  ) {
    return Response.redirect(new URL(ROUTES.LOGIN, request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
