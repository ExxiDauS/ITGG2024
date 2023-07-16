<script lang="ts">
	import { page } from '$app/stores';
	const gate = ($page.params.gate as string).toUpperCase();
</script>

<svelte:head>
	<meta property="og:image" content={`${$page.url.origin}/cover-${gate}.png`} />
	<meta property="twitter:image" content={`${$page.url.origin}/cover-${gate}.png`} />
</svelte:head>

<slot />
