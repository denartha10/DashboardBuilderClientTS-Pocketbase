<script lang="ts">
	import type { SuperValidated } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms/client';
	import * as flashModule from 'sveltekit-flash-message/client';
	import type { formComponentSchema } from '$lib';

	const FormTypeOptions = [
		'checkbox',
		'color',
		'date',
		'datetime-local',
		'email',
		'month',
		'number',
		'password',
		'radio',
		'range',
		'search',
		'tel',
		'text',
		'time',
		'url',
		'week'
	];

	export let formData: SuperValidated<typeof formComponentSchema>;

	const { form, errors, enhance, constraints } = superForm(formData, {
		dataType: 'json',
		flashMessage: {
			module: flashModule
		},
		syncFlashMessage: true
	});
</script>

<form action="?/addForm" method="POST" use:enhance>
	{#each $form.field as _, i}
		<!-- add fieldset-->

		<fieldset class="grid">
			<!-- add select field for inputType field-->

			<select
				name="inputType"
				bind:value={$form.field[i].inputType}
				placeholder="Select Type"
				aria-invalid={$errors.field?.[i].inputType ? 'true' : undefined}
				{...$constraints.field?.inputType}
			>
				{#each FormTypeOptions as option}
					<option value={option}>{option}</option>
				{/each}
			</select>

			<!-- add text input for inputName field-->

			<input
				type="text"
				name="inputName"
				bind:value={$form.field[i].inputName}
				placeholder="Input Name"
				aria-invalid={$errors.field?.[i].inputName ? 'true' : undefined}
				{...$constraints.field?.inputName}
			/>

			<!-- add button to remove a form field using filter on the $form store-->

			<button
				type="button"
				on:click={() => {
					$form.field = $form.field.filter((_, index) => index !== i);
				}}>Remove</button
			>
		</fieldset>
	{/each}

	<!-- add an input of type button to add an extra fiel tot he $form store field array using [...var, var] syntax and object on inputName and inputType but empyt strings as their values-->

	<input
		type="button"
		on:click={() => {
			$form.field = [...$form.field, { inputName: '', inputType: '' }];
		}}
		value="+"
	/>

	<!-- add submit button-->

	<input type="submit" value="Submit" />
</form>
