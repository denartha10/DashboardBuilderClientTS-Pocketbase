<script lang="ts">
    //pretty much the same as the InfoForm component except a tableFormSchema obviously
    
    import type { SuperValidated } from 'sveltekit-superforms';
    import { superForm } from 'sveltekit-superforms/client';
    import * as flashModule from 'sveltekit-flash-message/client';
    import type { tableComponentSchema } from '$lib';

    export let formData: SuperValidated<typeof tableComponentSchema>;

    const { form, errors, enhance, constraints } = superForm(formData, {
        id: 'tableForm',
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
            Table Data Key
            <input
                type="text"
                name="tableDataKey"
                bind:value={$form.tableDataKey}
                required
                placeholder="Table Data Key"
                aria-invalid={$errors.tableDataKey ? 'true' : undefined}
                {...$constraints.tableDataKey}
            />
            {#if $errors.tableDataKey}<small id="invalid-helper">{$errors.tableDataKey}</small>{/if}
        </label>
    </fieldset>

    <input type="submit" value="Submit" />

</form>