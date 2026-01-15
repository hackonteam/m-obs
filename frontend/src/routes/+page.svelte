<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { getMetricsOverview, getTransactions } from '$lib/api/client';
	import LineChart from '$lib/components/charts/LineChart.svelte';
	
	let loading = true;
	let metrics: any = null;
	let recentFailedTxs: any[] = [];
	let refreshInterval: any;
	
	async function loadData() {
		// Load metrics for last hour
		const now = Math.floor(Date.now() / 1000);
		const metricsResult = await getMetricsOverview({
			start_ts: now - 3600,
			end_ts: now,
		});
		
		if (metricsResult.data) {
			metrics = metricsResult.data;
		}
		
		// Load recent failed transactions
		const txsResult = await getTransactions({
			status: 'failed',
			limit: 5,
		});
		
		if (txsResult.data) {
			recentFailedTxs = txsResult.data.transactions || [];
		}
		
		loading = false;
	}
	
	onMount(() => {
		loadData();
		// Refresh every 30 seconds
		refreshInterval = setInterval(loadData, 30000);
	});
	
	onDestroy(() => {
		if (refreshInterval) clearInterval(refreshInterval);
	});
	
	function formatTimestamp(ts: number): string {
		const now = Date.now() / 1000;
		const diff = now - ts;
		if (diff < 60) return `${Math.floor(diff)}s ago`;
		if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
		return new Date(ts * 1000).toLocaleTimeString();
	}
	
	function truncateHash(hash: string): string {
		return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
	}
</script>

<div class="p-8">
	<div class="mb-8">
		<h1 class="text-display">Overview</h1>
		<p class="text-body text-text-secondary mt-2">
			Real-time Mantle network monitoring and transaction analysis
		</p>
	</div>
	
	{#if loading}
		<div class="card-base">
			<p class="text-body text-text-secondary">Loading metrics...</p>
		</div>
	{:else if metrics}
		<!-- Metric Cards -->
		<div class="grid grid-cols-4 gap-4 mb-8">
			<div class="card-base">
				<p class="text-small text-text-secondary">Total Transactions</p>
				<p class="text-h1 mt-2">{metrics.summary.tx_total.toLocaleString()}</p>
				<p class="text-small text-text-tertiary mt-1">Last hour</p>
			</div>
			
			<div class="card-base">
				<p class="text-small text-text-secondary">Failed Transactions</p>
				<p class="text-h1 mt-2 text-error">{metrics.summary.tx_failed.toLocaleString()}</p>
				<p class="text-small text-text-tertiary mt-1">{metrics.summary.failure_rate}% failure rate</p>
			</div>
			
			<div class="card-base">
				<p class="text-small text-text-secondary">Success Rate</p>
				<p class="text-h1 mt-2 text-success">{(100 - metrics.summary.failure_rate).toFixed(2)}%</p>
				<p class="text-small text-text-tertiary mt-1">{metrics.summary.blocks_processed} blocks</p>
			</div>
			
			<div class="card-base">
				<p class="text-small text-text-secondary">Avg Gas Price</p>
				<p class="text-h1 mt-2">{metrics.summary.gas_price_avg_gwei.toFixed(4)}</p>
				<p class="text-small text-text-tertiary mt-1">Gwei</p>
			</div>
		</div>
		
		<!-- Charts -->
		<div class="grid grid-cols-2 gap-4 mb-8">
			<div class="card-base">
				<LineChart 
					data={{ 
						timestamps: metrics.series.timestamps, 
						values: metrics.series.tx_failed_count 
					}}
					title="Failed Transactions"
					color="#EF4444"
					height={200}
				/>
			</div>
			
			<div class="card-base">
				<LineChart 
					data={{ 
						timestamps: metrics.series.timestamps, 
						values: metrics.series.gas_price_avg.map((v: number) => v / 1e9) 
					}}
					title="Gas Price (Gwei)"
					color="#3B82F6"
					height={200}
				/>
			</div>
		</div>
		
		<!-- Bottom Row -->
		<div class="grid grid-cols-2 gap-4">
			<!-- Top Errors -->
			<div class="card-base">
				<h2 class="text-h2 mb-4">Top Errors</h2>
				{#if metrics.top_errors.length > 0}
					<div class="space-y-2">
						{#each metrics.top_errors as error}
							<div class="flex justify-between items-center p-2 bg-surface-hover rounded">
								<span class="text-body truncate">{error.name}</span>
								<span class="badge badge-error">{error.count}</span>
							</div>
						{/each}
					</div>
				{:else}
					<p class="text-body text-text-secondary">No errors in this period</p>
				{/if}
			</div>
			
			<!-- Recent Failed Transactions -->
			<div class="card-base">
				<h2 class="text-h2 mb-4">Recent Failed Transactions</h2>
				{#if recentFailedTxs.length > 0}
					<div class="space-y-2">
						{#each recentFailedTxs as tx}
							<a 
								href="/transactions/{tx.hash}"
								class="flex justify-between items-center p-2 bg-surface-hover rounded hover:bg-border transition-colors"
							>
								<span class="text-mono text-small text-accent-primary">{truncateHash(tx.hash)}</span>
								<div class="flex items-center gap-2">
									<span class="text-small text-text-secondary truncate max-w-xs">
										{tx.error_decoded || 'Unknown error'}
									</span>
									<span class="text-small text-text-tertiary">{formatTimestamp(tx.block_timestamp)}</span>
								</div>
							</a>
						{/each}
					</div>
				{:else}
					<p class="text-body text-text-secondary">No recent failures</p>
				{/if}
			</div>
		</div>
	{:else}
		<div class="card-base">
			<p class="text-body text-error">Failed to load metrics</p>
		</div>
	{/if}
</div>
