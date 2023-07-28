<script lang="ts">
	//easier than the FormForm component as there is no nested array just an object of keys and primitive

	import type { SuperValidated } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms/client';
	import * as flashModule from 'sveltekit-flash-message/client';
	import type { infoComponentSchema } from '$lib';

	export let formData: SuperValidated<typeof infoComponentSchema>;

	const { form, errors, enhance, constraints } = superForm(formData, {
		id: 'infoForm',
		flashMessage: {
			module: flashModule
		},
		syncFlashMessage: true
	});
</script>

<form action="?/createComponent" method="POST" use:enhance>
	<fieldset>
		<label>
			Title
			<input
				type="text"
				name="title"
				bind:value={$form.title}
				required
				placeholder="Title"
				aria-invalid={$errors.title ? 'true' : undefined}
				{...$constraints.title}
			/>
			{#if $errors.title}<small id="invalid-helper">{$errors.title}</small>{/if}
		</label>
		
		<label>
			Description
			<input
				type="text"
				name="description"
				bind:value={$form.description}
				required
				placeholder="Description"
				aria-invalid={$errors.description ? 'true' : undefined}
				{...$constraints.description}
			/>
			{#if $errors.description}<small id="invalid-helper">{$errors.description}</small>{/if}
		</label>
	</fieldset>

	<input type="submit" value="Submit" />
</form>
