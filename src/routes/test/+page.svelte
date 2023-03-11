<script lang="ts">
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
    import { ShdwDrive } from "@shadow-drive/sdk";
	import { onMount } from 'svelte';
	import { storageKey, web3Connection } from '$lib/config';


    onMount(async () => {
        if ($walletStore.wallet?.publicKey) {
            const shdwDrive = new ShdwDrive(web3Connection, $walletStore.wallet);
            console.log("shdwDrive", shdwDrive);

            const pubKey = $walletStore.wallet.publicKey

            console.log("address:", pubKey.toBase58())

            const res = await Promise.all([
                shdwDrive.userInfo,
                shdwDrive.userInfo,

            ])
            console.log("userInfo", res)        
            //(pubKey)

            const acc = await shdwDrive.listObjects(storageKey)
            console.log("files", acc)

        } else {
            console.log("no wallet")
        }
    })
</script>