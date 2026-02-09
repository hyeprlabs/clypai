import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { comingSoonFlag, maintenanceFlag } from "@/lib/flags";

// Auth Pages
const authPages = [
  "/login",
  "/signup",
]

// Dashboard Pages
const dashboardPages = [
  "/overview",
  "/brand-kits",
  "/connections",
  "/create",
  "/metrics",
  "/profile",
  "/projects",
  "/settings",
  "/workers",
];

export async function proxy(request: NextRequest) {

  const pathname = request.nextUrl.pathname;
  const session = await auth.api.getSession({headers: await headers()});

  if (!process.env.EDGE_CONFIG) {
    console.warn("EDGE_CONFIG .env variable is not set.");
    return NextResponse.next();
  }

  const isMaintenanceMode = await maintenanceFlag();
  const isComingSoonMode = await comingSoonFlag();

  const isAdmin = session?.user?.role === "admin";
  const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === "production";

  if (!isAdmin && isProduction) {
    if (isMaintenanceMode && pathname !== "/maintenance") {
      request.nextUrl.pathname = "/maintenance";
      console.log("Mode Active: Maintenance!");
      return NextResponse.rewrite(request.nextUrl);
    }
    
    if (isComingSoonMode && pathname !== "/coming-soon") {
      request.nextUrl.pathname = "/coming-soon";
      console.log("Mode Active: Coming Soon!");
      return NextResponse.rewrite(request.nextUrl);
    }

    if (!isMaintenanceMode && pathname === "/maintenance") {
      console.log("Redirecting from /maintenance to /!");
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (!isComingSoonMode && pathname === "/coming-soon") {
      console.log("Redirecting from /coming-soon to /!");
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  const isAuthPage = authPages.some(page => pathname.startsWith(page));

  if (session && isAuthPage) {
    console.log("Redirecting to /overview!");
    return NextResponse.redirect(new URL("/overview", request.url));
  }

  const isDashboardPage = dashboardPages.some(page => pathname.startsWith(page));

  if (!session && isDashboardPage) {
    console.log("Redirecting to /login!");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt
     * - Static assets (images, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};