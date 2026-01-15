<script lang="ts">
	import { onMount } from 'svelte';
	import uPlot from 'uplot';
	
	export let data: { timestamps: number[]; values: number[] };
	export let title: string = '';
	export let color: string = '#3B82F6';
	export let height: number = 200;
	
	let chartDiv: HTMLDivElement;
	let chart: uPlot | null = null;
	
	$: if (chart && data) {
		updateChart();
	}
	
	function updateChart() {
		if (!chart || !data || data.timestamps.length === 0) return;
		
		chart.setData([
			data.timestamps,
			data.values
		]);
	}
	
	onMount(() => {
		if (!data || data.timestamps.length === 0) return;
		
		const opts: uPlot.Options = {
			width: chartDiv.offsetWidth,
			height: height,
			series: [
				{},
				{
					stroke: color,
					fill: color + '20',
					width: 2,
				}
			],
			axes: [
				{
					stroke: '#64748b',
					grid: { stroke: '#334155' },
				},
				{
					stroke: '#64748b',
					grid: { stroke: '#334155' },
				}
			],
			scales: {
				x: {
					time: true,
				}
			},
			legend: {
				show: false
			}
		};
		
		chart = new uPlot(opts, [
			data.timestamps,
			data.values
		], chartDiv);
		
		return () => {
			if (chart) chart.destroy();
		};
	});
</script>

<div>
	{#if title}
		<h3 class="text-h3 mb-2">{title}</h3>
	{/if}
	<div bind:this={chartDiv}></div>
</div>
