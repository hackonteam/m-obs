<script lang="ts">
	import { onMount } from 'svelte';
	import { getProvidersHealth } from '$lib/api/client';
	
	let providers: any[] = [];
	let loading = true;
	
	onMount(async () => {
		const result = await getProvidersHealth(24);
		if (result.data) {
			providers = result.data.providers || [];
		}
		loading = false;
	});
</script>

<div class="p-8">
	<div class="mb-8">
		<h1 class="text-display">Provider Health</h1>
		<p class="text-body text-text-secondary mt-2">
			RPC provider comparison and monitoring
		</p>
	</div>
	
	{#if loading}
		<div class="card-base">
			<p class="text-body text-text-secondary">Loading providers...</p>
		</div>
	{:else if providers.length === 0}
		<div class="card-base">
			<p class="text-body text-text-secondary">No providers configured</p>
		</div>
	{:else}
		<div class="card-base overflow-x-auto">
			<table class="table w-full">
				<thead>
					<tr>
						<th>Name</th>
						<th>Status</th>
						<th>Score</th>
						<th>Avg Latency</th>
						<th>Success Rate</th>
						<th>Current Block</th>
						<th>Traces</th>
					</tr>
				</thead>
				<tbody>
					{#each providers as provider}
						<tr>
							<td>
								<div class="font-semibold">{provider.name}</div>
								<div class="text-small text-text-secondary">{provider.url}</div>
							</td>
							<td>
								<span class="badge {
									provider.status === 'healthy' ? 'badge-success' : 
									provider.status === 'degraded' ? 'badge-warning' : 
									'badge-error'
								}">
									{provider.status}
								</span>
							</td>
							<td>{provider.score}</td>
							<td>{provider.stats?.avg_latency_ms || 'N/A'} ms</td>
							<td>{provider.stats?.success_rate?.toFixed(2) || 'N/A'}%</td>
							<td class="text-mono">{provider.stats?.current_block?.toLocaleString() || 'N/A'}</td>
							<td>{provider.supports_traces ? '✅' : '❌'}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
