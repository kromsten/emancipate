<script lang="ts">
    import { counter } from "$lib/stores";
  	import Increment from "./increment.svelte";
</script>



<div class="container mx-auto p-6">
	<h1 class="text-4xl font-bold">Hello World</h1>

	<h5>Counter {$counter}</h5>

	<Increment />
</div>
