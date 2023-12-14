<script>
	import { enhance } from '$app/forms'
	import { onMount } from 'svelte'
	import { fade, scale } from 'svelte/transition'
	import { tweened } from 'svelte/motion'
	import { elasticOut } from 'svelte/easing'
	import Fa from 'svelte-fa/src/fa.svelte'
	import { faHeart } from '@fortawesome/free-solid-svg-icons'
	import { faHeart as hollow } from '@fortawesome/free-regular-svg-icons'
	import gameChooser from '$lib/gameChooser'
	import Choice from '$lib/Choice.svelte'
	import { ratingGame } from '$lib/games/rating'
	import seedrandom from 'seedrandom'
	import axios from 'axios'

	export let dailySeed
	export let form
	export let type
	let game = []
	let clicked = false
	let score = 0
	let lost = false
	const maxLives = 3
	let lives = 3
	let title = ''
	let subText = ''
	let seed = ''
	let highScore = []
	let name = 'You'
	let topTen = false

	$: topTen = scoreIsTopTen(highScore)

	onMount(async () => {
		newGame(type)
	})

	async function fetchHighScore(newScore = 0) {
		const res = await axios.get(`${import.meta.env.VITE_SCOREURL}/score`)
		if (newScore > 0) {
			res.data.push({ name: 'You', score: newScore })
		}
		highScore = res.data
			.sort((a, b) => b.score - a.score)
			.slice(0, res.data.length > 9 ? 10 : res.data.length)
	}

	function scoreIsTopTen(highScore) {
		if (!highScore?.length) return false
		return highScore.length >= 10 ? score > highScore[9].score : true
	}

	async function nextGame() {
		game = []
		clicked = false
		const res = await gameChooser()()
		title = res.title
		subText = res.subText
		game = res.alternatives
	}

	function newGame(type) {
		lives = 3
		lost = false
		score = 0
		if (type === 'daily') {
			seedrandom(dailySeed, { global: true })
			seed = dailySeed
		} else {
			seed = generateSeed()
			seedrandom(seed, { global: true })
		}
		nextGame()
	}

	function generateSeed() {
		seedrandom('.', { global: false })
		return Math.random().toString(16).split('.')[1].slice(0, 8)
	}

	function handleClick(status) {
		if (clicked) {
			if (lost) return
			return nextGame()
		}
		if (!status) {
			reduceLives()
		} else if (!lost) {
			increaseScore()
		}
		if (lives < 1) {
			lost = true
			if (type === 'daily') {
				fetchHighScore(score)
			}
		}
		clicked = true
	}

	function handleNextClick({ target }) {
		if (target.nodeName !== 'IMG' && target.id !== 'overlay' && clicked && !lost) {
			nextGame()
		}
	}

	async function reduceLives() {
		lives = Math.max(lives - 1, 0)
		await shakeProgress.set(1)
		await shakeProgress.set(0)
		await shakeProgress.set(1)
		await shakeProgress.set(0)
		await shakeProgress.set(1)
		await shakeProgress.set(0)
		await shakeProgress.set(1)
		await shakeProgress.set(0)
		await progress.set(2)
		await progress.set(1)
	}

	async function increaseScore() {
		score += 1
		await scoreProgress.set(4)
		await scoreProgress.set(2)
	}

	function handleKeyPress({ key }) {}

	const scoreProgress = tweened(2, {
		duration: 1000,
		easing: elasticOut
	})

	const progress = tweened(1, {
		duration: 800,
		easing: elasticOut
	})

	const shakeProgress = tweened(0, {
		duration: 50,
		easing: elasticOut
	})
</script>

