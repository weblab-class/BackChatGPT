import { SvelteKitAuth  } from "@auth/sveltekit";
import Google from '@auth/core/providers/google'
import { GOOGLE_CLIENT_SECRET, GOOGLE_CLIENT_ID } from "$env/static/private";
import { start_mongo } from "$db/mongo";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

start_mongo().then(() => {
    console.log('Mongo Started')
}).catch((e) => {
    console.log(e)
})

export const handle = SvelteKitAuth({
    providers: [
        // @ts-ignore
        Google({ clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET})
    ],
    // @ts-ignore
    adapter: MongoDBAdapter(start_mongo(), { databaseName: 'BackChatGPT' }),
    callbacks: {
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.sub
            }

            return session
        },
        async jwt({ user, token }) {
            if (user) {
              token.sub = user.id;
            }
            return token;
        },
    },
    session: {
        strategy: 'jwt',
    },
})