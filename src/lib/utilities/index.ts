import type { ClientResponseError } from 'pocketbase';

// checkValueEquality function
// signature (val1: any, val2: any): boolean
const checkValueEquality = (val1: unknown, val2: unknown): boolean => {
	return JSON.stringify(val1) === JSON.stringify(val2);
};

// safeAwait functio, signature <T>(promise: Promise<T>): Promise<[Error | null , T, null]>
const safeAwait = async <T>(
	promise: Promise<T>
): Promise<[ClientResponseError, null] | [null, T]> => {
	try {
		const data: T = await promise;
		return [null, data];
	} catch (error) {
		return [error as ClientResponseError, null];
	}
};

const clientResponseErrorToMessage = (error: ClientResponseError): string => {
	if (Object.keys(error.response.data).length === 0) return 'Unknown Error';
	const responseData = Object.keys(error.response.data).map(
		(key) => error.response.data[key].message
	);
	return `${responseData.length} Error(s): ${responseData.join(', ')}`;
};

const serialiseNonPOJO = (obj: any): any => {
	return structuredClone(obj);
};

export { checkValueEquality, safeAwait, serialiseNonPOJO, clientResponseErrorToMessage };
