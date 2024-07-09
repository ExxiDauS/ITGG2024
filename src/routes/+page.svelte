<script lang="ts">
	import Stage1 from '$lib/components/Stage1.svelte';
	import { profileSchema } from '$lib/validation';
	import { animate, spring } from 'motion';
	import { onMount } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import { page } from '$app/stores';
	type Gate = 'AND' | 'NOR' | 'OR' | 'NOT';

	let squareEl: SVGElement;
	let circleEl: SVGElement;
	let triangleEl: SVGElement;
	let diamondEl: SVGElement;
	let showInput = false;
	let loading = false;
	let stage = 0;
	let studentId: string = '';
	let error: string | null;
	let gate: Gate = 'OR';

	const paths = {
		square: {
			color: '#3b82f6',
			d: 'M0,0 L100,0 L100,100 L0,100 L0,0 Z'
		},
		triangle: {
			color: '#22c55e',
			d: 'M50,0 L100,100 L0,100 L50,0 Z'
		},
		circle: {
			color: '#a855f7',
			d: 'm50,0 a50,50,0,0,0,0,100 a-50,-50,0,0,0,0,-100 z'
		},
		diamond: {
			color: '#ef4444',
			d: 'M50,0 L100,50 L50,100 L0,50 L50,0 Z'
		}
	};

	const loadingAnimation = async () => {
		loading = true;
		showInput = false;
		while (loading) {
			await animate(
				squareEl,
				{ transform: 'translateY(-1rem)' },
				{ duration: 0.1, easing: spring() }
			).finished;
			await animate(
				squareEl,
				{ transform: 'translateY(0rem)' },
				{ duration: 0.1, easing: spring() }
			).finished;
			await animate(
				circleEl,
				{ transform: 'translateY(-1rem)' },
				{ duration: 0.1, easing: spring() }
			).finished;
			await animate(
				circleEl,
				{ transform: 'translateY(0rem)' },
				{ duration: 0.1, easing: spring() }
			).finished;
			await animate(
				triangleEl,
				{ transform: 'translateY(-1rem)' },
				{ duration: 0.1, easing: spring() }
			).finished;
			await animate(
				triangleEl,
				{ transform: 'translateY(0rem)' },
				{ duration: 0.1, easing: spring() }
			).finished;
			await animate(
				diamondEl,
				{ transform: 'translateY(-1rem)' },
				{ duration: 0.1, easing: spring() }
			).finished;
			await animate(
				diamondEl,
				{ transform: 'translateY(0rem)' },
				{ duration: 0.1, easing: spring() }
			).finished;
		}
	};

	const submit = async () => {
		const validator = await profileSchema.safeParseAsync(studentId);
		if (!validator.success) {
			error = validator.error.flatten().formErrors[0];
			return;
		}

		loadingAnimation();

		const getUser = await fetch(`/api/${studentId}`);
		if (getUser.ok) {
			const user = await getUser.json();
			gate = user.gate;
			error = null;
			setTimeout(() => {
				stage = -1;
				setTimeout(() => {
					loading = false;
					stage = 1;
				}, 500);
			}, 2000);
		} else {
			const geterror = await getUser.json();
			error = geterror.message;
			setTimeout(() => {
				loading = false;
				showInput = true;
			}, 2000);
		}
	};

	onMount(async () => {
		await animate(squareEl, { scale: '0' }, { duration: 0 }).finished;
		await animate(circleEl, { scale: '0' }, { duration: 0 }).finished;
		await animate(triangleEl, { scale: '0' }, { duration: 0 }).finished;
		await animate(diamondEl, { scale: '0' }, { duration: 0 }).finished;
		await animate(squareEl, { scale: '1' }, { duration: 0.1, easing: spring() }).finished;
		await animate(circleEl, { scale: '1' }, { duration: 0.1, easing: spring() }).finished;
		await animate(triangleEl, { scale: '1' }, { duration: 0.1, easing: spring() }).finished;
		await animate(diamondEl, { scale: '1' }, { duration: 0.1, easing: spring() }).finished;
		showInput = true;
	});
</script>

<svelte:head>
	<title>ITGG 2024</title>
	<link rel="icon" href="/logo.png" />
	<meta property="og:image" content={`${$page.url.origin}/cover.png`} />
	<meta property="twitter:image" content={`${$page.url.origin}/cover.png`} />
</svelte:head>

<div class="w-full flex flex-col justify-center items-center space-y-2 font-prompt min-h-[100svh] overflow-hidden">
	{#if stage == 0}
		<div class="flex gap-2" transition:slide>
			<svg bind:this={squareEl} class="w-12 h-12" viewBox="0 0 100 100">
				<path fill={paths.square.color} d={paths.square.d} />
			</svg>
			<svg bind:this={circleEl} class="w-12 h-12" viewBox="0 0 100 100">
				<path fill={paths.circle.color} d={paths.circle.d} />
			</svg>
			<svg bind:this={triangleEl} class="w-12 h-12" viewBox="0 0 100 100">
				<path fill={paths.triangle.color} d={paths.triangle.d} />
			</svg>
			<svg bind:this={diamondEl} class="w-12 h-12" viewBox="0 0 100 100">
				<path fill={paths.diamond.color} d={paths.diamond.d} />
			</svg>
		</div>
		{#if showInput}
			<div transition:slide>
				<div class="flex gap-2">
					<input
						placeholder="รหัสนักศึกษา"
						bind:value={studentId}
						class="p-2 border shadow rounded"
						type="text"
						maxlength="8"
					/>
					<button
						on:click={submit}
						class="p-2 transition bg-blue-500 text-white border border-blue-600 shadow active:scale-95 shadow-blue-500 rounded hover:bg-blue-600 hover:border-blue-700 hover:shadow-blue-600"
						>GO</button
					>
				</div>
				{#if error}
					<p class="text-red-500 text-start" transition:slide>
						{error}
					</p>
				{/if}
			</div>
		{/if}
	{:else if stage == 1}
		<div transition:fade={{ duration: 1000 }}>
			<Stage1 target={gate} />
		</div>
	{/if}
</div>
