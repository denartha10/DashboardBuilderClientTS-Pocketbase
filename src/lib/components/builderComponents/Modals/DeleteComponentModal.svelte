<script lang="ts">
	import { enhance } from '$app/forms';
	import { createEventDispatcher } from 'svelte';

	let dispatch = createEventDispatcher();

	const closeDelete = () => {
		dispatch('deleteClose');
	};

	export let id: number;
	export let openDelete: boolean;
</script>

<dialog open={openDelete}>
	<article>
		<header>
			<h2>Delete Component</h2>
		</header>

		{#if id}
			<p>Are you sure you want to delete this component?</p>

			<footer>
				{#if id}
					<form
						action="?/deleteComponent"
						method="POST"
						use:enhance
						on:submit={() => {
							closeDelete();
						}}
					>
						<input name="id" type="hidden" bind:value={id} required />

						<button type="button" class="secondary" on:click|preventDefault={closeDelete}
							>Cancel</button
						>
						<button type="submit">Delete</button>
					</form>
				{/if}
			</footer>
		{/if}
	</article>
</dialog>
