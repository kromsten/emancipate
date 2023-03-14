<script lang="ts">
	import { storageKey } from "$lib/config";
	import { DRIVE_ROOT } from "$lib/config/consts";
	import { address, key } from "$lib/stores";
	import { decryptFileWithLit, getKey } from "$lib/utils/crypto";
	import { modalStore, ProgressRadial } from "@skeletonlabs/skeleton";
	import { onMount } from "svelte";

    // @ts-ignore
    import { fileToDataUrl } from "@lit-protocol/sdk-browser";

    const file = $modalStore[0].meta.file;
    const url = `${DRIVE_ROOT}/${storageKey}/${$address}_${file}`
    console.log("url:", url)

    let downloaded: boolean = false;
    let error : string = "";

    let blob : Blob;
    let size : number;
    let blobUrl : string;
    

    $: if (blob) {
        fileToDataUrl(blob).then((res : string) => blobUrl = res)

    } 

    const getRemote = async () => {
        fetch(url)
        .then(res => res.blob())
        .then(res => {
            blob = res;
            size = blob.size;
            downloaded = true;
        })
    }

    onMount(() => {
        getRemote();
    })

    const decrypt = async () => {
        if (!$key) await getKey()
        if (!$key) { 
            error = "No key found"
            return;
        }

        decryptFileWithLit(blob, $key)
        .then(res => {blob = res; size = blob.size})
        .catch(err => {
            console.log("decr:", err.message)
            error = err.message
        })
    }

</script>

<div class="bg-white w-80 p-5 rounded flex flex-col justify-center items-center font-sans ">
    <h4 class="mb-2">{ file }</h4>
    {#if downloaded}
        <p>Downloaded</p>
    {:else}
        <ProgressRadial ... stroke={100} meter="stroke-primary-500" track="stroke-primary-500/30" />
    {/if}


  
    { #if blob }

        <div class="grid grid-cols-3 items-center my-3 py-3 border-y gap-5">
            <span>{ file }</span>
            <span>{ size } bytes</span>
            <button class="btn btn-sm variant-filled-secondary" on:click={decrypt}>Decrypt</button>
        </div>

        <div class="w-max flex justify-center">
            <a class="btn btn-sm variant-filled-primary"
                href={blobUrl}
                download={file}
            >
                Save
            </a>
        </div>

    { /if }

    {#if error}
        <span class="mt-4 text-red-800">{ error }</span>
    {/if}

    
</div>

