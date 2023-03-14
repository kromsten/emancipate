import { getDrive } from '$lib/server';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    // @ts-ignore
    event.locals.drive = await getDrive();
    return await resolve(event);
  }