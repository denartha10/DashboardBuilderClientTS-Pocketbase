<script lang="ts">
	import type { SuperValidated } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms/client';
	import * as flashModule from 'sveltekit-flash-message/client';
	import type { createProjectSchema } from '$lib';
	import { createEventDispatcher } from 'svelte';

	let dispatch = createEventDispatcher();

	const closeCreate = () => {
		dispatch('createClose');
	};

	export let formData: SuperValidated<typeof createProjectSchema>;
	export let openCreate: boolean;

	const { form, errors, enhance, constraints } = superForm(formData, {
		flashMessage: {
			module: flashModule
		},
		syncFlashMessage: true
	});
</script>

<dialog open={openCreate}>
	<article>
		<header>
			<h2>Create A New Project</h2>
		</header>
		<form
			action="?/create"
			method="POST"
			use:enhance
			on:submit={() => {
				closeCreate();
			}}
		>
			<label>
				Name
				<input
					name="name"
					type="text"
					required
					placeholder="Project Name"
					aria-invalid={$errors.name ? 'true' : undefined}
					bind:value={$form.name}
					{...$constraints.name}
				/>
				{#if $errors.name}<small id="invalid-helper">{$errors.name}</small>{/if}
			</label>
			<label>
				Datasource URL
				<input
					name="datasourceurl"
					type="url"
					required
					placeholder="Datasource full URL"
					aria-invalid={$errors.datasourceurl ? 'true' : undefined}
					bind:value={$form.datasourceurl}
					{...$constraints.datasourceurl}
				/>
				{#if $errors.datasourceurl}<small id="invalid-helper">{$errors.datasourceurl}</small>{/if}
			</label>
			<input type="submit" value="Create" />
			<input type="button" class="secondary" on:click|preventDefault={closeCreate} value="Close" />
		</form>
	</article>
</dialog>
