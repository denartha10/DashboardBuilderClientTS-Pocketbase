<script lang="ts">
    import {createEventDispatcher } from 'svelte';
    import type {SuperValidated} from 'sveltekit-superforms'

    //variables
    export let formFields: App.ComponentFormProps;
    export let formObject: Record<string, SuperValidated<any>>;
    export let isOpen: boolean = false;

    let currentlySelectedType: string | undefined = undefined;

    const dispatch = createEventDispatcher();

    //functions
    const close = () => {
        dispatch('close');
        currentlySelectedType = undefined;
    }
</script>

<dialog open={isOpen}>
    <article>
        <header>
            <h2>Create Component</h2>
        </header>

        <div>
            <select name="type" bind:value={currentlySelectedType}>
                {#each Object.keys(formFields) as field}
                    <option value={field}>{field}</option>
                {/each}
            </select>

            {#if currentlySelectedType !== undefined}
                <svelte:component this={formFields[currentlySelectedType].form} {FormData} />
            {/if}

            <input type="button" on:click|preventDefault={close} value="Cancel" />
        </div>
    </article>
</dialog>