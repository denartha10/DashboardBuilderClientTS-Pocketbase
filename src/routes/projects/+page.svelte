<script lang="ts">
	import Icon from '@iconify/svelte';
	import { ProjectCard, DeleteProjectModal, UpdateProjectModal, CreateProjectModal } from '$lib';

	let openDelete: boolean = false;
	let openCreate: boolean = false;
	let openEdit: boolean = false;
	let currentlySelected: App.Project | undefined = undefined;

	export let data;
</script>

<div class="grid grid-cols-3">
	{#each data.projectList || [] as project}
		<ProjectCard
			{project}
			on:delete={() => {
				currentlySelected = project;
				openDelete = true;
			}}
			on:edit={() => {
				currentlySelected = project;
				openEdit = true;
			}}
		/>

        {/each}
		<div>
			<button
				data-tooltip="Create a new project"
				data-placement="right"
				class="secondary"
				on:click={() => {
					openCreate = true;
				}}
			>
                <Icon icon="mdi:plus" />
			</button>
		</div>
</div>

{#if data.deleteProjectForm !== undefined}
	<DeleteProjectModal
        {openDelete}
        {currentlySelected}
		formData={data.deleteProjectForm}
		on:deleteClose={() => {
			currentlySelected = undefined;
			openDelete = false;
		}}
	/>
{/if}


{#if data.createProjectForm !== undefined}
    <CreateProjectModal
        {openCreate}
        formData={data.createProjectForm}
        on:createClose={() => {
            openCreate = false;
        }}
    />
{/if}

{#if data.updateProjectForm !== undefined}
    <UpdateProjectModal
        {openEdit}
        {currentlySelected}
        formData={data.updateProjectForm}
        on:editClose={() => {
            currentlySelected = undefined;
            openEdit = false;
        }}
    />
{/if}
