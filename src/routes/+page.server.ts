import { safeAwait, serialiseNonPOJO } from '$lib';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    
    const projectList = await safeAwait(locals.pb.collection('projects').getFullList<App.Project>({
        sort: '-created'
    })).then(r => serialiseNonPOJO(r))

    switch (projectList[1]) {
        case null:
            return { flash: { type: 'error', message: 'An error occurred while loading the project list.' } }
        default:
            return { projectList: projectList[1] }
    }
};
