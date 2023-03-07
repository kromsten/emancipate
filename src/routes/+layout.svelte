<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-rocket.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import Connect from '$lib/components/connect.svelte';

	import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
	import { type WorkSpace, AnchorConnectionProvider } from '@svelte-on-solana/wallet-adapter-anchor';
	import { WalletProvider, WalletMultiButton } from '@svelte-on-solana/wallet-adapter-ui';
	import { clusterApiUrl } from '@solana/web3.js';
	import { onMount } from 'svelte';


	const localStorageKey = 'walletAdapter';
	const network = clusterApiUrl('devnet'); // localhost or mainnet
	
	let wallets : any[];

	let idl : any = {}

	onMount(async () => {
		const {
			PhantomWalletAdapter,
			SlopeWalletAdapter,
			SolflareWalletAdapter,
			SolletExtensionWalletAdapter,
			TorusWalletAdapter,
		} = await import('@solana/wallet-adapter-wallets');

		const walletsMap = [
			new PhantomWalletAdapter(),
			new SlopeWalletAdapter(),
			new SolflareWalletAdapter(),
			new SolletExtensionWalletAdapter(),
			new TorusWalletAdapter(),
		];

		wallets = walletsMap;
	});


</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl">e-man-ci-pate</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">

				<Connect />
				
			</svelte:fragment>

		</AppBar>
	</svelte:fragment>

	<!-- Page Route Content -->

	<WalletProvider {localStorageKey} {wallets}  />

	<slot />


</AppShell>
