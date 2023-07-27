<script lang="ts">
	export let field: { inputName: string; inputType: string }[];
</script>

<form method="GET">
	{#each field as f}
		<label>
			{f.inputName}
			<input type={f.inputType} name={f.inputName} />
		</label>
	{/each}
    <input type="submit" value="Fetch" />
</form>
