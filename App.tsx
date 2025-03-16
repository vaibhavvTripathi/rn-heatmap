import {View} from 'react-native';
import React from 'react';
import Heatmap from './src/heatmap/Heatmap';
import LightModeHeatmap from './examples/LightModeHeatmap';
import DarkModeHeatmap from './examples/DarkmodeHeatmap';

const App = () => {
  return (
    <View style={{marginTop: 100}}>
      <Heatmap
        year={2025}
        activeDays={[
          {dayIndex: 0, monthIndex: 0, level: 3},
          {dayIndex: 1, monthIndex: 0, level: 1},
          {dayIndex: 2, monthIndex: 0, level: 2},
          {dayIndex: 3, monthIndex: 0, level: 3},
          {dayIndex: 4, monthIndex: 1, level: 1},
          {dayIndex: 5, monthIndex: 2, level: 2},
          {dayIndex: 6, monthIndex: 3, level: 3},
          {dayIndex: 7, monthIndex: 5, level: 1},
          {dayIndex: 8, monthIndex: 6, level: 2},
          {dayIndex: 9, monthIndex: 7, level: 3},
          {dayIndex: 10, monthIndex: 0, level: 1},
          {dayIndex: 11, monthIndex: 0, level: 2},
        ]}
        showCurrentFullYear={true}
        monthlyGap={0}
      />
      <LightModeHeatmap />
      <DarkModeHeatmap/>
    </View>
  );
};

export default App;
