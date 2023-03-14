<script lang="ts">
    import { modalStore, ListBox, ListBoxItem, type ModalSettings } from '@skeletonlabs/skeleton';
	import DownloadModal from './downloadModal.svelte';
    export let files : string[]

    let selectedFile: string;

    
    const component = {
        ref: DownloadModal
    }

    const promptTemplate: ModalSettings = {
        type: 'component',
        modalClasses: "w-max",
        component
    }


    const onClick = () => {
        modalStore.trigger({...promptTemplate, meta: { file: selectedFile }})
    }
    

</script>

<div>
    <ListBox>
        { #each files as file (file)}
            <ListBoxItem bind:group={selectedFile} name="medium" value={file}>{file}</ListBoxItem>
        {/each}
    </ListBox>
    
    <br>
    
    { #if selectedFile }
        <button class="btn btn-sm variant-filled-primary" on:click={onClick}>Download</button>
    {/if }

</div>

