<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const { gateData, gate } = data;

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
			color: '#ef4444',
			d: 'm50,0 a50,50,0,0,0,0,100 a-50,-50,0,0,0,0,-100 z'
		},
		diamond: {
			color: '#a855f7',
			d: 'M50,0 L100,50 L50,100 L0,50 L50,0 Z'
		}
	};

	const gates:any = {
		AND: {
			color: 'text-blue-500',
			path: paths.square
		},
		OR: {
			color: 'text-green-500',
			path: paths.triangle
		},
		NOT: {
			color: 'text-red-500',
			path: paths.circle
		},
		NOR: {
			color: 'text-purple-500',
			path: paths.diamond
		}
	};
</script>

<div class="flex flex-col p-4 gap-2 items-center font-prompt">
	<svg class="w-12 h-12" viewBox="0 0 100 100">
        <path fill={gates[gate]?.path?.color} d={gates[gate]?.path?.d} />
    </svg>
	<p class="text-3xl">รายชื่อเพื่อน ๆ Gate <span class={`font-bold text-4xl ${gates[gate].color}`}>{gate}</span></p>
	<div class="w-full md:w-8/12">
		<table class="w-full table-fixed">
			<thead class="border-b">
				<tr>
					<th class="p-1 w-4/12">Student Id</th>
					<th class="p-1 w-8/12">Name</th>
				</tr>
			</thead>
			<tbody>
				{#each gateData as { studentId, name }}
					<tr class="hover:bg-slate-100 border-b transition">
						<td class="p-1">{studentId}</td>
						<td class="p-1 overflow-auto">{name}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<!-- {#each gateData as { studentId, name }}
    <tr>
        <td class="border p-1">{studentId}</td>
        <td class="border p-1">{name}</td>
    </tr>
{/each} -->
