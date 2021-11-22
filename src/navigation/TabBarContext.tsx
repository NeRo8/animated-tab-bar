import React, {useState, useRef, PropsWithChildren} from 'react';
import {NativeScrollEvent, NativeSyntheticEvent} from 'react-native';

interface ITabBarContext {
  tabBarShown: boolean;
  handleScroll: (data: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

export const TabBarContext = React.createContext<ITabBarContext>({
  tabBarShown: true,
  handleScroll: () => {},
});

export const TabBarProvider = ({children}: PropsWithChildren<{}>) => {
  const currentPosition = useRef(0);
  const [tabBarShown, setTabBarShown] = useState(true);

  const handleScroll = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (nativeEvent.contentOffset.y < currentPosition.current) {
      //if (tabBarShown) return;
      setTabBarShown(true);
    } else if (nativeEvent.contentOffset.y > currentPosition.current) {
      //if (!tabBarShown) return;
      setTabBarShown(false);
    }

    currentPosition.current = nativeEvent.contentOffset.y;
  };

  return (
    <TabBarContext.Provider value={{tabBarShown, handleScroll}}>
      {children}
    </TabBarContext.Provider>
  );
};
