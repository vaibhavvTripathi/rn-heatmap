export declare const getYearDetails: (year: number) => Array<{
    totalDays: number;
    startDay: number;
}>;
export declare const getMonthOffsets: (yearDetails: {
    totalDays: number;
    startDay: number;
}[], cellSize: number, gap: number, monthlyGap: number) => number[];
export declare const getMonthFromMonthIndex: (index: number) => string;
//# sourceMappingURL=helpers.d.ts.map