"use strict";

import React, { useMemo } from 'react';
import Svg, { Rect, Text } from 'react-native-svg';
import { ScrollView } from 'react-native';
import { getMonthFromMonthIndex, getMonthOffsets, getYearDetails } from './helpers';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Heatmap = ({
  year,
  activeDays = [],
  defaultCellColor = '#161b22',
  colorMap = {
    1: '#0e4429',
    // Light green
    2: '#006d32',
    // Medium green
    3: '#26a641' // Dark green
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
  showScrollBar = false
}) => {
  const yearDetails = useMemo(() => getYearDetails(year), [year]);
  const monthOffsets = useMemo(() => getMonthOffsets(yearDetails, cellSize, dayGap, monthlyGap), [cellSize, dayGap, monthlyGap, yearDetails]);

  // Function to get fill color based on activity level
  const getFillColor = (monthIndex, dayIndex) => {
    const activity = activeDays.find(day => day.monthIndex === monthIndex && day.dayIndex === dayIndex);
    return activity ? colorMap[activity.level] || defaultCellColor : defaultCellColor;
  };
  const currentDay = new Date().getDate();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  return /*#__PURE__*/_jsx(ScrollView, {
    horizontal: true,
    showsHorizontalScrollIndicator: showScrollBar,
    style: {
      paddingHorizontal: paddingHorizontal,
      paddingVertical
    },
    children: /*#__PURE__*/_jsxs(Svg, {
      width: monthOffsets[!showCurrentFullYear ? currentMonth : 11] + (cellSize + dayGap) * 6,
      height: (cellSize + dayGap) * 7 + textPadding + bottomPadding,
      children: [showMonthAnnotation && yearDetails.map(({
        totalDays,
        startDay
      }, monthIndex) => {
        const totalWeeksCols = Math.floor((startDay + totalDays) / 7);
        const xPos = Math.ceil(totalWeeksCols * cellSize / 2) + monthOffsets[monthIndex];
        const yPos = (cellSize + dayGap) * 7 + textPadding;
        if (monthIndex > currentMonth && year === currentYear && !showCurrentFullYear) {
          return null;
        }
        return /*#__PURE__*/_jsx(Text, {
          x: xPos,
          y: yPos,
          fontWeight: fontWeight,
          fill: monthlyAnnotationColor,
          fontSize: monthlyAnnotationFontSize,
          children: getMonthAnnotation(monthIndex)
        }, 'month-' + monthIndex);
      }), yearDetails.map(({
        totalDays,
        startDay
      }, monthIndex) => {
        return Array.from({
          length: totalDays
        }).map((_, dayIndex) => {
          const currentWeek = Math.floor((startDay + dayIndex) / 7);
          const x = currentWeek * (cellSize + dayGap) + monthOffsets[monthIndex];
          const dayPosition = (startDay + dayIndex) % 7;
          const y = dayPosition * (cellSize + dayGap);
          if (monthIndex > currentMonth && year === currentYear && !showCurrentFullYear) {
            return null;
          }
          if (dayIndex + 1 > currentDay && year === currentYear && currentMonth === monthIndex && !showCurrentFullYear) {
            return null;
          }
          return /*#__PURE__*/_jsx(Rect, {
            x: x,
            y: y,
            width: cellSize,
            height: cellSize,
            fill: getFillColor(monthIndex, dayIndex),
            rx: cellBorderRadius
          }, `month-${monthIndex}-day-${dayIndex}`);
        });
      })]
    })
  });
};
export default Heatmap;
//# sourceMappingURL=Heatmap.js.map