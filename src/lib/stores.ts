import { ShdwDrive } from "@shadow-drive/sdk";
import { writable, type Writable } from "svelte/store";
import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
import { web3Connection } from "./config";


export const connected = writable(0);
export const tabSet: Writable<number> = writable(1);
export const drive : Writable<ShdwDrive> = writable();

export const address = writable("");

walletStore.subscribe(store  => {
    if (store?.wallet?.publicKey) {
        drive.set(new ShdwDrive(web3Connection, store.wallet));
        address.set(store.wallet.publicKey.toBase58());
    } 
})



export const key : Writable<Uint8Array> = writable();