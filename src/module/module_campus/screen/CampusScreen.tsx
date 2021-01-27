import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { CampusApi } from '../api/CampusApi';
import { DataBean } from '../bean/DataBean';
import { SchoolsBean } from '../bean/SchoolsBean';
import { CampusComponent } from '../component/CampusComponent';
import { CityComponent } from '../component/CityComponent';
import { ListFooterComponent } from '../component/ListFooterComponent';
import { ProvinceComponent } from '../component/ProvinceComponent';

type State = {
  campusList: any;
  selectId: string;
  selectItem?: SchoolsBean;
};

export class CampusScreen extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      campusList: [],
      selectId: '',
      selectItem: undefined,
    };
  }
  componentDidMount() {
    this.loadData();
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.tipsCon}>
          <Text style={styles.tips}>请选择你要注册的校区</Text>
        </View>
        <Text>{this.state.selectId}</Text>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={true} onRefresh={() => {}} />
          }
          keyExtractor={index => `${index}`}
          data={this.state.campusList}
          renderItem={this.renderItem}
          ListFooterComponent={ListFooterComponent}
        />
      </View>
    );
  }

  loadData() {
    CampusApi.getCampusNav()
      .then(res => {
        console.log(res);
        this.setState({
          campusList: this.handleData(res),
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleData(res: Array<DataBean>) {
    const data: Array<Object> = [];
    res?.forEach(item => {
      data.push({
        value: item.province_name,
        type: 'province',
      });
      item.city?.forEach(cityItem => {
        data.push({ value: cityItem.city_name, type: 'city' });
        cityItem.schools?.forEach(schoolItem =>
          data.push({
            value: schoolItem.district_name,
            school: schoolItem.school_name,
            id: schoolItem.school_id,
            type: 'school',
          }),
        );
      });
    });
    return data;
  }

  renderItem = (item: any) => {
    console.log('renderItem');

    let view = null;
    let itemData = item.item;
    switch (itemData.type) {
      case 'province':
        view = <ProvinceComponent province={itemData.value} />;
        break;
      case 'city':
        view = <CityComponent city={itemData.value} />;
        break;
      case 'school':
        view = (
          <TouchableOpacity
            onPress={() => {
              if (this.state.selectItem) {
                this.state.selectItem.isChecked = false;
              }
              itemData.isChecked = !itemData.isChecked;

              this.setState({
                selectId: itemData.id,
                selectItem: itemData,
                campusList: [...this.state.campusList],
              });
            }}>
            <CampusComponent
              district={itemData.value}
              school={itemData.school}
              isChecked={itemData.isChecked}
              test={this.state.selectId}
            />
          </TouchableOpacity>
        );
        break;
      default:
        break;
    }
    return view;
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  tipsCon: {
    height: 32,
    justifyContent: 'center',
  },
  tips: {
    color: '#808080',
    marginLeft: 15,
    fontFamily: 'PingFang SC',
  },
});
