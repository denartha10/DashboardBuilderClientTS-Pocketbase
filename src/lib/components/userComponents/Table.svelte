<script lang="ts">
	import { page } from '$app/stores';

	export let title: string;
	export let tableDataKey: string;
	let tableData: [] | Array<Record<string, any>> = [];

	$: tableData = $page.data?.data?.[tableDataKey] ?? [];
</script>

<!--
    So we are going to add a h3 for the title then a br
    then we do an if check on if the table is not undefined
    if it is not undefined we check if it has a length greater than 0
    if it does we create a table
    we create it inside a figure tag and then table has a thead and tbody
    thead has tr and inside an each block we loop through Object.keys(tableData[0]) as key and then we create a th with the key with each th having a scope of col
    the tbody loops through tableData  as rows and then we create a tr and then we loop through Object.values(rows) as value and then we create a td with the value

    we close the if from tableData length check

    we add an else if check on if tableData is undefined
    if it is we create a h4 tag with the text "No data found"

    we add a p saying your tableDataKey might be invalid and there should always be atleast an empty list given to the tableData prop

-->

<h3>{title}</h3>

<br />

{#if tableData !== undefined}
	{#if tableData.length > 0}
		<figure>
			<table>
				<thead>
					<tr>
						{#each Object.keys(tableData[0]) as key}
							<th scope="col">{key}</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each tableData as rows}
						<tr>
							{#each Object.values(rows) as value}
								<td>{value}</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</figure>
	{:else}
		<h4>No data found</h4>
	{/if}
{:else}
	<h4>No data found</h4>
	<p>
		Your tableDataKey might be invalid and there should always be atleast an empty list given to the
		tableData prop
	</p>
{/if}
