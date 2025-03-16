"use strict";

export const getYearDetails = year => {
  return Array.from({
    length: 12
  }, (_, month) => {
    const totalDays = new Date(year, month + 1, 0).getDate(); // Get total days in month
    const startDay = new Date(year, month, 1).getDay(); // Get the first day's index (0 = Sunday, 1 = Monday, etc.)

    return {
      totalDays,
      startDay
    };
  });
};
export const getMonthOffsets = (yearDetails, cellSize, gap, monthlyGap) => {
  let offsets = [];
  let accumulatedWidth = 0;
  yearDetails.forEach(({
    totalDays,
    startDay
  }) => {
    const totalWeeksCols = Math.floor((startDay + totalDays) / 7);
    offsets.push(accumulatedWidth);
    accumulatedWidth += totalWeeksCols * (cellSize + gap) + monthlyGap; // Add extra spacing
  });
  return offsets;
};
export const getMonthFromMonthIndex = index => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index] ?? 'Invalid';
//# sourceMappingURL=helpers.js.map