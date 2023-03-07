<script lang="ts">
    import AssetComponent from "./asset.svelte";
	import type AssetType from "$lib/types/asset";

    let assets : AssetType[] = [
        {
            id: "1",
            name: "Asset 1",
            description: "Asset 1 description",
            tags: ["tag1", "tag2"],
            mediaType: "image",
        },
        {
            id: "2",
            name: "Asset 2",
            description: "Asset 2 description",
            tags: ["tag1", "tag2"],
            mediaType: "image",
        },
        {
            id: "3",
            name: "Asset 3",
            description: "Asset 3 description",
            tags: ["tag1", "tag2"],
            mediaType: "image",

        },

        {
            id: "4",
            name: "New onw",
            description: "",
            tags: ["tag1", "tag2"],
            mediaType: "image",
        },

    ];
</script>

<div class="p-3">
    <h3 class="text mb-4">Assets:</h3>
    <div class="flex flex-col gap-5">
        { #each assets as asset (asset.id) }
            <AssetComponent {asset} />
        {/each}

    </div>

</div>