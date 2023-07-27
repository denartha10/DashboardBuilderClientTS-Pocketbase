import Pocketbase from 'pocketbase';
import { serialiseNonPOJO } from '$lib'
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({event, resolve}) => {
    event.locals.pb = new Pocketbase('http://localhost:8090');
    event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

    switch (event.locals.pb.authStore.isValid) {
        case true:
            event.locals.user = serialiseNonPOJO(event.locals.pb.authStore.model);
            break;
        case false:
            event.locals.user = undefined;
            break;
    }

    const response = await resolve(event);

    response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: false }));

    return response;
}