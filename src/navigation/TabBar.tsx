import React from 'react';
import {Text, TouchableOpacity, Animated, StyleSheet} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

interface ITabBar extends BottomTabBarProps {
  translateY: Animated.Value;
}

function TabBar({state, descriptors, navigation, translateY}: ITabBar) {
  const containerStyle = [styles.containerStyle, {transform: [{translateY}]}];

  return (
    <Animated.View style={containerStyle}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          if (!isFocused) {
            navigation.navigate({name: route.name, params: undefined});
          }
        };

        const labelStyle = [
          styles.labelStyle,
          {
            color: isFocused ? '#673ab7' : '#222',
          },
        ];

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            style={styles.tabContainerStyle}>
            <Text style={labelStyle}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -100,
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 20,
  },
  tabContainerStyle: {
    flex: 1,
    padding: 30,
  },
  labelStyle: {
    textAlign: 'center',
  },
});

export default TabBar;
