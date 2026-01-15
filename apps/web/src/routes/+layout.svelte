<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	
	const navItems = [
		{ path: '/', label: 'Overview', icon: '📊' },
		{ path: '/providers', label: 'Providers', icon: '🔌' },
		{ path: '/transactions', label: 'Transactions', icon: '📝' },
		{ path: '/alerts', label: 'Alerts', icon: '🔔' },
		{ path: '/settings', label: 'Settings', icon: '⚙️' }
	];
</script>

<div class="flex h-screen overflow-hidden">
	<!-- Sidebar -->
	<aside class="w-64 bg-surface border-r border-border flex-shrink-0">
		<div class="p-6">
			<h1 class="text-h1 text-accent-primary">M-OBS</h1>
			<p class="text-small text-text-secondary mt-1">Mantle Observability</p>
		</div>
		
		<nav class="px-3">
			{#each navItems as item}
				<a
					href={item.path}
					class="flex items-center gap-3 px-3 py-2 rounded-lg text-body transition-colors
						{$page.url.pathname === item.path 
							? 'bg-accent-muted text-accent-primary' 
							: 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'}"
				>
					<span class="text-xl">{item.icon}</span>
					<span>{item.label}</span>
				</a>
			{/each}
		</nav>
		
		<div class="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
			<p class="text-small text-text-tertiary">v0.1.0</p>
		</div>
	</aside>
	
	<!-- Main content -->
	<main class="flex-1 overflow-y-auto">
		<slot />
	</main>
</div>
