// @ts-ignore
import { encryptFile, decryptFile } from "@lit-protocol/sdk-browser";

export const encryptFileWithLit = async (file: File | Blob) => {
    return await encryptFile({ file })
}

export const decryptFileWithLit = async (file: File | Blob, symmetricKey : Uint8Array) => {
    return new Blob([await decryptFile({ file, symmetricKey })])
}