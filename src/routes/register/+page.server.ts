import { redirect, type Actions, error } from '@sveltejs/kit';
import { registerSchema, safeAwait, clientResponseErrorToMessage } from '$lib';
import { message, superValidate } from 'sveltekit-superforms/client';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    if (locals.pb.authStore.isValid) {
        throw redirect(303, '/');
    }

    const form = await superValidate(registerSchema);
    return { form };
};

export const actions: Actions = {
    register: async ({ locals, request }) => {
        const form = await superValidate(request, registerSchema);

        if (!form.valid) {
            return message(form, { type: 'error', message: 'Invalid form' });
        }

        const registerAttempt = await safeAwait(locals.pb.collection('users').create({
            username: form.data.username,
            email: form.data.email,
            password: form.data.password,
            passwordConfirm: form.data.confirmPassword
        }));

        switch (registerAttempt[1]) {
            case null:
                const errorMessage = clientResponseErrorToMessage(registerAttempt[0]) ?? 'Unknown Error';
                return message(form, { type: 'error', message: errorMessage });
            default:
                throw redirect(303, '/login');
        }
	}
};
