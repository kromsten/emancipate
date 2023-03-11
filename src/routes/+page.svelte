<script lang="ts">
	import Tabs from '$lib/components/tabs.svelte';
	import Artist from '$lib/components/artist.svelte';
	import Marketplace from '$lib/components/marketplace.svelte';
	import { tabSet } from '$lib/stores';
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core';

</script>



<div class="container mx-auto p-6">

	<button>
		<a href="/test">
			Test
		</a>
	</button>

	{ #if $walletStore.connected }
		<Tabs />

		{ #if $tabSet === 0 }
			<Marketplace />
		{ :else if $tabSet === 1 }
			<Artist />
		{/if}

	{ :else }
		Not connected
	{ /if }


</div>

