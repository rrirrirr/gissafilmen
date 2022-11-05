<script>
	import { fade, scale } from 'svelte/transition'
	export let picture
	export let winner
	export let clicked
	export let gameOver
	export let subText
</script>

<div on:click on:keydown class="choice">
	<img class="choicePic" src={picture} alt="1" />
	{#if clicked}
		<div class={`gameOver ${winner ? 'win' : 'lose'}`}>
			{#if winner}<span in:scale>Winner</span>{:else}<span in:fade>Loser</span>{/if}
			<p class="result">{gameOver}</p>
			<p class="subText">{subText}</p>
		</div>
	{/if}
</div>

<style>
	.choice {
		margin: 1rem;
		color: #efefef;
		position: relative;
	}
	.gameOver {
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
		max-height: 30vh;
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
