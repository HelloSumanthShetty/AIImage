import { betterAuth } from "better-auth";
import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export const auth = betterAuth({
    database: pool,
    emailAndPassword: {
        enabled: true,
    },
    user: {
        additionalFields: {
            credits: {
                type: "number",
                defaultValue: 2,
            },
        },
    },
    databaseHooks: {
        user: {
            create: {
                before: async (user) => {
                    return {
                        ...user,
                        credits: 2,
                    };
                },
            },
        },
    },
    // Social providers if needed
    // socialProviders: {
    //   google: {
    //     clientId: process.env.GOOGLE_CLIENT_ID,
    //     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    //   },
    // },
});
