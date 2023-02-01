import type { LayoutServerData } from "./$types";
import db from '$db/mongo'

export const load: LayoutServerData = async ({}) => {
    let wikiEntries = await db.collection('wikiEntries').find().toArray()

    let wikis = wikiEntries.map((entry) => {
        return {
            title: entry.title,
            url: entry.url
        }
    })


    return {
        wikiEntries: wikis 
    }
}