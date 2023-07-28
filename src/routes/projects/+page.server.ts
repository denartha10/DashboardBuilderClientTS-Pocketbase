import { safeAwait, createProjectSchema, deleteProjectSchema, updateProjectSchema, serialiseNonPOJO, clientResponseErrorToMessage } from "$lib";
import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { message, superValidate } from "sveltekit-superforms/client";

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.pb.authStore.isValid) {
        throw redirect(303, "/login");
    }

    // create form for each imported schema
    const createProjectForm = await superValidate(createProjectSchema)
    const updateProjectForm = await superValidate(updateProjectSchema)
    const deleteProjectForm = await superValidate(deleteProjectSchema)

    const projectList = await safeAwait(locals.pb.collection('projects').getFullList<App.Project>({
        sort: '-created'
    })).then(r => serialiseNonPOJO(r))

    switch (projectList[1]) {
        case null:
            return { flash: { type: 'error', message: 'An error occurred while loading the project list.' } }
        default:
            return {
                projectList: projectList[1],
                flash: { type: 'success', message: 'Project list loaded.'},
                createProjectForm,
                updateProjectForm,
                deleteProjectForm
            }
    }
}

export const actions: Actions = {
    create:async ({locals, request}) => {
        const createProjectForm = await superValidate(request, createProjectSchema)

        if (!createProjectForm.valid) {
            return message(createProjectForm ,{ type: 'error', message: 'Invalid form data.' })
        }

        const project = await safeAwait(locals.pb.collection('projects').create<App.Project>({
            name: createProjectForm.data.name,
            datasourceurl: createProjectForm.data.datasourceurl,
            author: (locals.user as App.User).id
        }))

        switch (project[1]) {
            case null:
                const errorMessage = clientResponseErrorToMessage(project[0]) ?? 'Unknown Error while creating project.'
                return message(createProjectForm, { type: 'error', message: errorMessage })
            default:
                return message(createProjectForm, { type: 'success', message: 'Project created successfully' })
        }
    },

    update: async ({ locals, request }) => {
        const updateProjectForm = await superValidate(request, updateProjectSchema)

        if (!updateProjectForm.valid) {
            return message(updateProjectForm, { type: 'error', message: 'Invalid form data.' })
        }

        const projectUpdate = await safeAwait(locals.pb.collection('projects').update<App.Project>(updateProjectForm.data.id, {
            name: updateProjectForm.data.name,
            datasourceurl: updateProjectForm.data.datasourceurl,
            public: updateProjectForm.data.public
        }))

        switch (projectUpdate[1]) {
            case null:
                const errorMessage = clientResponseErrorToMessage(projectUpdate[0]) ?? 'Unknown Error while updating project.'
                return message(updateProjectForm, { type: 'error', message: errorMessage })
            default:
                return message(updateProjectForm, { type: 'success', message: 'Project updated successfully' })
        }
    },

    //now similarly for delete
    delete: async ({ locals, request }) => {
        const deleteProjectForm = await superValidate(request, deleteProjectSchema)

        if (!deleteProjectForm.valid) {
            return message(deleteProjectForm, { type: 'error', message: 'Invalid form data.' })
        }

        const projectDelete = await safeAwait(locals.pb.collection('projects').delete(deleteProjectForm.data.id))

        switch (projectDelete[1]) {
            case null:
                const errorMessage = clientResponseErrorToMessage(projectDelete[0]) ?? 'Unknown Error while deleting project.'
                return message(deleteProjectForm, { type: 'error', message: errorMessage })
            default:
                return message(deleteProjectForm, { type: 'success', message: 'Project deleted successfully' })
        }
    }
};