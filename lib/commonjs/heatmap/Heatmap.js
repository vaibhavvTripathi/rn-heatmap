"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNativeSvg = _interopRequireWildcard(require("react-native-svg"));
var _reactNative = require("react-native");
var _helpers = require("./helpers");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
  getMonthAnnotation = _helpers.getMonthFromMonthIndex,
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
  const yearDetails = (0, _react.useMemo)(() => (0, _helpers.getYearDetails)(year), [year]);
  const monthOffsets = (0, _react.useMemo)(() => (0, _helpers.getMonthOffsets)(yearDetails, cellSize, dayGap, monthlyGap), [cellSize, dayGap, monthlyGap, yearDetails]);

  // Function to get fill color based on activity level
  const getFillColor = (monthIndex, dayIndex) => {
    const activity = activeDays.find(day => day.monthIndex === monthIndex && day.dayIndex === dayIndex);
    return activity ? colorMap[activity.level] || defaultCellColor : defaultCellColor;
  };
  const currentDay = new Date().getDate();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.ScrollView, {
    horizontal: true,
    showsHorizontalScrollIndicator: showScrollBar,
    style: {
      paddingHorizontal: paddingHorizontal,
      paddingVertical
    },
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNativeSvg.default, {
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
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Text, {
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
          return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Rect, {
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
var _default = exports.default = Heatmap;
//# sourceMappingURL=Heatmap.js.map