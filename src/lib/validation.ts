import * as zod from 'zod';

export const profileSchema = zod.string().length(8, {
	message: 'Invalid Student ID'
});

export const gateSchema = zod.enum(['AND', 'OR', 'NOR', 'NOT'], {
	invalid_type_error: 'Invalid Gate'
});
