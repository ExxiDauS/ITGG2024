import type { RequestHandler } from './$types';
import prisma from '$lib/prisma';
import { json } from '@sveltejs/kit';
import { profileSchema } from '$lib/validation';

export const GET: RequestHandler = async ({ params }) => {
	const { studentID } = params;
	const validator = await profileSchema.safeParseAsync(studentID);
	if (!validator.success) {
		return json(
			{ message: 'Invalid Student ID', error: 'Invalid Student ID' },
			{
				status: 400,
				statusText: 'Invalid Student ID'
			}
		);
	}
	const student = await prisma.user.findUnique({
		where: {
			studentId: studentID
		},
		select: {
			studentId: true,
			name: true,
			gate: true
		}
	});
	if (!student) {
		return json(
			{ message: 'Student not found', error: 'Student not found' },
			{
				status: 404,
				statusText: 'Student not found'
			}
		);
	}
	return json(student);
};
