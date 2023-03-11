// @ts-ignore
import LitJsSdk from "@lit-protocol/sdk-browser";


export const litChain = "solana";
export const litClient = new LitJsSdk.LitNodeClient();
export const litConnect = () => litClient.connect();