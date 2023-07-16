<script lang="ts">
	import { onMount } from 'svelte';
	import { animate } from 'motion';
	import { interpolate } from '@siluat/flubber';
	import { tweened } from 'svelte/motion';
	import { slide } from 'svelte/transition';

	type Gate = 'AND' | 'NOR' | 'OR' | 'NOT';

	const paths: any = {
		square: {
			color: '#3b82f6',
			d: 'M0,0 L100,0 L100,100 L0,100 L0,0 Z'
		},
		triangle: {
			color: '#22c55e',
			d: 'M50,0 L100,100 L0,100 L50,0 Z'
		},
		circle: {
			color: '#ef4444',
			d: 'm50,0 a50,50,0,0,0,0,100 a-50,-50,0,0,0,0,-100 z'
		},
		diamond: {
			color: '#a855f7',
			d: 'M50,0 L100,50 L50,100 L0,50 L50,0 Z'
		}
	};

	const timeLine = [paths.square, paths.circle, paths.triangle, paths.diamond];
	const speed = tweened(0.5, { duration: 5000 });

	let timeLineCounter = 0;
	let pathEl: SVGPathElement;
	let currentPath = timeLine[timeLineCounter];
	let stop: boolean = false;
	let playing: boolean = false;
	export let target: Gate = 'NOT';
	let gates: any = {
		AND: 0,
		NOT: 1,
		OR: 2,
		NOR: 3
	};

	$: transition.duration = $speed;

	const transition = { duration: $speed };

	function playAnimation() {
		timeLineCounter = timeLineCounter === timeLine.length - 1 ? 0 : timeLineCounter + 1;
		currentPath = timeLine[timeLineCounter];

		const mixPaths = interpolate(pathEl.getAttribute('d') as string, currentPath.d, {
			maxSegmentLength: 0.1
		});

		animate(pathEl, { fill: currentPath.color }, transition);
		animate((progress) => pathEl.setAttribute('d', mixPaths(progress)), {
			...transition,
			easing: 'ease'
		}).finished.then(() => {
			if (stop && timeLineCounter == gates[target]) {
				toggle = true;
				return;
			}
			playAnimation();
		});
	}

	onMount(() => {
		pathEl.style.fill = currentPath.color;
		pathEl.setAttribute('d', currentPath.d);
		playAnimation();
	});

	let toggle = false;
</script>

<div class="flex flex-col justify-center gap-2">
	{#if !playing}
		<p class="text-center text-slate-400" transition:slide>กดที่เรขาคณิตเพื่อเริ่มสุ่ม</p>
	{/if}
	<button
		disabled={playing}
		on:click={async () => {
			playing = true;
			await speed.set(0.1);
			setTimeout(async () => {
				await speed.set(0.25);
				stop = true;
			}, 2000);
		}}
	>
		<svg class={`p-4 w-96 h-96 ${!playing && 'active:scale-95'} transition`} viewBox="0 0 100 100">
			<path bind:this={pathEl} />
		</svg>
	</button>
	{#if toggle}
		<p class="text-2xl text-center" transition:slide>
			คุณได้ gate
			<span
				class={`text-3xl font-bold ${
					target === 'NOT'
						? 'text-red-500'
						: target === 'OR'
						? 'text-green-500'
						: target === 'AND'
						? 'text-blue-500'
						: 'text-purple-500'
				}`}
			>
				{target}
			</span>
		</p>
		<a href={`/${target.toLowerCase()}`} class="text-center text-blue-500 underline"
			>กดเพื่อดูเพื่อน ๆ ใน Gate ของคุณ</a
		>
	{/if}
	<!-- <p class="text-slate-300">{transition.duration}</p> -->
</div>
