<script>
	import { onMount } from 'svelte'
	import Game from '$lib/Game.svelte'


	onMount(async () => {
	})

</script>
<main>
	<Game type={"standard"} form="" dailySeed="" />
</main>

<style>
	:root {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			'Open Sans', 'Helvetica Neue', sans-serif;
		background-color: #11111b;
		color: #cdd6f4;
	}
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	@media screen and (min-width: 650px) {
	}
</style>
