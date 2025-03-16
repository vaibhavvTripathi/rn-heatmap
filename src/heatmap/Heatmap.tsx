import React, {useMemo} from 'react';
import Svg, {Rect, Text} from 'react-native-svg';

import {ScrollView} from 'react-native';
import {
  getMonthFromMonthIndex,
  getMonthOffsets,
  getYearDetails,
} from './helpers';

export interface Activity {
  monthIndex: number;
  dayIndex: number;
  level: 1 | 2 | 3;
}
export type FontWeight =
  | number
  | 'normal'
  | 'bold'
  | 'bolder'
  | 'lighter'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';
const Heatmap = ({
  year,
  activeDays = [],
  defaultCellColor = '#161b22',
  colorMap = {
    1: '#0e4429', // Light green
    2: '#006d32', // Medium green
    3: '#26a641', // Dark green
  },
  cellSize = 12,
  dayGap = 6,
  monthlyGap = 30,
  textPadding = 10,
  fontWeight = 'normal',
  getMonthAnnotation = getMonthFromMonthIndex,
  showMonthAnnotation = true,
  monthlyAnnotationFontSize = 10,
  monthlyAnnotationColor = 'white',
  cellBorderRadius = 2,
  paddingHorizontal = 10,
  paddingVertical = 0,
  bottomPadding = 10,
  showCurrentFullYear = false,
  showScrollBar = false,
}: {
  year: number;
  activeDays?: Array<Activity>;
  defaultCellColor?: string;
  colorMap?: {[key: number]: string};
  cellSize?: number;
  dayGap?: number;
  monthlyGap?: number;
  textPadding?: number;
  fontWeight?: FontWeight;
  getMonthAnnotation?: (monthIndex: number) => string;
  showMonthAnnotation?: boolean;
  monthlyAnnotationFontSize?: number;
  monthlyAnnotationColor?: string;
  cellBorderRadius?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  bottomPadding?: number;
  showCurrentFullYear?: boolean;
  showScrollBar?: boolean;
}) => {
  const yearDetails = useMemo(() => getYearDetails(year), [year]);

  const monthOffsets = useMemo(
    () => getMonthOffsets(yearDetails, cellSize, dayGap, monthlyGap),
    [cellSize, dayGap, monthlyGap, yearDetails],
  );

  // Function to get fill color based on activity level
  const getFillColor = (monthIndex: number, dayIndex: number) => {
    const activity = activeDays.find(
      day => day.monthIndex === monthIndex && day.dayIndex === dayIndex,
    );

    return activity ? colorMap[activity.level] || defaultCellColor : defaultCellColor;
  };
  const currentDay = new Date().getDate();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={showScrollBar}
      style={{paddingHorizontal: paddingHorizontal, paddingVertical}}>
      <Svg
        width={
          monthOffsets[!showCurrentFullYear ? currentMonth : 11] +
          (cellSize + dayGap) * 6
        }
        height={(cellSize + dayGap) * 7 + textPadding + bottomPadding}>
        {showMonthAnnotation &&
          yearDetails.map(({totalDays, startDay}, monthIndex) => {
            const totalWeeksCols = Math.floor((startDay + totalDays) / 7);
            const xPos =
              Math.ceil((totalWeeksCols * cellSize) / 2) +
              monthOffsets[monthIndex];
            const yPos = (cellSize + dayGap) * 7 + textPadding;
            if (
              monthIndex > currentMonth &&
              year === currentYear &&
              !showCurrentFullYear
            ) {
              return null;
            }
            return (
              <Text
                key={'month-' + monthIndex}
                x={xPos}
                y={yPos}
                fontWeight={fontWeight}
                fill={monthlyAnnotationColor}
                fontSize={monthlyAnnotationFontSize}>
                {getMonthAnnotation(monthIndex)}
              </Text>
            );
          })}
        {yearDetails.map(({totalDays, startDay}, monthIndex) => {
          return Array.from({length: totalDays}).map((_, dayIndex) => {
            const currentWeek = Math.floor((startDay + dayIndex) / 7);
            const x =
              currentWeek * (cellSize + dayGap) + monthOffsets[monthIndex];
            const dayPosition = (startDay + dayIndex) % 7;
            const y = dayPosition * (cellSize + dayGap);
            if (
              monthIndex > currentMonth &&
              year === currentYear &&
              !showCurrentFullYear
            ) {
              return null;
            }
            if (
              dayIndex + 1 > currentDay &&
              year === currentYear &&
              currentMonth === monthIndex &&
              !showCurrentFullYear
            ) {
              return null;
            }
            return (
              <Rect
                key={`month-${monthIndex}-day-${dayIndex}`}
                x={x}
                y={y}
                width={cellSize}
                height={cellSize}
                fill={getFillColor(monthIndex, dayIndex)}
                rx={cellBorderRadius}
              />
            );
          });
        })}
      </Svg>
    </ScrollView>
  );
};

export default Heatmap;
