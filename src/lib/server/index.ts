import { web3Connection } from "$lib/config";
import { Keypair } from "@solana/web3.js";
import { ShdwDrive } from "@shadow-drive/sdk";
import { decode } from "@project-serum/anchor/dist/cjs/utils/bytes/bs58";

import { SECRET_KEY } from '$env/static/private'
import { Wallet } from "@project-serum/anchor";

let shadowDrive : ShdwDrive;

export const getDrive = async () => {
    if (shadowDrive) {
        return shadowDrive;
    }
    
    const keyPair = Keypair.fromSecretKey(decode(SECRET_KEY));
    const wallet = new Wallet(keyPair)
    shadowDrive = await new ShdwDrive(web3Connection, wallet).init()

    return shadowDrive
}


