<script lang="ts">
	import Tabs from '$lib/components/tabs.svelte';
	import Artist from '$lib/components/artist.svelte';
	import Consumer from '$lib/components/consumer.svelte';
	import { tabSet } from '$lib/stores';
</script>



<div class="container mx-auto p-6">
	<Tabs />

	{ #if $tabSet === 0 }
		<Artist />
	{ :else if $tabSet === 1 }
		<Consumer />
	{/if}

</div>

