import { storageKey } from "$lib/config";
import type { ShdwDrive } from "@shadow-drive/sdk";


export const getMyItems = async (drive : ShdwDrive, address: string) => {
    try {
        const objects = await drive.listObjects(storageKey);
        return objects.keys
            .filter((key : string) => key.startsWith(address))
            .map((key : string) => {
                return key.split('_')[1];
            })
        
    } catch (e) {
        console.log(e);
        return [];
    }
}
