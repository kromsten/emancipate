<script lang="ts">
	import { Tab, TabGroup } from "@skeletonlabs/skeleton";
    import { tabSet } from '$lib/stores';
</script>



<div class="container mx-auto p-6">
	<TabGroup>
		<Tab bind:group={$tabSet} name="tab1" value={0}>Artist</Tab>
		<Tab bind:group={$tabSet} name="tab2" value={1}>Consumer</Tab>
	</TabGroup>
</div>