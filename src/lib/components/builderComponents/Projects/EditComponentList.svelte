<script lang="ts">
	import { componentStore as options, DeleteComponentModal } from '$lib';
	export let components: App.Components[];
	export let editMode: boolean = false;

	let componentId: number | undefined = undefined;
	let openDelete: boolean = false;

	const editablePropString = components.map((c) => JSON.stringify(c.props, null, 2));

	$: propList = editablePropString.map((p) => {
		try {
			return JSON.parse(p);
		} catch (e) {
			return null;
		}
	});
</script>

{#each components as component, i}
	<br />
	{#if propList[i] !== null}
		<svelte:component this={$options[component.type].component} {...component.props} />
	{:else}
		<p>Invalid JSON</p>
	{/if}
	<br />
	{#if editMode}
		<details>
			<summary>{component.type} props</summary>
			<textarea contenteditable bind:value={editablePropString[i]} />
			<button
				on:click|preventDefault={() => {
					componentId = component.id;
					openDelete = true;
				}}
			>
				Delete
			</button>
		</details>
	{/if}
	<br>
{/each}

{#if componentId !== undefined}
	<DeleteComponentModal
		bind:id={componentId}
		bind:openDelete
		on:deleteClose={() => {
			componentId = undefined;
			openDelete = false;
		}}
	/>
{/if}
