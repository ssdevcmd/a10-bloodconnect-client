import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin, jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";


const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db(process.env.AUTH_DB_NAME);

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
    },

    database: mongodbAdapter(db, {
        client,
    }),
    user: {
        additionalFields: {
            bloodGroup: {
                type: "string",
                required: true,
            },
            district: {
                type: "string",
                required: true,
            },
            upazila: {
                type: "string",
                required: true,
            },
            status: {
                type: "string",
                default: "active", // Default status as requested
            },
        },
    },

    session: {
        cookieCache: {
            enabled: true,
            strategy: 'jwt',
            maxAge: 7 * 24 * 60 * 60
        }
},

    plugins: [
        admin({
            // 1. Tell the plugin what roles your application supports
            roles: ["admin", "donor", "volunteer"],
            // 2. Override the default "user" role to match your design
            defaultRole: "donor",
        }),

        jwt()
    ],
});