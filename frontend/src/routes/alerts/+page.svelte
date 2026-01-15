<script lang="ts">
	import { onMount } from 'svelte';
	import { getAlerts, updateAlert, deleteAlert } from '$lib/api/client';
	
	let alerts: any[] = [];
	let summary: any = null;
	let loading = true;
	let showCreateModal = false;
	
	async function loadAlerts() {
		loading = true;
		const result = await getAlerts({ include_events: true, events_limit: 3 });
		if (result.data) {
			alerts = result.data.alerts || [];
			summary = result.data.summary;
		}
		loading = false;
	}
	
	async function toggleAlert(alertId: number, currentState: boolean) {
		const result = await updateAlert(alertId, { is_enabled: !currentState });
		if (result.data) {
			await loadAlerts();
		}
	}
	
	async function removeAlert(alertId: number) {
		if (!confirm('Are you sure you want to delete this alert?')) return;
		const result = await deleteAlert(alertId);
		if (result.data) {
			await loadAlerts();
		}
	}
	
	function getSeverityBadge(severity: string) {
		switch (severity) {
			case 'critical': return 'badge-error';
			case 'warning': return 'badge-warning';
			case 'info': return 'badge-info';
			default: return 'badge-ghost';
		}
	}
	
	function formatTimestamp(ts: number): string {
		return new Date(ts * 1000).toLocaleString();
	}
	
	onMount(() => {
		loadAlerts();
	});
</script>

<div class="p-8">
	<div class="mb-8 flex items-center justify-between">
		<div>
			<h1 class="text-display">Alerts</h1>
			<p class="text-body text-text-secondary mt-2">
				Configure monitoring rules and view alert history
			</p>
		</div>
		
		<button class="btn btn-primary" on:click={() => showCreateModal = true}>
			+ Create Alert
		</button>
	</div>
	
	{#if loading}
		<div class="card-base">
			<p class="text-body text-text-secondary">Loading alerts...</p>
		</div>
	{:else}
		<!-- Summary -->
		{#if summary}
			<div class="grid grid-cols-3 gap-4 mb-8">
				<div class="card-base">
					<p class="text-small text-text-secondary">Total Alerts</p>
					<p class="text-h1 mt-2">{summary.total}</p>
				</div>
				<div class="card-base">
					<p class="text-small text-text-secondary">Enabled</p>
					<p class="text-h1 mt-2 text-success">{summary.enabled}</p>
				</div>
				<div class="card-base">
					<p class="text-small text-text-secondary">Triggered (24h)</p>
					<p class="text-h1 mt-2 text-warning">{summary.triggered_24h}</p>
				</div>
			</div>
		{/if}
		
		<!-- Alert Rules -->
		{#if alerts.length === 0}
			<div class="card-base text-center py-12">
				<p class="text-body text-text-secondary mb-4">No alerts configured</p>
				<button class="btn btn-primary btn-sm" on:click={() => showCreateModal = true}>
					Create your first alert
				</button>
			</div>
		{:else}
			<div class="space-y-4">
				{#each alerts as alert}
					<div class="card-base">
						<div class="flex items-start justify-between mb-4">
							<div class="flex-1">
								<div class="flex items-center gap-3 mb-2">
									<h2 class="text-h2">{alert.name}</h2>
									<span class="badge {getSeverityBadge(alert.severity)}">
										{alert.severity}
									</span>
									<span class="badge badge-sm">{alert.alert_type}</span>
								</div>
								{#if alert.description}
									<p class="text-body text-text-secondary">{alert.description}</p>
								{/if}
							</div>
							
							<div class="flex items-center gap-2">
								<button 
									class="btn btn-sm btn-ghost"
									on:click={() => toggleAlert(alert.id, alert.is_enabled)}
								>
									{alert.is_enabled ? 'Pause' : 'Resume'}
								</button>
								<button 
									class="btn btn-sm btn-error btn-outline"
									on:click={() => removeAlert(alert.id)}
								>
									Delete
								</button>
							</div>
						</div>
						
						<div class="grid grid-cols-4 gap-4 text-small mb-4">
							<div>
								<span class="text-text-secondary">Threshold:</span>
								<span class="text-mono ml-2">{alert.threshold}</span>
							</div>
							<div>
								<span class="text-text-secondary">Window:</span>
								<span class="ml-2">{alert.window_minutes}m</span>
							</div>
							<div>
								<span class="text-text-secondary">Cooldown:</span>
								<span class="ml-2">{alert.cooldown_minutes}m</span>
							</div>
							<div>
								<span class="text-text-secondary">Status:</span>
								<span class="ml-2 {alert.is_enabled ? 'text-success' : 'text-text-tertiary'}">
									{alert.is_enabled ? 'Active' : 'Paused'}
								</span>
							</div>
						</div>
						
						<!-- Recent Events -->
						{#if alert.events && alert.events.length > 0}
							<div class="border-t border-border pt-4">
								<h3 class="text-h3 mb-2">Recent Triggers</h3>
								<div class="space-y-2">
									{#each alert.events as event}
										<div class="flex items-center justify-between p-2 bg-surface-hover rounded">
											<div>
												<span class="text-small">
													Observed: <span class="text-mono">{event.value_observed.toFixed(2)}</span>
													vs Threshold: <span class="text-mono">{event.threshold}</span>
												</span>
											</div>
											<div class="flex items-center gap-3">
												{#if event.acknowledged_at}
													<span class="badge badge-sm badge-success">Ack'd</span>
												{:else}
													<span class="badge badge-sm badge-warning">Pending</span>
												{/if}
												<span class="text-small text-text-tertiary">
													{formatTimestamp(event.triggered_at)}
												</span>
											</div>
										</div>
									{/each}
								</div>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	{/if}
</div>

<!-- Create Alert Modal (placeholder) -->
{#if showCreateModal}
	<div class="modal modal-open">
		<div class="modal-box">
			<h3 class="font-bold text-lg">Create Alert</h3>
			<p class="py-4">Alert creation UI coming soon. Use API directly for now.</p>
			<div class="modal-action">
				<button class="btn" on:click={() => showCreateModal = false}>Close</button>
			</div>
		</div>
	</div>
{/if}

