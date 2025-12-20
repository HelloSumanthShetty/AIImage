import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

import { NextResponse } from "next/server";

const { POST: authPOST, GET: authGET } = toNextJsHandler(auth);

export async function POST(req) {
    try {
        return await authPOST(req);
    } catch (error) {
        console.error("Auth POST Error:", error);
        return new NextResponse("Internal Auth Error", { status: 500 });
    }
}

export async function GET(req) {
    try {
        return await authGET(req);
    } catch (error) {
        console.error("Auth GET Error:", error);
        return new NextResponse("Internal Auth Error", { status: 500 });
    }
}
