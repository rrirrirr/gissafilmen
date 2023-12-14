<script>
	import { fade, scale } from 'svelte/transition'
	export let picture
	export let winner
	export let clicked
	export let gameOver
	export let subText
	let isHovered = false
</script>

<div
	on:click
	on:keydown
	class="choice"
	on:mouseenter={() => (isHovered = true)}
	on:mouseleave={() => (isHovered = false)}
>
	{#if isHovered }
		<div id="overlay" class={clicked ? '' : 'overlay'} />
	{/if}
	<img class="choicePic" src={picture} alt="Movie picture" />
	{#if clicked}
		<div class={`gameOver ${winner ? 'win' : 'lose'}`}>
			{#if winner}<span in:scale>Correct</span>{:else}<span in:fade>Wrong</span>{/if}
			<p class="result">{gameOver}</p>
			<p class="subText">{subText}</p>
		</div>
	{/if}
</div>

<style>
	.choice {
		margin: 1rem;
		color: #efefef;
		overflow: hidden;
		position: relative;
	}
	.choice:hover {
		cursor: pointer;
	}
	.overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: radial-gradient(circle, transparent 50%, #a6e3a1 100%);
	}
	.gameOver {
		z-index: 20;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-content: center;
		height: 100%;
		width: 100%;
		font-weight: bold;
		font-size: 2rem;
		text-align: center;
		color: #11111b;
		text-shadow: 0 0 10px #cdd6f4, 0 0 15px #ffffee;
	}
	.result {
		margin-bottom: 0;
	}
	.win {
		position: absolute;
		bottom: 0;
		height: 100%;
		width: 100%;
		background-color: #11aa0090;
	}
	.lose {
		position: absolute;
		bottom: 0;
		height: 100%;
		width: 100%;
		background-color: #aa110090;
	}
	.subText {
		margin-top: 0;
		font-size: 2rem;
		font-weight: normal;
	}
	.choicePic {
		max-width: 90vw;
		max-height: 35vh;
	}
	@media screen and (min-width: 650px) {
		.choicePic {
			max-width: 40vw;
			max-height: 75vh;
		}
		.subText {
			font-size: 2rem;
		}
		.gameOver {
			font-size: 4rem;
		}
	}
</style>
