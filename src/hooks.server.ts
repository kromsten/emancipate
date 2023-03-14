import { getDrive } from '$lib/server';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  try {
      // @ts-ignore
      event.locals.drive = await getDrive();
    } catch (e) {
      console.error(e);
    }
    return await resolve(event);
  }