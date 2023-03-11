
<script lang="ts">
	import { getMyItems } from "$lib/web3/shadowDrive";
    import { address, drive } from "$lib/stores";
	import AssetList from "./assetList.svelte";
	import Upload from "./upload.svelte";
	import Asset from "./asset.svelte";

    let loading = false;

  
    let myFiles : any[]

    $: if ($drive) {
        getMyItems($drive, $address)
        .then((res) => {
            myFiles = res
        })
        .finally(() => loading = false);
    }

</script>


<div>
    <div class="px-3">
        <h1 class="text-2xl font-bold">Artist</h1>
    </div>

    { #if  myFiles }

        <div class="px-3 my-4">
            <h3 class="text-xl font-bold">My assets</h3>
            <hr>
            { #each myFiles as asset }
            <div>
                { asset }
            </div>
            {/each}
        </div>
    {/if}
    
    
    <br>
    
    <a href="/upload" class="button unstyled">Upload New</a>
</div>