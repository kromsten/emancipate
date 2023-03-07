<script lang="ts">
	import type { Asset } from "$lib/types/asset";
    export let asset : Asset;
</script>


<div class="p-3 border bordered flex gap-3 items-center">
        <p class="text-gray-600">{asset.id}</p>
        <div>
            <h5 class="text-large font-bold">{asset.name}</h5>
            <p class="text-gray-600">{asset.description}</p>
        </div>
</div>