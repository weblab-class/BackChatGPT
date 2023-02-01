import type { PageServerLoad } from "./$types";
import db from '$db/mongo'
import { error } from "@sveltejs/kit";

export const load : PageServerLoad = (async ({ params }) => {
    const query = { url: params.url }
    const wiki = await db.collection('wikiEntries').findOne(query)

    if (wiki) {
        const wikiData = {
            title: wiki.title,
            url: wiki.url,
            body: wiki.body
        }

        return {
            wiki: wikiData
        }
    } else {
        throw error(404, 'Wiki Not Found')
    }

    
})