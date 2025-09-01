import { NextRequest, NextResponse } from "next/server";
import { validateCredentials, generateToken } from "../../lib/auth";
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
    try {
        const { username, password } = await request.json();
        
        if (!username || !password) {
            return NextResponse.json(
                { error: "Username and password are required" },
                { status: 400 }
            );
        }
        
        if (!validateCredentials(username, password)) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }
        
        // Generate JWT token
        const token = generateToken({ username, isAdmin: true });
        
        // Set HTTP-only cookie
        const cookieStore = await cookies();
        cookieStore.set('admin-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60, // 7 days
            path: '/'
        });
        
        return NextResponse.json({
            success: true,
            message: "Login successful"
        });
        
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function DELETE() {
    try {
        // Clear the admin token cookie (logout)
        const cookieStore = await cookies();
        cookieStore.delete('admin-token');
        
        return NextResponse.json({
            success: true,
            message: "Logout successful"
        });
        
    } catch (error) {
        console.error("Logout error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
