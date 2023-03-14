import { web3Connection } from "$lib/config";
import { Keypair } from "@solana/web3.js";
import { ShdwDrive } from "@shadow-drive/sdk";
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
import { decode } from "@project-serum/anchor/dist/cjs/utils/bytes/bs58";

import { SECRET_KEY } from '$env/static/private'

let shadowDrive : ShdwDrive;

export const getDrive = async () => {
    if (shadowDrive) {
        return shadowDrive;
    }
    
    const keyPair = Keypair.fromSecretKey(decode(SECRET_KEY));
    const wallet = new NodeWallet(keyPair)
    shadowDrive = await new ShdwDrive(web3Connection, wallet).init()

    return shadowDrive
}


