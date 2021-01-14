// @flow
'use strict';
import React, { Component } from 'react';
import { View } from 'react-native';

import routes from '../router/Router';
// React Navigation 控件
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// 自定义组件
import { MyTabBar, MyTabBean } from './component/MyTabBar';
// api
import { MainApi } from '../api/MainApi';
import { TabWrapperBean } from '../bean/TabWrapperBean';
import { IndexScreen } from './main_page/index/IndexScreen';
import { CourseScreen } from './main_page/course/CourseScreen';
import { OneToOneScreen } from './main_page/onetoone/OneToOneScreen';
import { PractiseScreen } from './main_page/practise/PractiseScreen';
import { PersonScreen } from './main_page/my/PersonScreen';

const Tab = createBottomTabNavigator();
type State = {
  navList: TabWrapperBean;
};

// 组件
const ComponentMap = {
  Index: {
    screen: IndexScreen,
    path: 'index',
  },
  Course: {
    screen: CourseScreen,
    path: 'course',
  },
  Oto: { screen: OneToOneScreen, path: 'oto' },
  Practise: { screen: PractiseScreen, path: 'practise' },
  Person: { screen: PersonScreen, path: 'person' },
};
export class MainScreen extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      navList: new TabWrapperBean(),
    };
  }
  componentDidMount() {
    this.loadBottomNav();
  }

  render() {
    let tabScreens = routes.home.screens;
    return (
      <View style={{ flex: 1 }}>
        {/* 底部导航 */}
        {this._isHasNavList() ? (
          <Tab.Navigator
            tabBar={props => {
              return (
                <MyTabBar
                  {...props}
                  tabList={this.state.navList.index.map(item => {
                    return new MyTabBean()
                      .setText(item.name)
                      .setIcon(item.nav_img)
                      .setIconChecked(item.nav_img_checked);
                  })}
                />
              );
            }}>
            {this.state.navList.index.map(val => {
              let url = val.url;
              return (
                <Tab.Screen
                  key={url}
                  // @ts-ignore
                  name={tabScreens[url].path}
                  // name={val.name}
                  // @ts-ignore
                  component={tabScreens[url].screen}
                  options={{ tabBarLabel: val.name }}
                />
              );
            })}
          </Tab.Navigator>
        ) : null}
      </View>
    );
  }

  loadBottomNav() {
    MainApi.getBottomNav()
      .then(res => {
        this.setState({
          navList: res,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  _isHasNavList() {
    return this.state.navList.index.length > 0;
  }
}
