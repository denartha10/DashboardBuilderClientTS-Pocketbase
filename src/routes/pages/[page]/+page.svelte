<script lang="ts">
	import {ComponentList} from '$lib';
    import type { PageData } from './$types';

	export let data: PageData;

	$: components = data.componentList ?? [];
</script>

<ComponentList {components} />
