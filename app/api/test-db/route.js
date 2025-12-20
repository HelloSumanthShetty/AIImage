import { NextResponse } from 'next/server';
import { Pool } from 'pg';

export const dynamic = 'force-dynamic';

export async function GET() {
    const dbUrl = process.env.DATABASE_URL;

    // 1. Check Env Var existence
    if (!dbUrl) {
        return NextResponse.json({
            status: 'error',
            message: 'DATABASE_URL is missing in environment variables',
            env_check: 'FAIL'
        }, { status: 500 });
    }

    try {
        // 2. Try Connection
        const pool = new Pool({
            connectionString: dbUrl,
            connectionTimeoutMillis: 5000,
        });

        const client = await pool.connect();

        // 3. Try Simple Query
        const nowRes = await client.query('SELECT NOW()');

        // 4. Try Table Check (Check if 'user' table exists)
        let tableCheck = 'skipped';
        try {
            await client.query('SELECT count(*) FROM "user"');
            tableCheck = 'success - user table exists';
        } catch (err) {
            tableCheck = `failed - ${err.message}`;
        }

        client.release();
        await pool.end();

        return NextResponse.json({
            status: 'ok',
            message: 'Connection Successful',
            timestamp: nowRes.rows[0].now,
            table_check: tableCheck,
            env_check: 'PASS'
        });

    } catch (error) {
        return NextResponse.json({
            status: 'error',
            message: error.message,
            stack: error.stack,
            env_check: 'PASS (but connection failed)'
        }, { status: 500 });
    }
}
