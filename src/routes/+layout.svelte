<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-gold-nouveau.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import { AppShell, AppBar, Modal, Toast } from '@skeletonlabs/skeleton';
	import Connect from '$lib/components/connect.svelte';
	import { WalletProvider } from '@svelte-on-solana/wallet-adapter-ui';
	import { clusterApiUrl } from '@solana/web3.js';
	import { onMount } from 'svelte';

	const localStorageKey = 'walletAdapter';
	const network = clusterApiUrl('devnet'); // localhost or mainnet
	
	let wallets : any[];

	let idl : any = {}

	import { autoModeWatcher } from '@skeletonlabs/skeleton';
	import Logo from '$lib/components/logo.svelte';

	

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

<svelte:head>{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}</svelte:head>

<!-- App Shell -->
<AppShell slotPageContent="bg-white">
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<a href="/" class="text-3xl font-bold font-sans">
					<Logo />
				</a>
			</svelte:fragment>
			<svelte:fragment slot="trail">

				<Connect />
				
			</svelte:fragment>

		</AppBar>
	</svelte:fragment>

	<!-- Page Route Content -->

	<WalletProvider autoConnect={true} {localStorageKey} {wallets}  />


	<slot />


</AppShell>

<Modal />
<Toast position={'t'} />



<style>
	:global(main) {
		background-image: url('/background.svg');
		background-repeat: no-repeat;
		background-size: cover;
	}
</style>