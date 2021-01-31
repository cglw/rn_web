import ListView from '@/module/module_common/component/refresh/ListView';
import { MainApi } from '@/module/module_main/api/MainApi';
import { Datums } from '@/module/module_main/bean/AppIndexBean';
import { SearchBar } from '@ant-design/react-native';
import { Badge, Grid } from 'antd-mobile';
import { observer } from 'mobx-react';
import React from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import { OpenClassComponent } from './component/OpenClassComponent';
import { SectionTitleComponent } from './component/SectionTitleComponent';
type Props = {};
type State = {
  navData: Array<navDataBean>;
  appIndexData: Array<Datums>;
};

class navDataBean {
  icon: string = '';
  text: string = '';
}

class TheMainScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      navData: [],
      appIndexData: [],
    };
  }
  componentDidMount() {
    this.loadNav();
    this.loadAppIndex();
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={styles.searchView}>
            <SearchBar
              style={styles.searchBar}
              placeholder={'搜索课程'}
              cancelText={' '}
              showCancelButton={true}
            />
          </View>
          <Image source={globalImages.module_main_task} style={styles.images} />
          <Image source={globalImages.module_main_mail} style={styles.images} />
          <Badge text={99} />
        </View>
        <ListView
          onFetch={() => {
            return new Promise(res => {
              setTimeout(() => {
                res(this.state.appIndexData);
              }, 1000);
            });
          }}
          resultCovertToList={res => {
            return res;
          }}
          renderItem={this.renderItem}
          ListHeaderComponent={this.listHeader}
          renderSectionHeader={this.renderSectionHeader}
        />

        <View style={styles.coursesContainer}>
          <SectionTitleComponent title={'推荐课程'} />
        </View>
      </View>
    );
  }

  isNavData = () => {
    return this.state.navData.length > 0;
  };

  loadNav = () => {
    MainApi.getNav().then(res => {
      res.map(el => {
        this.state.navData.push({
          icon: el.nav_img,
          text: el.name,
        });
      });
      this.setState({});
    });
  };

  loadAppIndex = () => {
    MainApi.getAppIndex().then((res: any) => {
      console.log('loadAppIndex====>');
      this.setState({
        appIndexData: res,
      });
      console.log(res);
    });
  };

  isAppIndexData = () => {
    return this.state.appIndexData.length > 0;
  };

  listHeader = () => {
    return (
      <View>
        <View style={styles.nav}>
          {this.isNavData() ? (
            <Grid
              itemStyle={{ height: 74 }}
              data={this.state.navData}
              columnNum={4}
              isCarousel={true}
              hasLine={false}
              onClick={el => console.log(el)}
            />
          ) : (
            <View />
          )}
        </View>
        <View style={styles.openClass}>
          <SectionTitleComponent title="公开课" />
          <OpenClassComponent
            title={'关于ZUK的数学猜想'}
            name={'顾未易'}
            time={'12:00'}
            img={globalImages.module_main_bjy}
            state={true}
          />
        </View>
      </View>
    );
  };

  renderItem = (item: any) => {
    console.log('renderItem=======================================>>>>');
    console.log(item);
    let appData = item.item;
    return (
      <View>
        <Text>{this.isAppIndexData() ? appData.channel_info.id : null}</Text>
      </View>
    );
  };

  renderSectionHeader = (item: any) => {
    return <SectionTitleComponent title={item.item.channel_info.id} />;
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  searchBar: {
    height: 35,
    borderRadius: 100,
    backgroundColor: '#F0F0F0',
  },
  searchView: {
    marginTop: 4.5,
    width: 262,
  },
  searchContainer: {
    paddingLeft: 18,
    paddingRight: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  images: {
    width: 23,
    height: 23,
  },
  nav: {
    height: 149,
  },
  openClass: {
    height: 181.5,
    paddingLeft: 18,
  },
  coursesContainer: {
    backgroundColor: 'white',
    paddingLeft: 18,
    paddingRight: 18,
  },
});

export const TheMainScreenContainer = observer(TheMainScreen);
