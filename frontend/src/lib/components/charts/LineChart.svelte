<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import uPlot from 'uplot';
	
	export let data: { timestamps: number[]; values: number[] };
	export let title: string = '';
	export let color: string = '#3B82F6';
	export let height: number = 200;
	
	let chartContainer: HTMLDivElement;
	let chart: uPlot | null = null;
	
	function createChart() {
		if (!chartContainer || !data.timestamps.length) return;
		
		const opts: uPlot.Options = {
			width: chartContainer.clientWidth,
			height,
			cursor: {
				drag: {
					x: false,
					y: false,
				},
			},
			scales: {
				x: {
					time: true,
				},
			},
			axes: [
				{
					stroke: '#71717A',
					grid: {
						stroke: '#27272A',
					},
				},
				{
					stroke: '#71717A',
					grid: {
						stroke: '#27272A',
					},
				},
			],
			series: [
				{},
				{
					label: title,
					stroke: color,
					fill: color + '20',
					width: 2,
				},
			],
		};
		
		const chartData: uPlot.AlignedData = [
			data.timestamps,
			data.values,
		];
		
		chart = new uPlot(opts, chartData, chartContainer);
	}
	
	function destroyChart() {
		if (chart) {
			chart.destroy();
			chart = null;
		}
	}
	
	onMount(() => {
		// Load uPlot CSS
		const link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = 'https://unpkg.com/uplot@1.6.28/dist/uPlot.min.css';
		document.head.appendChild(link);
		
		createChart();
	});
	
	onDestroy(() => {
		destroyChart();
	});
	
	// Recreate chart when data changes
	$: if (chart && data) {
		destroyChart();
		createChart();
	}
</script>

<div class="chart-wrapper">
	{#if title}
		<h3 class="text-h3 mb-2">{title}</h3>
	{/if}
	<div bind:this={chartContainer} class="chart-container"></div>
</div>

<style>
	.chart-wrapper {
		width: 100%;
	}
	
	.chart-container {
		width: 100%;
		background: #0A0A0B;
	}
	
	:global(.u-legend) {
		display: none;
	}
</style>
