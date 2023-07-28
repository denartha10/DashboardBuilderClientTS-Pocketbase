<script lang="ts">
	import {
		EditComponentList,
		componentStore as options,
		CreateComponentModal,
		AddComponentButton
	} from '$lib';
	
	export let data;

	let editMode: boolean = false;
	let addIsOpen: boolean = false;

	$: components = data.componentList ?? [];
	$: project = data.project;
</script>

<h4>{project?.name ?? 'Unamed'}</h4>

<label>
	Editor Mode
	<input type="checkbox" bind:checked={editMode} role="switch" />
</label>

<details>
	<summary>Data Returned From DataSourceURL</summary>
	{#if typeof data.data === 'object'}
		<textarea>{JSON.stringify(data.data, null, 2)}</textarea>
	{:else}
		<p>Could not display data as it is not JSON</p>
		<p>Value: {data.data}</p>
	{/if}
</details>

<hr>

<EditComponentList {editMode} {components} />

<br>

<AddComponentButton
	on:addOpen={() => {
		addIsOpen = true;
	}}
/>

{#if data.formObject !== undefined}
	<CreateComponentModal
		isOpen={addIsOpen}
		formFields={$options}
        formObject={data.formObject}
		on:close={() => {
            addIsOpen = false;
        }}
	/>
{/if}
