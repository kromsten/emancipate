import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

export const storageKeyString = "4TCyfY7XU4iqVmjg73NaVsnH1Ancx3v61L29ausMtd5T";
export const storageKey = new PublicKey(storageKeyString)
export const web3Connection = new Connection(clusterApiUrl('mainnet-beta'));

