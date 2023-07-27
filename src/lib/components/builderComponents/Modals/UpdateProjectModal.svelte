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

    $: if(currentlySelected !== undefined) {
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

        {#if currentlySelected !== undefined}
            <form
                action="?/update"
                method="POST"
                use:enhance
                on:submit={() => {
                    closeEdit();
                }}
            >
                <input 
                    name="id" 
                    type="hidden" 
                    required 
                    aria-invalid={$errors.id ? 'true' : undefined} 
                    bind:value={$form.id} 
                    {...$constraints.id} 
                />

                <label for="name">Name</label>
                <input 
                    name="name" 
                    type="text" 
                    required 
                    aria-invalid={$errors.name ? 'true' : undefined} 
                    bind:value={$form.name} 
                    {...$constraints.name} 
                />

                <label for="datasourceurl">Datasource URL</label>
                <input 
                    name="datasourceurl" 
                    type="text" 
                    required 
                    aria-invalid={$errors.datasourceurl ? 'true' : undefined} 
                    bind:value={$form.datasourceurl} 
                    {...$constraints.datasourceurl} 
                />

                <label for="public">Public</label>
                <input 
                    name="public" 
                    type="checkbox" 
                    aria-invalid={$errors.public ? 'true' : undefined} 
                    bind:checked={$form.public} 
                    {...$constraints.public} 
                />

            </form>
            {/if}
            <br>
            <button type="button" class="secondary" on:click|preventDefault={closeEdit}
                >Cancel</button
            >
            <button type="submit">Update</button>
    </article>
</dialog>