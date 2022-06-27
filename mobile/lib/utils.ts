export const flatten = (acc: Array<any>, curr: Array<any>) => {
    acc.push(...curr);
    return acc;
}