<script>
	import { onMount } from 'svelte'
	import seedrandom from 'seedrandom'
	export let data
	let highScore = data.highScore
	onMount(async () => {})
</script>

<div class="container">
	<a class="bigLink" href="/game">Start game</a>
	<a class="bigLink" href="/daily">Start daily challenge</a>
	<h2 class="highScoreTitle">Daily challenge highscores</h2>
	<ul>
		{#each highScore as score}
			<li>{score.name}: {score.score}</li>
		{/each}
	</ul>
</div>

<style>
	:root {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			'Open Sans', 'Helvetica Neue', sans-serif;
		background-color: #11111b;
		color: #cdd6f4;
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
	}
	li {
		padding: 0.2rem;
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
	}
	.highScoreTitle {
  	text-align: center;
	}
	@media screen and (min-width: 650px) {
	}
</style>
