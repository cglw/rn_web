// @flow
'use strict';
import React, { Component } from 'react';
import { View } from 'react-native';
import routes from '../router/Router';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MyTabBar, MyTabBean } from './component/MyTabBar';
import { MainApi } from '../api/MainApi';
import { TabWrapperBean } from '../bean/TabWrapperBean';

const Tab = createBottomTabNavigator();
type State = {
  navList: TabWrapperBean;
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
    return (
      <View style={{ flex: 1 }}>
        {this._isHasNavList() ? (
          <Tab.Navigator tabBar={props => this._renderTabBar(props)}>
            {this._renderScreen()}
          </Tab.Navigator>
        ) : null}
      </View>
    );
  }
  _renderTabBar(props: any) {
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
  }
  _renderScreen() {
    const tabScreens = routes.home.screens;
    return this.state.navList.index.map(val => {
      let url = val.url;
      return (
        <Tab.Screen
          key={url}
          // @ts-ignore
          name={tabScreens[url].path}
          // @ts-ignore
          component={tabScreens[url].screen}
          options={{ tabBarLabel: val.name }}
        />
      );
    });
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
