<script lang="ts">
	import { onMount } from 'svelte';
	import { getTransactions } from '$lib/api/client';
	
	let transactions: any[] = [];
	let loading = true;
	let status = 'all';
	
	async function loadTransactions() {
		loading = true;
		const result = await getTransactions({ status: status as any, limit: 50 });
		if (result.data) {
			transactions = result.data.transactions || [];
		}
		loading = false;
	}
	
	onMount(() => {
		loadTransactions();
	});
	
	function formatTimestamp(ts: number): string {
		const now = Date.now() / 1000;
		const diff = now - ts;
		
		if (diff < 60) return `${Math.floor(diff)}s ago`;
		if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
		if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
		return new Date(ts * 1000).toLocaleDateString();
	}
	
	function truncateHash(hash: string): string {
		return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
	}
</script>

<div class="p-8">
	<div class="mb-8 flex items-center justify-between">
		<div>
			<h1 class="text-display">Transactions</h1>
			<p class="text-body text-text-secondary mt-2">
				Search and filter transactions
			</p>
		</div>
		
		<div class="flex gap-2">
			<button 
				class="btn btn-sm {status === 'all' ? 'btn-primary' : 'btn-ghost'}"
				on:click={() => { status = 'all'; loadTransactions(); }}
			>
				All
			</button>
			<button 
				class="btn btn-sm {status === 'success' ? 'btn-success' : 'btn-ghost'}"
				on:click={() => { status = 'success'; loadTransactions(); }}
			>
				Success
			</button>
			<button 
				class="btn btn-sm {status === 'failed' ? 'btn-error' : 'btn-ghost'}"
				on:click={() => { status = 'failed'; loadTransactions(); }}
			>
				Failed
			</button>
		</div>
	</div>
	
	{#if loading}
		<div class="card-base">
			<p class="text-body text-text-secondary">Loading transactions...</p>
		</div>
	{:else if transactions.length === 0}
		<div class="card-base">
			<p class="text-body text-text-secondary">No transactions found</p>
		</div>
	{:else}
		<div class="card-base overflow-x-auto">
			<table class="table w-full">
				<thead>
					<tr>
						<th>Time</th>
						<th>Hash</th>
						<th>From</th>
						<th>To</th>
						<th>Status</th>
						<th>Gas Used</th>
						<th>Error</th>
					</tr>
				</thead>
				<tbody>
					{#each transactions as tx}
						<tr class="hover:bg-surface-hover">
							<td class="text-small">{formatTimestamp(tx.block_timestamp)}</td>
							<td>
								<a href="/transactions/{tx.hash}" class="text-mono text-accent-primary hover:underline">
									{truncateHash(tx.hash)}
								</a>
							</td>
							<td class="text-mono text-small">{truncateHash(tx.from_address)}</td>
							<td class="text-mono text-small">
								{#if tx.contract_name}
									<span class="badge badge-sm">{tx.contract_name}</span>
								{:else if tx.to_address}
									{truncateHash(tx.to_address)}
								{:else}
									<span class="text-text-tertiary">Deploy</span>
								{/if}
							</td>
							<td>
								<span class="badge {tx.status === 'success' ? 'badge-success' : 'badge-error'}">
									{tx.status}
								</span>
							</td>
							<td class="text-mono text-small">{tx.gas_used?.toLocaleString()}</td>
							<td class="text-small text-text-secondary truncate max-w-xs">
								{tx.error_decoded || '-'}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
