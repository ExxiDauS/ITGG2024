import type { RequestHandler } from './$types';
import prisma from '$lib/prisma';
import type { Gate } from '@prisma/client';
import { json } from '@sveltejs/kit';
import { gateSchema } from '$lib/validation';

export const GET: RequestHandler = async ({ params }) => {
	let { gate } = params;
	gate = gate.toUpperCase();

	const validator = await gateSchema.safeParseAsync(gate);
	if (!validator.success) {
		return json(
			{ message: 'Invalid Gate', error: 'Invalid Gate' },
			{
				status: 400,
				statusText: 'Invalid Gate'
			}
		);
	}

	let allUserFromGate = await prisma.user.findMany({
		where: {
			gate: gate as Gate
		},
		select: {
			studentId: true,
			name: true,
			gate: true
		}
	});
	allUserFromGate = allUserFromGate.sort((a, b) => parseInt(a.studentId) - parseInt(b.studentId));
	return json(allUserFromGate);
};
