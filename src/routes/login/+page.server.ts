import { redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import { message, superValidate } from "sveltekit-superforms/client";
import { loginSchema, safeAwait } from "$lib";

export const load: PageServerLoad = async ({ locals }) => {

    if (locals.pb.authStore.isValid) {
        throw redirect(303, "/");
    }

    const form = await superValidate(loginSchema)
    return {form}
}

export const actions: Actions = {
    login: async ({request, locals}) => {
        const form = await superValidate(request, loginSchema)

        if (!form.valid) {
            return message(form, {type: 'error', message: 'Invalid form'})
        }

        const authAttempt = await safeAwait(locals.pb.collection('users').authWithPassword(form.data.username, form.data.password))
        switch (authAttempt[1]) {
            case null:
                console.error(authAttempt[0])
                return message(form, { type: 'error', message: 'Invalid username or password' })
            default:
                throw redirect(303, "/")
        }
    }
}

