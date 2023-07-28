<script lang="ts">
	import Icon from '@iconify/svelte';
	import { createEventDispatcher, onMount } from 'svelte';

	let dispatch = createEventDispatcher();
	export let project: App.Project;

	const editProject = (project: App.Project) => {
		dispatch('edit', { project });
	};

	const deleteProject = (project: App.Project) => {
		dispatch('delete', { project });
	};
</script>

<div>
	<article>
		<h3>{project.name}</h3>
		<a href={'/projects/'+project.id}>View Project</a>
		<footer>
			<button
				on:click|preventDefault={() => {
					deleteProject(project);
				}}
				data-tooltip="Delete Project"
				data-placement="bottom"
				class="outline secondary rounded"
			>
				<Icon icon="material-symbols:delete-rounded" />
			</button>
			<button
				on:click|preventDefault={() => {
					editProject(project);
				}}
				data-tooltip="Edit Project Settings"
				data-placement="bottom"
				class="outline secondary rounded"
			>
				<Icon icon="material-symbols:settings" />
			</button>
		</footer>
	</article>
</div>
