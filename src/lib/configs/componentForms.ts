// import Info, Table, tableComponentSchema, infoComponentSchema, formComponentSchema, TableForm, InfoForm, FormForm and Form from $lib
import { Info, Table, TableForm, tableComponentSchema, infoComponentSchema, formComponentSchema, InfoForm, FormForm, Form } from '$lib';

// import readable and type Readable from svelte/store
import { readable } from 'svelte/store';
import type { Readable } from 'svelte/store';


const componentStore: Readable<App.ComponentFormProps> = readable({
    info: {
        component: Info,
        form: InfoForm,
        schema: infoComponentSchema
    },
    table: {
        component: Table,
        form: TableForm,
        schema: tableComponentSchema
    },
    form: {
        component: Form,
        form: FormForm,
        schema: formComponentSchema
    }
});

// export componentStore
export {componentStore};