<script lang="ts">
	import { onMount } from 'svelte';
	import { checkHealth } from '$lib/api/client';
	
	let status: string = 'checking...';
	let timestamp: number | null = null;
	
	onMount(async () => {
		const result = await checkHealth();
		if (result.data) {
			status = result.data.status;
			timestamp = result.data.timestamp;
		} else {
			status = 'error';
		}
	});
</script>

<div class="p-8">
	<div class="mb-8">
		<h1 class="text-display">Overview</h1>
		<p class="text-body text-text-secondary mt-2">
			Real-time Mantle network monitoring and transaction analysis
		</p>
	</div>
	
	<div class="grid grid-cols-4 gap-4 mb-8">
		<!-- Metric cards placeholder -->
		<div class="card-base">
			<p class="text-small text-text-secondary">Total Transactions</p>
			<p class="text-h1 mt-2">---</p>
		</div>
		
		<div class="card-base">
			<p class="text-small text-text-secondary">Failed Transactions</p>
			<p class="text-h1 mt-2">---</p>
		</div>
		
		<div class="card-base">
			<p class="text-small text-text-secondary">Success Rate</p>
			<p class="text-h1 mt-2">---%</p>
		</div>
		
		<div class="card-base">
			<p class="text-small text-text-secondary">Avg Gas Price</p>
			<p class="text-h1 mt-2">--- Gwei</p>
		</div>
	</div>
	
	<div class="card-base">
		<h2 class="text-h2 mb-4">System Status</h2>
		<div class="flex items-center gap-2">
			<div class="w-3 h-3 rounded-full {status === 'ok' ? 'bg-success' : 'bg-error'}"></div>
			<span class="text-body">API Status: {status}</span>
		</div>
		{#if timestamp}
			<p class="text-small text-text-secondary mt-2">
				Last check: {new Date(timestamp * 1000).toLocaleString()}
			</p>
		{/if}
	</div>
</div>
