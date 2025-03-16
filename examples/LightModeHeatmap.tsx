import React from 'react';
import { View} from 'react-native';
import Heatmap from '../src/heatmap/Heatmap';


const LightModeHeatmap = () => {
    // const {} = useColorScheme()
  return (
    <View>
      <Heatmap
        year={2024}
        activeDays={[
          {monthIndex: 0, dayIndex: 5, level: 2},
          {monthIndex: 2, dayIndex: 10, level: 3},
          {monthIndex: 5, dayIndex: 20, level: 1},
        ]}
        defaultCellColor="#808080"
        colorMap={{
          1: '#a3d9a5',
          2: '#57c84d',
          3: '#228b22',
        }}
        cellSize={12}
        dayGap={6}
        monthlyGap={30}
        textPadding={10}
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
        monthlyAnnotationColor="black"
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

export default LightModeHeatmap;
