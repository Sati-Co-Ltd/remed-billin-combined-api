const intersectArray = <T = any>(a: T[], b: T[]): T[] =>
    a.length < b.length
        ? a.filter((i) => b.includes(i))
        : b.filter((i) => a.includes(i));

export default intersectArray;
