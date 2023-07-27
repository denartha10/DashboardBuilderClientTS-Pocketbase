<script>
	export let data;
</script>

<hgroup>
	<h2>Welcome To The Dashboard Page Builder</h2>
</hgroup>

<br />

{#if data.user}
	<article>
		<a href="/projects">View Projects</a>
	</article>
{/if}

<br />

{#if data.projectList}
	<article>
		{#each data.projectList as project}
			<ul>
				<li><a href={'pages/' + project.name}>{project.name}</a></li>
			</ul>
		{/each}
	</article>
{/if}