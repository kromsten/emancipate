import { writable, type Writable } from "svelte/store";


export const connected = writable(0);
export const tabSet: Writable<number> = writable(0);
