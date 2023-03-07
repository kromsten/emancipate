<script lang="ts">
	import { WalletMultiButton } from "@svelte-on-solana/wallet-adapter-ui";


    const connect = () => {
        console.log('connect');
    }
</script>


<WalletMultiButton  />
<!-- 
<button on:click={connect}>
    Connect
</button> -->