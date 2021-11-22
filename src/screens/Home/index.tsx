import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {TabBarContext} from '../../navigation/TabBarContext';

const TEMP_ARRAY = Array(150)
  .fill('')
  .map((i, index) => {
    return {
      id: index.toString(),
      text: index.toString(),
    };
  });

const renderItem = ({item}) => (
  <View
    style={{height: 40, justifyContent: 'center', alignItems: 'center'}}
    key={item.id}>
    <Text>{item.text}</Text>
  </View>
);

export default function Home() {
  const {handleScroll} = React.useContext(TabBarContext);

  return (
    <View style={{flex: 1, backgroundColor: 'silver'}}>
      <FlatList
        scrollEventThrottle={16}
        data={TEMP_ARRAY}
        renderItem={renderItem}
        onScroll={handleScroll}
      />
    </View>
  );
}
