<script lang="ts">
	import Tabs from '$lib/components/tabs.svelte';
	import Artist from '$lib/components/artist.svelte';
	import Consumer from '$lib/components/consumer.svelte';
	import { connected, tabSet } from '$lib/stores';
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
</script>



<div class="container mx-auto p-6">

	{ #if $walletStore.connected }
		<Tabs />

		{ #if $tabSet === 0 }
			<Artist />
		{ :else if $tabSet === 1 }
			<Consumer />
		{/if}

	{ :else }
		Not connected
	{ /if }


</div>

