import { NextResponse,NextRequest } from "next/server";

function middleware(req: NextRequest) {
    const token = req.cookies.get('token');

    if (!token) {
        return NextResponse.redirect(new URL('/login',req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: "/dashboard/:path*",
};

export default middleware;