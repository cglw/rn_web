// @flow
'use strict';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
// 导航标签页面
import { PractiseScreen } from './main_page/practise/PractiseScreen';
import { Course } from './main_page/course/CourseScreen';
import { OneToOne } from './main_page/onetoone/OneToOneScreen';
import { IndexScreen } from './main_page/index/IndexScreen';
import { MyScreen } from './main_page/my/MyScreen';
// React Navigation 控件
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// 自定义组件
import { MyTabBar } from './component/MyTabBar';
// api
import { MainApi } from '../api/MainApi';
import { TabWrapperBean } from '../bean/TabWrapperBean';
// import AutoSizeSheet from '../../../sdk/AutoSizeSheet';
// import { getWindowWidth } from '../../../utils/ScreenUtil';

const Tab = createBottomTabNavigator();
type State = {
  navList: TabWrapperBean;
};

// 组件
const ComponentMap = {
  Index: {
    component: IndexScreen,
    path: 'index',
  },
  Course: {
    component: Course,
    path: 'course',
  },
  Oto: { component: OneToOne, path: 'oto' },
  Practise: { component: PractiseScreen, path: 'practise' },
  Person: { component: MyScreen, path: 'person' },
};

export class MainScreen extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      navList: new TabWrapperBean(),
    };
  }
  componentDidMount() {
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

  render() {
    console.info('this.getAllParams(this)');
    console.info(this.props);
    return (
      <View style={{ flex: 1 }}>
        {/*style={styles.title}*/}
        <Text>test</Text>
        {/* 底部导航 */}
        {this._isHasNavList() ? (
          <Tab.Navigator
            tabBar={props => {
              return <MyTabBar {...props} navList={this.state.navList} />;
            }}>
            {this.state.navList.index.map(val => {
              return (
                <Tab.Screen
                  key={val.url}
                  // @ts-ignore
                  name={ComponentMap[val.url].path}
                  // @ts-ignore
                  component={ComponentMap[val.url].component}
                  options={{ tabBarLabel: val.name }}
                />
              );
            })}
          </Tab.Navigator>
        ) : null}
      </View>
    );
  }
}
// const styles = AutoSizeSheet.create({});
