// @flow
'use strict';
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import routes from '../router/Router';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MyTabBar, MyTabBean } from './component/MyTabBar';
import { MainApi } from '../api/MainApi';
import { TabWrapperBean } from '../bean/TabWrapperBean';
import { LoadDataContainerView } from '../../module_common/component/LoadDataContainerView';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

const Tab = createBottomTabNavigator();

export class MainScreen extends Component<any, any> {
  navList = observable.box(new TabWrapperBean());
  render() {
    return (
      <View style={styles.container}>
        <LoadDataContainerView
          onFetch={() => MainApi.getBottomNav()}
          onLoadSuccess={res => this.navList.set(res)}>
          {this._isHasNavList() ? (
            <Tab.Navigator tabBar={props => this._renderTabBar(props)}>
              {this._renderScreen()}
            </Tab.Navigator>
          ) : (
            <View />
          )}
        </LoadDataContainerView>
      </View>
    );
  }
  _renderTabBar(props: any) {
    return (
      <MyTabBar
        {...props}
        tabList={this._getNavList().map(item => {
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
    return this._getNavList().map(item => {
      let url = item.url.toLowerCase();
      return (
        <Tab.Screen
          key={url}
          // @ts-ignore
          name={tabScreens[url].path}
          // @ts-ignore
          component={tabScreens[url].screen}
          options={{
            tabBarLabel: item.name,
            title: item.name,
          }}
        />
      );
    });
  }
  _getNavList() {
    return this.navList.get().index;
  }
  _isHasNavList() {
    return this._getNavList().length > 0;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export const MainScreenContainer = observer(MainScreen);
