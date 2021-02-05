import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import React, { useState } from 'react';

type Props = {
  data: Array<string>;
  onItemClick: (index: number) => void;
  selectIndex?: number;
};
export const SingleSelectList: React.FC<Props> = props => {
  const [selectIndex, setSelectIndex] = useState(props.selectIndex);
  function isChecked(index: number): boolean {
    return selectIndex === index;
  }
  return (
    <FlatList<string>
      ItemSeparatorComponent={() => <View style={styles.sep} />}
      keyExtractor={(item, index) => index.toString()}
      data={props.data}
      style={styles.container}
      renderItem={({ item, index }) => {
        return (
          <TouchableOpacity
            onPress={() => {
              setSelectIndex(index);
              props.onItemClick(index);
            }}
            activeOpacity={1}>
            <View style={styles.item}>
              <Text
                style={{
                  ...styles.text,
                  color: isChecked(index)
                    ? globalColors.mainColor
                    : globalColors.titleColor,
                }}>
                {item}
              </Text>
              {isChecked(index) ? (
                <Image
                  style={styles.check_image}
                  source={globalImages.module_common_ic_filter_select}
                />
              ) : null}
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  text: {
    flex: 1,
    backgroundColor: 'white',
    fontSize: 14,
  },
  check_image: {
    width: 19,
    height: 13,
  },
  sep: {
    height: 20,
    backgroundColor: 'white',
  },
});
