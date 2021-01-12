import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { TabWrapperBean } from '../../bean/TabWrapperBean';

type Props = {
  state: any;
  descriptors: any;
  navigation: any;
  navList?: TabWrapperBean;
};

export function MyTabBar(props: Props) {
  const focusedOptions =
    props.descriptors[props.state.routes[props.state.index].key].options;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* 遍历 */}
      {props.state.routes.map((route: any, index: number) => {
        const { options } = props.descriptors[route.key];
        // label:标签名称
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        // isFocused 是否选中
        const isFocused = props.state.index === index;
        // onPress 点击触发
        const onPress = () => {
          const event = props.navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            props.navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            activeOpacity={1}>
            <Image
              source={
                isFocused
                  ? { uri: props.navList?.index[index].nav_img_checked }
                  : {
                      uri: props.navList?.index[index].nav_img,
                    }
              }
              style={{
                width: 25,
                height: 25,
                marginTop: 4,
              }}
            />
            <Text
              style={{
                color: isFocused
                  ? globalColors.mainColor
                  : globalColors.contentColor,
                marginBottom: 2,
                lineHeight: 20,
              }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
});
