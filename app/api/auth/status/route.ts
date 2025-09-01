import { NextResponse } from "next/server";
import { getAdminSession } from "../../../lib/auth";

export async function GET() {
    try {
        const session = await getAdminSession();
        
        return NextResponse.json({
            isAdmin: session?.isAdmin === true,
            username: session?.username || null
        });
        
    } catch (error) {
        console.error("Auth status error:", error);
        return NextResponse.json({
            isAdmin: false,
            username: null
        });
    }
}
