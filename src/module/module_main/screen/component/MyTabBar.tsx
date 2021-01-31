import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

type Props = {
  state: any;
  descriptors: any;
  navigation: any;
  tabList: Array<MyTabBean>;
};
export class MyTabBean {
  icon: any;
  iconChecked: any;
  text: string = '';
  setIcon(icon: any) {
    this.icon = icon;
    return this;
  }
  setText(text: string) {
    this.text = text;
    return this;
  }
  setIconChecked(icon: any) {
    this.iconChecked = icon;
    return this;
  }
}

export function MyTabBar(props: Props & BottomTabBarProps) {
  const focusedOptions =
    props.descriptors[props.state.routes[props.state.index].key].options;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.container}>
      {props.state.routes.map((route: any, index: number) => {
        let myTabBean = props.tabList[index];
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

        let source = isFocused ? myTabBean.iconChecked : myTabBean.icon;

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.touch}
            activeOpacity={1}>
            <Image
              source={typeof source === 'number' ? source : { uri: source }}
              style={styles.icon}
            />
            <Text
              style={{
                color: isFocused
                  ? globalColors.mainColor
                  : globalColors.contentColor,
                ...styles.text,
              }}>
              {myTabBean.text}
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
    height: 49,
    shadowOffset: { width: 0, height: -2 },
    shadowColor: '#F5F5F5',
    shadowRadius: 6,
  },
  touch: {
    flex: 1,
    ...globalStyles.center,
  },
  icon: {
    width: 25,
    height: 25,
    marginTop: 4,
  },
  text: {
    marginBottom: 2,
    lineHeight: 20,
  },
});
