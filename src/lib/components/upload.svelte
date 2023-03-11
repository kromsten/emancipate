<script lang="ts">
    import { FileDropzone } from '@skeletonlabs/skeleton';
	import { decryptFileWithLit, encryptFileWithLit } from '$lib/utils/crypto';

    
    type submitFile = {
        data: Blob
        size: number,
        name: string,
        encrypted: boolean,
        symmetricKey?: Uint8Array
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

    const encrypt = async (file : submitFile) => {
        const { encryptedFile, symmetricKey }  = await encryptFileWithLit(file.data);
        submitData[file.name].encrypted = true;
        submitData[file.name].symmetricKey = symmetricKey;
        submitData[file.name].data = encryptedFile;
        submitData[file.name].size = encryptedFile.size;

    }

    const decrypt = async (file : submitFile) => {
        const content  = await decryptFileWithLit(file.data, file.symmetricKey!);
        submitData[file.name].encrypted = false;
        submitData[file.name].data = content;
        submitData[file.name].size = content.size;
    }

    const encryptAll = async () => {

        if (!input.reportValidity()) {
            input.focus()
            return;
        } 
            

        for (const file of Object.values(submitData)) {
            if (!file.encrypted) {
                await encrypt(file);
            }
        }
        encrypted = true;
    }

    const decryptAll = async () => {
        
        if (!input.reportValidity()) {
            input.focus()
            return;
        } 

        for (const file of Object.values(submitData)) {
            if (file.encrypted) {
                await decrypt(file);
            }
        }
        encrypted = false;
    }


    const upload = () => {

    }


    
</script>


<section class="container my-5">
    <h3 class="my-2">Select assets</h3>

    <FileDropzone multiple name="fff" on:change={onChangeHandler}  />

    {#if Object.keys(submitData).length }
        <h2 class="mt-3">Selected files:</h2>
        {#each Object.values(submitData) as file }

        <div class="grid grid-cols-2 w-100">
            <span>{file.name}</span>
            <span class="text-end">{file.size} bytes</span>
        </div>
        {/each}

        <div class="grid grid-cols-2 w-100 mt-5">

            <!-- Encryption password -->
            <input required minlength={3} bind:this={input} type="text" placeholder="Encryption Password" bind:value={password} />

            <div class="flex justify-end">
                <button class="button" on:click={encrypted ? decryptAll : encryptAll}>
                    {#if encrypted}
                        Decrypt All
                    {:else}
                        Encrypt All
                    {/if}
                </button>
            </div>
        </div>
    {/if}
</section>