import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import AppNavigation from './navigation';

const styles = StyleSheet.create({
  containerStyle: {flex: 1},
});

export default function App() {
  return (
    <View style={styles.containerStyle}>
      <AppNavigation />
    </View>
  );
}
