
<script lang="ts">
	import { getMyItems } from "$lib/web3/shadowDrive";
    import { address, drive } from "$lib/stores";
	import { DRIVE_ROOT } from "$lib/config/consts";
	import { storageKey } from "$lib/config";
	import AssetList from "./assetList.svelte";

    let loading = false;
    let error : string;

    let myMetaData : any = {}
    let myFiles : any[]

    $: if ($drive) {
        getMyItems($drive, $address)
        .then((res) => {
            myFiles = res
            if (res.length) {
                const found = res.find(f => f.endsWith('_meta.json'))
                if (found) {
                    fetch(`${DRIVE_ROOT}/${storageKey}/${found}`)
                    .then(res => res.json())
                    .then(data => {
                        myMetaData = data
                    })
                    .catch(err => {
                        error = err.message
                    })
                }
            }
        })
        .finally(() => loading = false);
    }

</script>


<div>

    { #if  myFiles }

        <div class="px-3 my-4">
            <h3 class="text-2xl font-bold">My assets</h3>
            <hr>

            <AssetList files={myFiles} />

        </div>
    {/if}
    
    <hr>
    <br>
    
    <div class="px-3">
        <a href="/upload" class="btn variant-filled-primary">Upload New</a>
    </div>
</div>