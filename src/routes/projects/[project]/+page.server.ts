// TODO: #1 Add Component Editing Endpoint

import {
	safeAwait,
	serialiseNonPOJO,
	infoComponentSchema,
	tableComponentSchema,
	formComponentSchema
} from '$lib';
import { message, superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, params, url }) => {
	const createTableForm = await superValidate(tableComponentSchema);
	const createInfoForm = await superValidate(infoComponentSchema);
	const createFormForm = await superValidate(formComponentSchema);

	const componentFetch = await safeAwait(
		locals.pb.collection('components').getFullList<App.Components>({
			filter: `project = "${params.project}"`,
			sort: '-created'
		})
	).then((r) => serialiseNonPOJO(r));

	const projectFetch = await safeAwait(
		locals.pb.collection('projects').getOne<App.Project>(params.project)
	).then((r) => serialiseNonPOJO(r));

	switch (componentFetch[1] || projectFetch[1]) {
		case null:
			return {
				flash: { type: 'error', message: 'An error occurred while loading the project editor' }
			};
		default:
			const fetchData = await safeAwait(fetch(projectFetch[1].datasourceurl + url.search));
			const data = fetchData[1] ? await fetchData[1].json() : undefined;
			return {
				componentList: componentFetch[1],
				project: projectFetch[1],
				formObject: {
					info: createInfoForm,
					table: createTableForm,
					form: createFormForm
				},
				data
			};
	}
};

export const actions: Actions = {
	createComponent: async ({ locals, request, params }) => {
		const form = await request.formData();
		const __superform_id = form.get('__superform_id');

		const idSchemaMap = {
			infoForm: infoComponentSchema,
			tableForm: tableComponentSchema,
			formForm: formComponentSchema
		};

		if (!__superform_id === (null || undefined))
			return {
				flash: { type: 'error', message: 'An error occurred while creating the component' }
			};

		switch (__superform_id) {
			case 'infoForm':
				const infoForm = await superValidate(form, idSchemaMap[__superform_id]);
				switch (infoForm.valid) {
					case false:
						return message(infoForm, {
							type: 'error',
							message: 'An error occurred while creating the component'
						});
					case true:
						const postAttempt = await safeAwait(
							locals.pb
								.collection('components')
								.create({ type: 'info', props: { ...infoForm.data }, project: params.project })
						);
						switch (postAttempt[1]) {
							case null:
								return message(infoForm, { type: 'error', message: 'Post attempt failed' });
							default:
								return message(infoForm, {
									type: 'success',
									message: 'Component created successfully'
								});
						}
				}
			case 'tableForm':
				const tableForm = await superValidate(form, idSchemaMap[__superform_id]);
				switch (tableForm.valid) {
					case false:
						return message(tableForm, {
							type: 'error',
							message: 'An error occurred while creating the component'
						});
					case true:
						const postAttempt = await safeAwait(
							locals.pb
								.collection('components')
								.create({ type: 'table', props: { ...tableForm.data }, project: params.project })
						);
						switch (postAttempt[1]) {
							case null:
								return message(tableForm, { type: 'error', message: 'Post attempt failed' });
							default:
								return message(tableForm, {
									type: 'success',
									message: 'Component created successfully'
								});
						}
				}
			case 'formForm':
				const formForm = await superValidate(form, idSchemaMap[__superform_id]);
				switch (formForm.valid) {
					case false:
						return message(formForm, {
							type: 'error',
							message: 'An error occurred while creating the component'
						});
					case true:
						const postAttempt = await safeAwait(
							locals.pb
								.collection('components')
								.create({ type: 'form', props: { ...formForm.data }, project: params.project })
						);
						switch (postAttempt[1]) {
							case null:
								return message(formForm, { type: 'error', message: 'Post attempt failed' });
							default:
								return message(formForm, {
									type: 'success',
									message: 'Component created successfully'
								});
						}
				}
		}
	},

	deleteComponent: async (event) => {
		const form = await event.request.formData();
		const id = form.get('id');

		if (id === null) return fail(400);

		const deleteAttempt = await safeAwait(
			event.locals.pb.collection('components').delete(id as string)
		);

		switch (deleteAttempt[1]) {
			case null:
				return fail(400);
		}
	}
};