{#if seed === ''}
	<h2>Loading game</h2>
{:else if seed === 'no'}
	<div>
		<h1>You have already played today's daily challenge!</h1>
		<a href="/">return</a>
	</div>
{:else}
	<div
		on:click={(e) => handleNextClick(e)}
		on:keydown={handleNextClick}
		class="container"
		style="padding-right: {$shakeProgress}rem;"
	>
		<div class="header">
			<button class="home" onclick="location.href='/'">Home</button>
			<div class="livesContainer">
				<div class="livesBar">
					{#each Array(maxLives).fill() as _, i}
						<span>
							<Fa
								icon={i < lives ? faHeart : hollow}
								class="heart"
								scale={i === lives ? $progress : 1}
							/>
						</span>
					{/each}
				</div>
				{#if game.length}
					<span class="title">
						{#each title.split('/') as text, i}
							{#if i === 1}
								<span class="highlighted">{text}</span>
							{:else}
								{text}
							{/if}
						{/each}
					</span>
				{/if}
			</div>
			<div class="scoreContainer">
				<span class="score" style="font-size: {$scoreProgress}rem;">{score}</span>
			</div>
		</div>
		{#if game.length}
			<div class="choiceContainer">
				<Choice
					on:click={() => handleClick(game[0].winner)}
					picture={`https://image.tmdb.org/t/p/w500/${game[0].picture}`}
					{clicked}
					winner={game[0].winner}
					gameOver={game[0].gameOver}
					{subText}
				/>
				<Choice
					on:click={() => handleClick(game[1].winner)}
					picture={`https://image.tmdb.org/t/p/w500/${game[1].picture}`}
					{clicked}
					winner={game[1].winner}
					gameOver={game[1].gameOver}
					{subText}
				/>
			</div>
			{#if clicked && !lost}
				<p class="nextInfo">Click anywhere to continue</p>
			{/if}
			{#if lost}
				<div class="gameOverContainer">
					<div class="livesBar">
						<Fa icon={hollow} class="heart" />
						<Fa icon={hollow} class="heart" />
						<Fa icon={hollow} class="heart" />
					</div>
					<p class="scoreTitle">Your score</p>
					<p class="scoreBar">{score}</p>
					{#if type === 'daily'}
						<ul class="highscore">
							{#each highScore as score, i}
								<li class={`bold ${score.name === 'You' && 'you'}`}>
									{i + 1}.
									<span class="name">
										{#if score.name === 'You'}{name}{:else}{score.name}{/if}
									</span>
									<span class="highlighted bold">{score.score}</span>
								</li>
							{/each}
						</ul>
						{#if topTen && !form?.success}
							<form method="POST" action="?/score" use:enhance>
								<input name="name" bind:value={name} />
								<input style="display: none;" name="score" bind:value={score} />
								<input style="display: none;" name="seed" bind:value={seed} />
								<button class="submit">Submit</button>
								{#if form?.incorrect}<p>Invalid name!</p>{/if}
								{#if form?.missing}<p>Missing name!</p>{/if}
								{#if form?.error}<p>Something went wrong!</p>{/if}
							</form>
						{/if}
						<p>
							Thank you for playing daily challenge!
							<a href="/">Return</a>
						</p>
					{:else}
						<button class="button newGame" on:click={newGame}>New Game</button>
					{/if}
				</div>
			{/if}
		{:else}
			loading...
		{/if}
	</div>
{/if}

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
	}
	a:hover {
		color: #cba6f7;
	}
	input {
		color: #cdd6f4;
		background-color: #11111b;
		border: 0;
		border-radius: 0.8rem;
		padding: 0.5rem;
		font-size: 1rem;
		letter-spacing: 0.1rem;
	}
	ul {
		width: 100%;
	}
	li {
		padding: 0.2rem;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.header {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: #f38ba8;
		gap: 1rem;
		font-size: 1rem;
	}
	.livesContainer {
    order: 3;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}
	.livesBar {
		display: flex;
		flex-direction: row;
		justify-content: center;
		gap: 1rem;
	}
	.choiceContainer {
		display: flex;
		flex-direction: column;
	}
	.button {
		color: #f5c2e7;
		font-size: 1.5rem;
		letter-spacing: 0.1rem;
		padding: 0.5rem 3rem 0.5rem 3rem;
		background-color: #313244;
		border-radius: 0.5rem;
	}
	.submit {
		color: #f5c2e7;
		background-color: #11111b;
		border: 0;
		border-radius: 0.8rem;
		padding: 0.5rem;
		font-size: 1rem;
		letter-spacing: 0.1rem;
	}
	.newGame {
		background-color: #a6e3a1;
		color: #313244;
	}
	.title {
		color: #cdd6f4;
		text-align: center;
	}
	.scoreContainer {
    order: 2;
    display: flex;
    justify-content: center;
    align-items: center;
		padding: 1rem;
		height: 1rem;
		width: 3rem;
		border-radius: 0.8rem;
		background: #1e1e2e;
	}
	.score {
		color: #cba6f7;
		font-size: 0.5rem;
	}
	.scoreTitle {
		margin: 0.5rem 0 0.2rem 0;
	}
	.scoreBar {
		color: #cba6f7;
		font-size: 3rem;
		text-align: center;
		width: 100%;
		margin: 0 0 0.5rem 0;
	}
	.gameOverContainer {
		z-index: 100;
		position: absolute;
		top: 30%;
		background-color: #313244;
		border-radius: 0.8rem;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.seed {
		color: #f5c2e7;
		text-align: center;
	}
	.highlighted {
		color: #fab387;
	}
	.bold {
		font-weight: bold;
	}
	.highscore {
		list-style: none;
		margin-block-start: 0;
		padding: 0;
		margin-bottom: 0.3rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-content: center;
		letter-spacing: 0.1rem;
	}
	.home {
    order: 1; 
		font-size: 1rem;
		padding: 1rem;
		border-radius: 0.8rem;
		background: #1e1e2e;
		box-shadow: 5px 10px #22222b;
		color: #f5c2e7;
		text-decoration: none;
		width: 100%;
	}
	.home:hover {
		cursor: pointer;
		color: #cba6f7;
	}
	.name {
		width: 100%;
		margin-left: 1rem;
	}
	.you {
		color: #f38ba8;
	}
	@media screen and (min-width: 840px) {
  	.header {
  		width: 85%;
  		max-width: 1040px;
  		flex-direction: row;
  		justify-content: space-between;
  		align-content: center;
  		padding: 1rem;
  		color: #f38ba8;
  		gap: 1rem;
  		font-size: 2rem;
  	}
		.scoreContainer {
      order: 0;
  		padding: 1rem;
  		height: 3rem;
  		width: 5rem;
		}
		.choiceContainer {
			flex-direction: row;
		}
		.score {
  		font-size: 2rem;
		}
		.home {
      order: 0;
  		height: 5rem;
  		font-size: 1.5rem;
  		width: auto;
		}
		.livesContainer {
      order: 0;
		}
		.button {
			font-size: 2rem;
			letter-spacing: 0.2rem;
			padding: 1rem 5rem 1rem 5rem;
			border-radius: 0.5rem;
		}
		.nextInfo {
			margin-top: 0;
		}
	}
</style>
