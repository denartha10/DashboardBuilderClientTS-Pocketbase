<script lang="ts">
    import type { SuperValidated } from 'sveltekit-superforms';
    import { superForm } from 'sveltekit-superforms/client';
    import * as flashModule from 'sveltekit-flash-message/client';
    import type { deleteProjectSchema } from '$lib';

    import { createEventDispatcher } from 'svelte';

    let dispatch = createEventDispatcher();

    const closeDelete = () => {
        dispatch('deleteClose');
    };

    export let formData: SuperValidated<typeof deleteProjectSchema>;
    export let openDelete: boolean;
    export let currentlySelected: App.Project | undefined;

    const { form, errors, enhance, constraints } = superForm(formData, {
        flashMessage: {
            module: flashModule
        },
        syncFlashMessage: true
    });

    $: if(currentlySelected) {
        $form.id = currentlySelected.id;
    }
</script>

<dialog open={openDelete}>
    <article>
        <header>
            <h2>Delete Project</h2>
        </header>

        {#if currentlySelected}
            <p>Are you sure you want to delete <strong>{currentlySelected.name}</strong>?</p>

            <footer>
                {#if currentlySelected}
                    <form
                        action="?/delete"
                        method="POST"
                        use:enhance
                        on:submit={() => {
                            closeDelete();
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

                        <button type="button" class="secondary" on:click|preventDefault={closeDelete}
                            >Cancel</button
                        >
                        <button type="submit">Delete</button>
                    </form>
                {/if}
            </footer>
        {/if}
    </article>
</dialog>