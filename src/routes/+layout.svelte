<script>
	import '../app.postcss';
	import { page } from '$app/stores';
</script>

<svelte:head>
	<meta name="title" content="ITGG 2024" />
	<meta name="description" content="" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={$page.url.origin} />
	<meta property="og:title" content="ITGG 2024" />
	<meta property="og:description" content="" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={$page.url.origin} />
	<meta property="twitter:title" content="ITGG 2024" />
	<meta property="twitter:description" content="" />
</svelte:head>

<!-- <div class="absolute bottom-2 right-2 text-slate-50 select-none">Thank you to tong.k for this website</div> -->

<slot />
