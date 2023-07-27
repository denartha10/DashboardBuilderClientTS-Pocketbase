// checkValueEquality function 
// signature (val1: any, val2: any): boolean
const checkValueEquality = (val1: unknown, val2: unknown): boolean => {    
    return JSON.stringify(val1) === JSON.stringify(val2);
}

// safeAwait functio, signature <T>(promise: Promise<T>): Promise<[Error | null , T, null]>
const safeAwait = async <T>(promise: Promise<T>): Promise<[Error | null, T | null]> => {
    try {
        const data: T = await promise;
        return [null, data];
    } catch (error) {
        return [error as Error, null];
    }
}

export { checkValueEquality, safeAwait };