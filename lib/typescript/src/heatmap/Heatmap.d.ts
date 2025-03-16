import React from 'react';
export interface Activity {
    monthIndex: number;
    dayIndex: number;
    level: 1 | 2 | 3;
}
export type FontWeight = number | 'normal' | 'bold' | 'bolder' | 'lighter' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
declare const Heatmap: ({ year, activeDays, defaultCellColor, colorMap, cellSize, dayGap, monthlyGap, textPadding, fontWeight, getMonthAnnotation, showMonthAnnotation, monthlyAnnotationFontSize, monthlyAnnotationColor, cellBorderRadius, paddingHorizontal, paddingVertical, bottomPadding, showCurrentFullYear, showScrollBar, }: {
    year: number;
    activeDays?: Activity[] | undefined;
    defaultCellColor?: string | undefined;
    colorMap?: {
        [key: number]: string;
    } | undefined;
    cellSize?: number | undefined;
    dayGap?: number | undefined;
    monthlyGap?: number | undefined;
    textPadding?: number | undefined;
    fontWeight?: FontWeight | undefined;
    getMonthAnnotation?: ((monthIndex: number) => string) | undefined;
    showMonthAnnotation?: boolean | undefined;
    monthlyAnnotationFontSize?: number | undefined;
    monthlyAnnotationColor?: string | undefined;
    cellBorderRadius?: number | undefined;
    paddingHorizontal?: number | undefined;
    paddingVertical?: number | undefined;
    bottomPadding?: number | undefined;
    showCurrentFullYear?: boolean | undefined;
    showScrollBar?: boolean | undefined;
}) => React.JSX.Element;
export default Heatmap;
//# sourceMappingURL=Heatmap.d.ts.map