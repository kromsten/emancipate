// @ts-ignore
import { decryptWithSymmetricKey, encryptWithSymmetricKey, importSymmetricKey} from "@lit-protocol/sdk-browser";
import { walletStore } from "@svelte-on-solana/wallet-adapter-core";
import { createHash } from "sha256-uint8array";
import { key } from '$lib/stores'

export const encryptFileWithLit = async (data: File | Blob, symKey : Uint8Array ) => {
    const key = await importSymmetricKey(symKey) as CryptoKey;
    const blob =  await encryptWithSymmetricKey(key, await data.arrayBuffer())
    return blob;
}

export const decryptFileWithLit = async (data: Blob, symKey : Uint8Array) => {
    const key = await importSymmetricKey(symKey) as CryptoKey;
    console.log("ok", data, key)
    const ab : ArrayBuffer =  await decryptWithSymmetricKey(data, key)
    return new Blob([ab]);
}

export const getKey = async () => {

    return new Promise<void>((resolve, reject) => {
        walletStore.subscribe(async store => {
            try {
                const signature = await store.signMessage!(Buffer.from('Emancipate encryption'))
                const digest = createHash().update(signature).digest('')
                key.set(Uint8Array.from(Buffer.from(digest)))
                resolve()
            } catch (e) {
                reject(e)
            }
        })
    })
}