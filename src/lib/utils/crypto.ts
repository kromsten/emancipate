// @ts-ignore
import { encryptFile, decryptFile, encryptWithSymmetricKey, importSymmetricKey} from "@lit-protocol/sdk-browser";

export const encryptFileWithLit = async (data: File | Blob, symKey : Uint8Array ) => {
    return await encryptWithSymmetricKey(await importSymmetricKey(symKey), data)
}

export const decryptFileWithLit = async (file: File | Blob, symmetricKey : Uint8Array) => {
    return new Blob([await decryptFile({ file, symmetricKey })])
}