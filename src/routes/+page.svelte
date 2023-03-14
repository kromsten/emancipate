<script lang="ts">
	import Tabs from '$lib/components/tabs.svelte';
	import Artist from '$lib/components/artist.svelte';
	import { tabSet } from '$lib/stores';
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core';

</script>



<div class="container mx-auto p-6 font-sans">

	{ #if $walletStore.connected }
		<Artist />
	{ :else }

		<div class="mt-5 flex justify-center items-cemter">
			<div class="flex flex-col items-center">
				<h1 class="text-4xl">Connect your wallet</h1>
				<p class="text-xl">to get started</p>
			</div>
		</div>
	{ /if }


</div>

