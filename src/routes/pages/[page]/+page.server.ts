import { safeAwait, serialiseNonPOJO } from '$lib';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	const componentFetch = await safeAwait(
		locals.pb.collection('components').getFullList<App.Components>({
			filter: `project.name = "${params.page}"`,
			sort: '-created'
		})
	).then((r) => serialiseNonPOJO(r));

	switch (componentFetch[1]) {
		case null:
			return { flash: { type: 'error', message: 'An error occurred while loading the page' } };
		default:
			return { componentList: componentFetch[1] };
	}
};
