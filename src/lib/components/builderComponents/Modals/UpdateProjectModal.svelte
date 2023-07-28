<script lang="ts">
	import type { SuperValidated } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms/client';
	import * as flashModule from 'sveltekit-flash-message/client';
	import type { updateProjectSchema } from '$lib';
	import { createEventDispatcher } from 'svelte';

	let dispatch = createEventDispatcher();

	const closeEdit = () => {
		dispatch('editClose');
	};

	export let formData: SuperValidated<typeof updateProjectSchema>;
	export let openEdit: boolean;
	export let currentlySelected: App.Project | undefined;

	const { form, errors, enhance, constraints } = superForm(formData, {
		flashMessage: {
			module: flashModule
		},
		syncFlashMessage: true
	});

	$: if (currentlySelected !== undefined) {
		$form.id = currentlySelected.id;
		$form.name = currentlySelected.name;
		$form.datasourceurl = currentlySelected.datasourceurl;
		$form.public = currentlySelected.public;
	}
</script>

<dialog open={openEdit}>
	<article>
		<header>
			<h2>Edit Project</h2>
		</header>

		<form
			action="?/update"
			method="POST"
			use:enhance
			on:submit={() => {
				closeEdit();
			}}
		>
			{#if currentlySelected !== undefined}
				<label>
					Name
					<input
						name="name"
						type="text"
						required
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
						type="text"
						required
						aria-invalid={$errors.datasourceurl ? 'true' : undefined}
						bind:value={$form.datasourceurl}
						{...$constraints.datasourceurl}
					/>
					{#if $errors.datasourceurl}<small id="invalid-helper">{$errors.datasourceurl}</small>{/if}
				</label>

				<label>
					Public
					<input
						name="public"
						type="checkbox"
						aria-invalid={$errors.public ? 'true' : undefined}
						bind:checked={$form.public}
					/>
					{#if $errors.public}<small id="invalid-helper">{$errors.public}</small>{/if}
				</label>
				<input
					name="id"
					type="hidden"
					required
					aria-invalid={$errors.id ? 'true' : undefined}
					bind:value={$form.id}
					{...$constraints.id}
				/>
			{/if}
			<br />
			<button type="submit">Update</button>
			<button type="button" class="secondary" on:click|preventDefault={closeEdit}>Cancel</button>
		</form>
	</article>
</dialog>
