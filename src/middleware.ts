import { NextRequest, NextResponse } from "next/server";
export function middleware(req: NextRequest) {
  const referer = req.headers.get("referer") || "";
  const origin = referer ? new URL(referer).origin : "https://example.com";

  // Tambahkan origin ke header request untuk digunakan di server-side
  req.headers.set("x-origin", origin);
  // console.log("middleware", origin);

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*" // Middleware akan berjalan di semua route
};
