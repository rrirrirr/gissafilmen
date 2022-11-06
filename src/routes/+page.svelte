<script>
	import { onMount } from 'svelte'
	import Background from '$lib/Background.svelte'
	export let data
	let highScore = data.highScore
	onMount(async () => {})
</script>

<div class="container">
<Background/>
	<a class="bigLink" href="/game">Start game</a>
	<a class="bigLink" href="/daily">Daily challenge</a>
	<div>
		<h2 class="highScoreTitle">Daily challenge high scores</h2>
		<ul>
			{#each highScore as score, i}
				<li class="score">
					{i + 1}. <span class="name">{score.name}</span>
					<span class="highlighted">{score.score}</span>
				</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	:root {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			'Open Sans', 'Helvetica Neue', sans-serif;
		background-color: #11111b;
		color: #cdd6f4;
	}
	h2 {
		color: #f38ba8;
	}
	a {
		color: #f5c2e7;
		text-decoration: none;
		text-align: center;
	}
	a:hover {
		color: #cba6f7;
	}
	ul {
		list-style: none;
		margin-block-start: 0;
		padding: 0;
		margin-bottom: 0.3rem;
		width: 100%;
	}
	li {
		padding: 0.2rem;
		width: 100%;
		text-align: left;
	}
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.bigLink {
		font-size: 3rem;
		padding: 1rem;
		border-radius: 0.8rem;
		margin: 1rem;
		background: #313244;
	}
	.highScoreTitle {
		text-align: center;
	}
	.highlighted {
		color: #fab387;
		font-weight: bold;
	}
	.name {
		width: 100%;
		margin-left: 1rem;
	}
	.score {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	@media screen and (min-width: 650px) {
	}
</style>
