// See https://kit.svelte.dev/docs/types#app

import type { HTMLInputTypeAttribute } from "svelte/elements";
import type { SuperValidated } from "sveltekit-superforms";
import type { AnyZodObject, z } from "zod";
import type { ConstructorOfATypedSvelteComponent } from "./types";
import { tableComponentSchema, infoComponentSchema, formComponentSchema } from "$lib";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		type Maybe<T> = [Error | null, T | null]

		//superforms message syncync
		type Message = {
			type: 'success' | 'error';
			message: string;
		}

		interface User {
			id: number;
			name: string;
			userAuthToken: string;
			passwordHash: string;
			createAt: string;
			updateAt: string;
		}

		interface SelectField {
			label: string;
			name: string;
			type: 'select';
			options: string[];
			required?: boolean;
		}

		interface InputField {
			label: string;
			name: string;
			type: Exclude<HTMLInputTypeAttribute, 'select'>;
			required?: boolean;
		}

		type GeneratedFormFieldInputs = SelectField | InputField;

		interface Project {
			id: number;
			name: string;
			author: User.id;
			public: boolean;
			datasourceurl: string;
			address?: string;
		}

		interface TableComponent {
			id: number;
			project: Project['id'];
			type: 'table';
			props: z.infer<typeof tableComponentSchema>;
		}

		interface InfoComponent {
			id: number;
			project: Project['id'];
			type: 'info';
			props: z.infer<typeof infoComponentSchema>;
		}

		interface FormComponent {
			id: number;
			project: Project['id'];
			type: 'form';
			props: z.infer<typeof formComponentSchema>;
		}

		type Components = TableComponent | InfoComponent | FormComponent;

		interface PageData {
			form?: SuperValidated;
			formObject?: Record<string, SuperValidated>;
			flash?: Message;
			user?: User;
			component?: Components;
			project?: Project;
			userList?: User[];
			componentList?: Components[];
			projectList?: Project[];
		}

		interface ComponentFormProps {
			[title: string]: {
				component: ConstructorOfATypedSvelteComponent;
				form: ConstructorOfATypedSvelteComponent;
				schema: AnyZodObject
			}
		}

		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
