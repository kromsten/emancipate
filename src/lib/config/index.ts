import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

export const storageKeyString = "6taehw4guY8EgA94yTB82ooKEUXKX9vFaTNWXq9ncNpP";
export const storageKey = new PublicKey(storageKeyString)
export const web3Connection = new Connection(clusterApiUrl('mainnet-beta'));

