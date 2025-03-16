import React from 'react';
import {View} from 'react-native';
import Heatmap from '../src/heatmap/Heatmap';

const DarkModeHeatmap = () => {
  return (
    <View>
      <Heatmap
        year={2024}
        activeDays={[
          {monthIndex: 0, dayIndex: 5, level: 2},
          {monthIndex: 2, dayIndex: 10, level: 3},
          {monthIndex: 5, dayIndex: 20, level: 1},
        ]}
        defaultCellColor="#161b22"
        colorMap={{
          1: '#0e4429',
          2: '#006d32',
          3: '#26a641',
        }}
        cellSize={14}
        dayGap={8}
        monthlyGap={35}
        textPadding={12}
        fontWeight="bold"
        getMonthAnnotation={monthIndex =>
          [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ][monthIndex]
        }
        showMonthAnnotation={true}
        monthlyAnnotationFontSize={12}
        monthlyAnnotationColor="white"
        cellBorderRadius={4}
        paddingHorizontal={15}
        paddingVertical={5}
        bottomPadding={15}
        showCurrentFullYear={true}
        showScrollBar={true}
      />
    </View>
  );
};

export default DarkModeHeatmap;
