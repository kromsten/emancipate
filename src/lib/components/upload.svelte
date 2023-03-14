<script lang="ts">
    import { FileDropzone } from '@skeletonlabs/skeleton';
	import { decryptFileWithLit, encryptFileWithLit, getKey } from '$lib/utils/crypto';
	import { address, key } from '$lib/stores';
	import RecordLogo from './recordLogo.svelte';

    import { Toast, toastStore } from '@skeletonlabs/skeleton';
    import type { ToastSettings } from '@skeletonlabs/skeleton';


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

    let error : string = "";


    $: if (files?.length > 0) {
        // litConnect();
    }


    const ts : ToastSettings = {
        message: 'Success',
    };



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


    

    const encrypt = async (file : submitFile) => {

        try {
            if (!$key) await getKey();
            if (!$key) return false;
    
            const encrypted  = await encryptFileWithLit(file.data, $key);
            submitData[file.name].encrypted = true;
            submitData[file.name].data = encrypted;
            submitData[file.name].size = encrypted.size;
    
            return true
        } catch (err : any) {
            console.log(err)
            error = err.message;
            return false
        }


    }

    const decrypt = async (file : submitFile) => {

        try {
            if (!key) await getKey();
            if (!key) return false;
    
            const content  = await decryptFileWithLit(file.data, $key);
            submitData[file.name].encrypted = false;
            submitData[file.name].data = content;
            submitData[file.name].size = content.size;
    
            return true
        } catch (err : any) {
            console.log(err)
            error = err.message;
            return false
        }

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

        try {

            if (!$address) return;
    
            const formData = new FormData();
    
            for(const file of Object.values(submitData)) {
                formData.append(file.name, file.data);
            }
    
            formData.append('address', $address);
    
            fetch('/upload', {
                method: 'POST',
                body: formData
            })
            .then(async (res) => {
                console.log("res", res)
                if (res.ok) return await res.json()
                else throw new Error((await res.json()).message)
            })
            .then(res => {
                console.log(res.statuses)
                toastStore.trigger(ts);
                setTimeout(() => window.location.href = '/', 1000)
            })
            .catch(err => {
                console.log(err)
                error = err.message;
            })
            
        } catch (err : any) {
            console.log(err)
            error = err.message;
        }

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
    
            <div class="grid grid-cols-1 w-100 mt-5 mb-3">
    
        
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

        { #if error }
            <div class="grid grid-cols-1 w-100 mt-5 mb-3">
                <div class="flex justify-center">
                    <span class="text-red-700 font-bold">Error: {error}</span>
                </div>
            </div>
        {/if}
    </div>



</section>