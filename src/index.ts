import memoize from 'fast-memoize';
function sum (number1: number, number2: number): number {
    return number1 + number2;
}
const memoizedFn = memoize(sum);
const result = memoizedFn(1, 5);
console.log(result);

/**
 * It is only an example that the typescript allows, but a store can't be defined in this way
 * Compiler throws error: TypeError: options.cache.create is not a function
 */
/*
memoize(sum, {
    cache: {
        get(key: string): number { return 5 },
        set(key: string, value: number) {},
        has(key: string) {return true;}
    }
})
*/

/**
 * With the new typedefinitions the cache is working.
 * The fix is in my forked fast-memoize.js repository in typings-cache branch.
 */
/*
memoize(sum, {
    cache: {
        create:() => {
            const store: { [key: string]: number} = {};
            return {
                get(key: string): number { 
                    return store[key];
                },
                set(key: string, value: number) {
                    store[key] = value;
                },
                has(key: string) {
                    return (key in store);
                }
            }   
        }  
    }
})
*/