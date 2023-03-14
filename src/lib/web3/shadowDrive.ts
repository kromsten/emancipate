import { storageKey } from "$lib/config";
import * as anchor from "@project-serum/anchor";
import type { ShdwDrive } from "@shadow-drive/sdk";


export const getMyItems = async (drive : ShdwDrive, address: string) => {
    try {
        const objects = await drive.listObjects(storageKey);
        return objects.keys
            //.filter((key : string) => key.startsWith(address));
        
    } catch (e) {
        console.log(e);
        return [];
    }
}
