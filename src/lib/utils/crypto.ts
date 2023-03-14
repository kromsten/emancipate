// @ts-ignore
import { decryptWithSymmetricKey, encryptWithSymmetricKey, importSymmetricKey} from "@lit-protocol/sdk-browser";

export const encryptFileWithLit = async (data: File | Blob, symKey : Uint8Array ) => {
    const key = await importSymmetricKey(symKey) as CryptoKey;
    const blob =  await encryptWithSymmetricKey(key, await data.arrayBuffer())
    return blob;
}

export const decryptFileWithLit = async (data: Blob, symKey : Uint8Array) => {
    const key = await importSymmetricKey(symKey) as CryptoKey;
    const ab : ArrayBuffer =  await decryptWithSymmetricKey(data, key)
    return new Blob([ab]);
}