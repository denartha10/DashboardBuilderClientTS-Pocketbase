<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import * as flashModule from 'sveltekit-flash-message/client';
	import type { PageData } from './$types';

	export let data: PageData;

	const { form, errors, constraints, enhance, message } = superForm(data.form, {
		flashMessage: {
			module: flashModule
		},
		syncFlashMessage: true
	});
</script>

<article>
	<form action="?/login" method="POST" use:enhance>
		<input
			type="text"
			name="username"
			bind:value={$form.username}
			aria-invalid={$errors.username || $message ? 'true' : undefined}
			{...$constraints.username}
		/>
		<input 
            type="password" 
            name="password" 
            bind:value={$form.password} 
            aria-invalid={$errors.password || $message ? 'true' : undefined} 
            {...$constraints.password}
        />
        <input type="submit" value="Login" />
	</form>
</article>
