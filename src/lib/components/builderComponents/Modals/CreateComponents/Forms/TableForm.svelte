<script lang="ts">
    //pretty much the same as the InfoForm component except a tableFormSchema obviously
    
    import type { SuperValidated } from 'sveltekit-superforms';
    import { superForm } from 'sveltekit-superforms';
    import * as flashModule from 'sveltekit-flash-message/client';
    import type { tableComponentSchema } from '$lib';

    export let formData: SuperValidated<typeof tableComponentSchema>;

    const { form, errors, enhance, constraints } = superForm(formData, {
        flashMessage: {
            module: flashModule
        },
        syncFlashMessage: true
    });
</script>

<!--
    This page has a form with an action to ?/addTable and a method of POST
    The form uses the enhance function
    The form has a fieldset which is not a grid
    It has an input of type text with the name of title and a bind:value of $form.title
    It has an input of type text with a name of tableDataKey and a bind:value of $form.tableDataKey
-->

<form action="?/addTable" method="POST" use:enhance>
    <fieldset>
        <input
            type="text"
            name="title"
            bind:value={$form.title}
            placeholder="Title"
            aria-invalid={$errors.title}
            {...$constraints.title}
        />
        <input
            type="text"
            name="tableDataKey"
            bind:value={$form.tableDataKey}
            placeholder="Table Data Key"
            aria-invalid={$errors.tableDataKey}
            {...$constraints.tableDataKey}
        />
    </fieldset>

    <input type="submit" value="Submit" />

</form>