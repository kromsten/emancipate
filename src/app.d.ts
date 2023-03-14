// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { ShdwDrive } from "@shadow-drive/sdk";

// and what to do when importing types
declare namespace App {
	interface Locals {
		drive: ShdwDrive;
	}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}
