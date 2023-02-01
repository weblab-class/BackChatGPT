import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types'

export const load = (() => {
    throw redirect(302, '/wiki/introduction')
}) satisfies PageLoad;