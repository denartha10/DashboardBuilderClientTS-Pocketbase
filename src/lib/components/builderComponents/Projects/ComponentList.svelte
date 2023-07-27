<script lang="ts">
    import { componentStore as options } from '$lib';
    export let components: App.Components[];
</script>

{#each components as component}
    <br/>
        <svelte:component this={$options[component.type].component} {...component.props}/>
    <br/>
{/each}