const layoutSettings = {
    1: 'w-1/12',
    2: 'w-1/6',
    3: 'w-1/4',
    4: 'w-1/3',
    5: 'w-5/12',
    6: 'w-[1/2]',
    7: 'w-7/12',
    8: 'w-2/3',
    9: 'w-3/4',
    10: 'w-10/12',
    11: 'w-11/12',
    12: 'w-full',
}

const getLayout = (layout: Record<string, 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12>): string => {
    let classes = '';
    Object.keys(layout).forEach((key: string) => {
        const grid = layoutSettings[layout[key]];
        classes += ` ${grid}`;
    });
    return classes;
}
export { getLayout }