<script lang="ts">
	import '@picocss/pico';
	import '../app.css';
    import {page} from '$app/stores';
    import {getFlash} from 'sveltekit-flash-message/client';
    import toast, { Toaster } from 'svelte-french-toast'
    import type { PageData } from './$types';

    const flash = getFlash(page);
    export let data: PageData;
    
    $: segments = $page.url.pathname.split('/').filter(Boolean);
    flash.subscribe(($flash) => {
		console.log($flash)
        if(!$flash) return;

        $flash.type === 'success' ? toast.success($flash.message) : toast.error($flash.message);

        flash.set(undefined)
    })

	let username = data?.user?.username
</script>

<Toaster />

<header class="container">
	<nav>
		<ul>
			<li><strong>{username ?? 'Dashboard'}</strong></li>
		</ul>
		{#if username}
			<ul>
				<li>
					<form action="/logout" method="POST">
						<input type="submit" value="Logout" />
					</form>
				</li>
			</ul>
		{:else}
			<ul>
				<li>
					<form action="/login" method="GET">
						<input type="submit" value="Login" />
					</form>
				</li>
				<li>
					<form action="/register" method="GET">
						<input type="submit" value="Register" />
					</form>
				</li>
			</ul>
		{/if}
	</nav>

	<nav aria-label="breadcrumb">
		<ul>
			<li><a href="/">Home</a></li>
			{#each segments as segment, i (segment)}
				<li>
					<a href={`/${segments.slice(0, i + 1).join('/')}`} class="capitalise">{segment}</a>
				</li>
			{/each}
		</ul>
	</nav>
</header>

<main class="container">
	<slot />
</main>

<footer />
