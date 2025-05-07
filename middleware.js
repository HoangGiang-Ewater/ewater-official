import { i18nRouter } from "next-i18n-router";
import i18nConfig from "./i18nConfig";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(request) {
  // Extract language first
  const lang = request.nextUrl.pathname.split("/")[1] || "en";

  // Handle i18n routing
  const i18nResponse = i18nRouter(request, i18nConfig);
  if (i18nResponse) return i18nResponse;

  // Handle Supabase auth
  const response = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res: response });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isAdminRoute = request.nextUrl.pathname.includes("/admin");

  // Handle admin route protection
  if (isAdminRoute) {
    if (!user) {
      return NextResponse.redirect(
        new URL(`/${lang}/admin/login`, request.url)
      );
    }

    try {
      // Check if table exists first
      const { data: tableExists } = await supabase.rpc("table_exists", {
        table_name: "profiles",
      });

      if (!tableExists) {
        console.error("Profiles table missing");
        return NextResponse.redirect(new URL(`/${lang}/error`, request.url));
      }

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("is_super_admin")
        .eq("id", user.id)
        .maybeSingle();

      if (error || !profile?.is_super_admin) {
        console.error(
          "Admin check failed:",
          error?.message || "Not a super admin"
        );
        return NextResponse.redirect(new URL(`/${lang}`, request.url));
      }
    } catch (err) {
      console.error("Database error:", err);
      return NextResponse.redirect(new URL(`/${lang}/error`, request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico).*)"],
};
