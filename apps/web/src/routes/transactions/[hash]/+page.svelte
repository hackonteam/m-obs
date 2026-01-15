<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { getTransactionDetail } from '$lib/api/client';
	
	let tx: any = null;
	let loading = true;
	let error: string | null = null;
	
	$: hash = $page.params.hash;
	
	onMount(async () => {
		const result = await getTransactionDetail(hash);
		if (result.data) {
			tx = result.data.transaction;
		} else {
			error = result.error || 'Failed to load transaction';
		}
		loading = false;
	});
	
	function copyToClipboard(text: string) {
		navigator.clipboard.writeText(text);
	}
</script>

<div class="p-8">
	<div class="mb-8">
		<a href="/transactions" class="text-accent-primary hover:underline mb-4 inline-block">
			← Back to Transactions
		</a>
		<h1 class="text-display">Transaction Detail</h1>
		<p class="text-mono text-body text-text-secondary mt-2">{hash}</p>
	</div>
	
	{#if loading}
		<div class="card-base">
			<p class="text-body text-text-secondary">Loading transaction...</p>
		</div>
	{:else if error}
		<div class="card-base">
			<p class="text-body text-error">{error}</p>
		</div>
	{:else if tx}
		<div class="space-y-6">
			<!-- Status -->
			<div class="card-base">
				<span class="badge {tx.status === 'success' ? 'badge-success' : 'badge-error'} badge-lg">
					{tx.status === 'success' ? '✓' : '✗'} {tx.status}
				</span>
			</div>
			
			<!-- Summary -->
			<div class="card-base">
				<h2 class="text-h2 mb-4">Summary</h2>
				<div class="space-y-3">
					<div class="flex justify-between">
						<span class="text-text-secondary">Block:</span>
						<span class="text-mono">{tx.block_number.toLocaleString()}</span>
					</div>
					<div class="flex justify-between">
						<span class="text-text-secondary">Time:</span>
						<span>{new Date(tx.block_timestamp * 1000).toLocaleString()}</span>
					</div>
					<div class="flex justify-between items-center">
						<span class="text-text-secondary">From:</span>
						<div class="flex items-center gap-2">
							<span class="text-mono">{tx.from_address}</span>
							<button 
								class="btn btn-xs btn-ghost"
								on:click={() => copyToClipboard(tx.from_address)}
							>
								📋
							</button>
						</div>
					</div>
					<div class="flex justify-between items-center">
						<span class="text-text-secondary">To:</span>
						<div class="flex items-center gap-2">
							{#if tx.contract}
								<span class="badge">{tx.contract.name}</span>
							{/if}
							<span class="text-mono">{tx.to_address}</span>
							<button 
								class="btn btn-xs btn-ghost"
								on:click={() => copyToClipboard(tx.to_address)}
							>
								📋
							</button>
						</div>
					</div>
					<div class="flex justify-between">
						<span class="text-text-secondary">Value:</span>
						<span>{tx.value_eth} MNT</span>
					</div>
					<div class="flex justify-between">
						<span class="text-text-secondary">Gas Used:</span>
						<span class="text-mono">{tx.gas_used.toLocaleString()}</span>
					</div>
					<div class="flex justify-between">
						<span class="text-text-secondary">Gas Price:</span>
						<span>{tx.gas_price_gwei} Gwei</span>
					</div>
				</div>
			</div>
			
			<!-- Error (if failed) -->
			{#if tx.error}
				<div class="card-base border-error">
					<h2 class="text-h2 mb-4 text-error">What Happened</h2>
					<div class="bg-error bg-opacity-10 rounded-lg p-4">
						<p class="text-body font-semibold mb-2">{tx.error.decoded}</p>
						<details class="mt-3">
							<summary class="cursor-pointer text-small text-text-secondary">
								Show raw data
							</summary>
							<p class="text-mono text-small mt-2 break-all">{tx.error.raw}</p>
						</details>
					</div>
				</div>
			{/if}
		</div>
	{/if}
</div>
