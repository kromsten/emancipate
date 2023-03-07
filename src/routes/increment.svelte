<script lang="ts">
    import { counter } from "$lib/stores";
</script>

<button class="button" on:click={() => $counter++}>Increment</button>
