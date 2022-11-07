<script>
	import { createNoise3D } from 'simplex-noise'
	import { onMount } from 'svelte'
	const noise2D = createNoise3D()
	let nodeWidth = 50
	let nodeHeight = 50
	let x = 0
	let y = 0
	let nodes = []
	let t = 0
	let last = 0
	let width = 0
	let height = 0

	$: x = Math.floor(width / nodeWidth)
	$: y = Math.floor(height / nodeHeight)
//	$: nodeWidth = width / 16
//	$: nodeHeight = nodeWidth
	$: nodes = x * y > 0 ? Array(x * y).fill() : []

	onMount(() => {
		requestAnimationFrame(fillNodes)
	})

	function fillNodes(time) {
		if (time - last < 20) return requestAnimationFrame(fillNodes)
		last = time
		nodes = nodes.map((node, i) => {
			return {
				r: Math.floor(noise2D(i % x, i / x, t / 128) * 10) + 17,
				g: Math.floor(noise2D(i % x, i / x, t / 128) * 100) + 17,
				b: Math.floor(noise2D(i % x, i / x, t / 128) * 200) + 28
			}
		})
		t = (t % 10000000) + 1
		requestAnimationFrame(fillNodes)
	}
</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />

<div class="container">
	{#each nodes as node, i}
		<div
			class="node"
			style="background-color: rgb(
  			{node?.r || 0},
  			{node?.g || 0},
  			{node?.b || 0},
  			0.2);
  			width: {nodeWidth}px;
  			height: {nodeHeight}px;
  			"
		/>
	{/each}
</div>

<style>
	.container {
		overflow: hidden;
		z-index: -100;
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
	}
	.node {
		margin: 0;
		padding: 0;
	}
</style>
