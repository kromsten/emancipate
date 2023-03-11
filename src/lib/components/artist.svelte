
<script lang="ts">
	import { getMyItems } from "$lib/web3/shadowDrive";
    import { address, drive } from "$lib/stores";
	import { DRIVE_ROOT } from "$lib/config/consts";
	import { storageKey } from "$lib/config";

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