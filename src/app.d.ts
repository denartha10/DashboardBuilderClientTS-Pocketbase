// See https://kit.svelte.dev/docs/types#app

import type { HTMLInputTypeAttribute } from 'svelte/elements';
import type { SuperValidated } from 'sveltekit-superforms';
import type { AnyZodObject, z } from 'zod';
import type { ConstructorOfATypedSvelteComponent } from './types';
import { tableComponentSchema, infoComponentSchema, formComponentSchema } from '$lib';
import type { Record } from 'pocketbase';
import type Pocketbase from 'pocketbase';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		type Maybe<T> = [Error, null] |  [null, T];

		//superforms message syncync
		type Message = {
			type: 'success' | 'error';
			message: string;
		};

		type TYear = `${number}${number}${number}${number}`;
		type TMonth = `${number}${number}`;
		type TDay = `${number}${number}`;
		type TDate = `${TYear}-${TMonth}-${TDay}`;

		type THour = `${number}${number}`;
		type TMinute = `${number}${number}`;
		type TSecond = `${number}${number}`;
		type TMillisecond = `${number}${number}${number}`;
		type TTime = `${THour}:${TMinute}:${TSecond}.${TMillisecond}`;

		type TDateTime = `${TDate} ${TTime}Z`;

		interface User {
			collectionId: string;
			collectionName: string;
			created: TDateTime;
			email: 'niall.mahon1999@gmail.com';
			emailVisibility: boolean;
			id: string;
			name: string;
			updated: TDateTime;
			username: string;
			verified: boolean;
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
			author: string;
			collectionId: string;
			collectionName: string;
			created: TDateTime;
			datasourceurl: string;
			id: string;
			name: string;
			public: boolean;
			updated: TDateTime;
			expand: User | {};
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
			data?: object | undefined;
		}

		interface ActtionData{
			flash?: Message;
		}

		interface ComponentFormProps {
			[title: string]: {
				component: ConstructorOfATypedSvelteComponent;
				form: ConstructorOfATypedSvelteComponent;
				schema: AnyZodObject;
			};
		}

		interface Locals {
			pb: Pocketbase;
			user: User | undefined;
		}

		// interface Platform {}
	}
}

export {};
