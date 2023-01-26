import { SvelteKitAuth  } from "@auth/sveltekit";
import Google from '@auth/core/providers/google'
import { GOOGLE_CLIENT_SECRET, GOOGLE_CLIENT_ID } from "$env/static/private";
import { start_mongo } from "$db/mongo";

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
})