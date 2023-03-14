<script lang="ts">
    import { FileDropzone } from '@skeletonlabs/skeleton';
	import { decryptFileWithLit, encryptFileWithLit } from '$lib/utils/crypto';
	import { JSON_POST_PARAMS } from '$lib/utils/util';
	import { address, key } from '$lib/stores';
	import RecordLogo from './recordLogo.svelte';
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core';

    import { createHash } from 'sha256-uint8array'


    type submitFile = {
        data: Blob
        size: number,
        name: string,
        encrypted: boolean,
    }

    let password : string;
    let encrypted = false;
    let input: HTMLInputElement;

    const submitData : {[file : string] : submitFile } = {} 

    let files : FileList;


    $: if (files?.length > 0) {
        // litConnect();
    }



    const onChangeHandler = (e: any): void => {
        files = e.target?.files as FileList;

        Array.from(files).forEach(file => {
            submitData[file.name] = {
                data: file,
                size: file.size,
                name: file.name,
                encrypted: false
            }
        })
    }


    const getKey = async () => {

        const signature = await $walletStore.signMessage!(Buffer.from('Emancipate encryption'))
        const digest = createHash().update(signature).digest('')
        $key = Uint8Array.from(Buffer.from(digest))


    }

    const encrypt = async (file : submitFile) => {

        if (!$key) await getKey();
        if (!$key) return false;

        const encrypted  = await encryptFileWithLit(file.data, $key);
        submitData[file.name].encrypted = true;
        submitData[file.name].data = encrypted;
        submitData[file.name].size = encrypted.size;

        return true

    }

    const decrypt = async (file : submitFile) => {

        if (!key) await getKey();
        if (!key) return false;

        const content  = await decryptFileWithLit(file.data, $key);
        submitData[file.name].encrypted = false;
        submitData[file.name].data = content;
        submitData[file.name].size = content.size;

        return true

    }

    const encryptAll = async () => {

        for (const file of Object.values(submitData)) {
            if (!file.encrypted) {
                if (!(await encrypt(file))) return;
            }
        }
        encrypted = true;
    }

    const decryptAll = async () => {

        for (const file of Object.values(submitData)) {
            if (file.encrypted) {
                await decrypt(file);
            }
        }
        encrypted = false;
    }


    const upload = async () => {

        if (!address) return;

        const formData = new FormData();

        for(const file of Object.values(submitData)) {
            formData.append(file.name, file.data);
        }

        formData.append('address', $address);

        const res = await fetch('/upload', {
            method: 'POST',
            body: formData
        }).then(res => res.json());
        console.log("res:", res)

    }


    
</script>



<section class="container mx-auto p-6">
    <h2 class="my-2">Select assets</h2>

    <FileDropzone  multiple name="fff" 
        class="bg-white"
        on:change={onChangeHandler} 
        border="border border-white"
    >
        <svelte:fragment slot="lead"><RecordLogo /></svelte:fragment>
        <svelte:fragment slot="meta"></svelte:fragment>

    </FileDropzone>

    <div class="flex flex-col gap-2">

        {#if Object.keys(submitData).length }
            <h3 class="mt-3">Assets To Upload:</h3>
            {#each Object.values(submitData) as file }
    
                <div class="grid grid-cols-4 w-100">
                    <span>{file.name}</span>
                    <span class="text-center">{file.size} bytes</span>
                    <span class="text-center">{file.encrypted ? "Encrypted" : "Plain"}</span>
                    <div class="flex justify-end">
                        <button 
                            class="btn btn-sm variant-filled-primary rounded" 
                            on:click={() => submitData[file.name].encrypted ? decrypt(file) : encrypt(file)}>
                            {submitData[file.name].encrypted ? "Decrypt" : "Encrypt" }
                        </button>
    
                    </div>
    
                </div>
            {/each}
    
            <div class="grid grid-cols-2 w-100 mt-5 mb-3">
    
        
                <div class="flex justify-end">
                    <button class="btn variant-filled-primary" on:click={encrypted ? decryptAll : encryptAll}>
                        {#if encrypted}
                            Decrypt All
                        {:else}
                            Encrypt All
                        {/if}
                    </button>
                </div>
            </div>

            <div class="grid grid-cols-1 w-100 mt-7">
                <div class="flex justify-center">
                    <button class="btn btn-lg variant-filled-primary" on:click={upload}>
                        Upload
                    </button>
                </div>
            </div>
        {/if}
    </div>

</section>