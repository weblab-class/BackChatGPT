import type { RequestHandler } from './$types';
import db from '$db/mongo'
import { error } from '@sveltejs/kit';
import type { UserData } from '$lib/userStore';
import { ObjectId } from 'mongodb';

export const GET: RequestHandler = (async ({ params }) => {
    let query = { _id: new ObjectId(params.id) }
    // console.log("Getting")
    let user = await db.collection('users').findOne(query)

    if (user) {
        const userData: UserData = {
            user: {
                name: user.name,
                email: user.email,
                id: params.id
            },
            loginMethod: user.loginMethod,
            gamesPlayed: user.gamesPlayed,
            completedGames: user.completedGames,
            fastestCompletion: user.fastestCompletion
        }

        return new Response(JSON.stringify(userData))
    } else {
        throw error(404, 'User Not Found')
    }
})

export const POST: RequestHandler = (async ({ params, request }) => {
    const requestBody = await request.json()

    let query = { _id: new ObjectId(params.id) }
    // console.log("Replacing")
    await db.collection('users').replaceOne(query, requestBody)

    let responseJSON = JSON.stringify('completed')

    return new Response(responseJSON)
}) 