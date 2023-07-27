import { z } from 'zod';

// loginSchema an object with a username and password
const loginSchema = z.object({
	username: z.string(),
	password: z.string().min(8).max(50)
});

// registerSchema an object with a username, password, confirmPassword. uses a refine on the confirmPassword to make sure it matches the password
const registerSchema = z
	.object({
		username: z.string(),
		password: z.string().min(8).max(50),
		confirmPassword: z.string().min(8).max(50)
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword']
	});

// tableComponentSchem an object with title with min 1 and max 50 and table data key no constraints
const tableComponentSchema = z.object({
	title: z.string().min(1).max(50),
	tableData: z.string()
});

//infoComponentSchema an object with title with min 1 and a description with min 1
const infoComponentSchema = z.object({
	title: z.string().min(1),
	description: z.string().min(1)
});

// formComponentSchema an object with a key named "fields" that is an array of objects with a inputName and inputType both strings of min 1
const formComponentSchema = z.object({
	fields: z
		.object({
			inputName: z.string().min(1),
			inputType: z.string().min(1)
		})
		.array()
});

// delete project schema an object with id of positive int
const deleteProjectSchema = z.object({
    id: z.number().positive()
})

// create project schema an object with title of min 4 and max 50 and a datasourceurl of type url
const createProjectSchema = z.object({
    name: z.string().min(4).max(50),
    datasourceurl: z.string().url()
})

// update project schema is the same as create project schema but with an id of positive int and a public of boolean
const updateProjectSchema = z.object({
    id: z.number().positive(),
    name: z.string().min(4).max(50),
    datasourceurl: z.string().url(),
    public: z.boolean()
})

//export all schemas

export {
    loginSchema,
    registerSchema,
    tableComponentSchema,
    infoComponentSchema,
    formComponentSchema,
    deleteProjectSchema,
    createProjectSchema,
    updateProjectSchema
}
