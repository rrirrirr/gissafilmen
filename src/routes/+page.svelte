<script>
	import { onMount } from 'svelte'
	import Background from '$lib/Background.svelte'
	export let data
	let highScore = data.highScore
	onMount(async () => {})
</script>

<div class="container">
	<Background />
	<a class="bigLink" href="/game">Start Game</a>
	<a class="bigLink daily" href="/daily">Daily Challenge</a>
	<div>
		<h2 class="highScoreTitle">High Scores</h2>
		{#if highScore.length}
			<ul>
				{#each highScore as score, i}
					<li class="score">
						{i + 1}. <span class="name">{score.name}</span>
						<span class="highlighted">{score.score}</span>
					</li>
				{/each}
			</ul>
		{:else}
			<p>No high scores yet</p>
		{/if}
	</div>
</div>
<div class="attribution">
	<img src="/images/tmdb.svg" alt="TMDB logo" class="tmdblogo" />
	<span>This product uses the TMDB API but is not endorsed or certified by TMDB</span>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Lilita+One&display=swap');
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
		font-family: 'Lilita One', cursive;
		letter-spacing: 0.2rem;
		color: #a6e3a1;
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
	.tmdblogo {
		width: 3rem;
	}
	.attribution {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-content: flex-end;
		width: 90vw;
		position: fixed;
		gap: 0.5rem;
		margin: 0 1rem 0 1rem;
		bottom: 5px;
	}
	.attribution span {
  	align-self: flex-end;
	}
	.daily {
		color: #a6e3a1;
	}
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.bigLink {
		font-size: 2rem;
		padding: 1rem;
		border-radius: 0.8rem;
		margin: 1rem;
		background: #1e1e2e;
    box-shadow: 5px 10px #11111b;
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
		.bigLink {
			font-size: 3rem;
		}
	}
</style>
