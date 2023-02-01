import type { RequestHandler } from './$types';
import db from '$db/mongo'

export const POST: RequestHandler = (async ({ request }) => {
    const {title, url, body} = await request.json()

    await db.collection('wikiEntries').insertOne({
        title: title,
        url: url,
        body: body
    })

    let responseJSON = JSON.stringify('completed')

    return new Response(responseJSON)
}) 