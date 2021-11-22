import React, {useRef, useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../screens/Home';
import Profile from '../screens/Profile';
import TabBar from './TabBar';
import {Animated} from 'react-native';
import {TabBarProvider, TabBarContext} from './TabBarContext';

const Tab = createBottomTabNavigator();

function MainNavigation() {
  const translateY = useRef(new Animated.Value(0)).current;
  const {tabBarShown} = useContext(TabBarContext);

  useEffect(() => {
    if (tabBarShown) {
      tabBarShow();
      return;
    }
    tabBarHide();
  }, [tabBarShown]);

  const tabBarShow = () =>
    Animated.timing(translateY, {
      toValue: -150,
      duration: 1000,
      useNativeDriver: true,
    }).start();

  const tabBarHide = () =>
    Animated.timing(translateY, {
      toValue: 100,
      duration: 500,
      useNativeDriver: true,
    }).start();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <TabBar {...props} translateY={translateY} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Settings" component={Profile} />
    </Tab.Navigator>
  );
}

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <TabBarProvider>
        <MainNavigation />
      </TabBarProvider>
    </NavigationContainer>
  );
}
