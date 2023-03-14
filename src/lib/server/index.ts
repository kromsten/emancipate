import { web3Connection } from "$lib/config";
import type { ShdwDrive } from "@shadow-drive/sdk";

let shadowDrive : ShdwDrive;

export const getDrive = async () => {
    if (shadowDrive) {
        return shadowDrive;
    }

    web3Connection

    const provider = new anchor.Provider(
        window.solana,
        { preflightCommitment: "recent" },

    )

}