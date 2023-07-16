import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

type GateData = {
    studentId: string;
    name: string;
    gate: string;
}

export const load: PageServerLoad = (async ({params, fetch}) => {
    let { gate } = params;
    gate = gate.toUpperCase();
    let gateData: GateData[] = [];
    const getGate = await fetch(`/api/gate/${gate}`);
    if (getGate.ok) {
        gateData = await getGate.json();
    } else {
        throw redirect(302 ,'/')
    }

    return {
        gate,
        gateData
    };
});
