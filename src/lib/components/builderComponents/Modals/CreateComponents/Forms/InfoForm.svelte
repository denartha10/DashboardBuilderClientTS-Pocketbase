<script lang="ts">
	//easier than the FormForm component as there is no nested array just an object of keys and primitive

	import type { SuperValidated } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms/client';
	import * as flashModule from 'sveltekit-flash-message/client';
	import type { infoComponentSchema } from '$lib';

	export let formData: SuperValidated<typeof infoComponentSchema>;

	const { form, errors, enhance, constraints } = superForm(formData, {
		flashMessage: {
			module: flashModule
		},
		syncFlashMessage: true
	});
</script>

<!--
    This page has a form with an action to ?/addInfo and a method of POST
    The form uses the enhance function
    The form has a fieldset which is not a grid
    It has an input of type text with a name of title and a bind:value of $form.title
    It has an input of type text with a name of description and a bind:value of $form.description
-->




<form action="?/addInfo" method="POST" use:enhance>
	<fieldset>
		<input
			type="text"
			name="title"
			bind:value={$form.title}
			placeholder="Title"
			aria-invalid={$errors.title ? 'true' : undefined}
			{...$constraints.title}
		/>
		<input
			type="text"
			name="description"
			bind:value={$form.description}
			placeholder="Description"
			aria-invalid={$errors.description ? 'true' : undefined}
			{...$constraints.description}
		/>
	</fieldset>

	<input type="submit" value="Submit" />
</form>
