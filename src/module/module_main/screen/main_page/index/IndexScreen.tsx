import ListView from '@/module/module_common/component/refresh/ListView';
import { MainApi } from '@/module/module_main/api/MainApi';
import { Datums, List } from '@/module/module_main/bean/AppIndexBean';
import { Grid } from '@design';
import { observer } from 'mobx-react';
import React from 'react';
import { Image, StyleSheet, View, FlatList } from 'react-native';
import { BadgeComponent } from '../course/component/ClassPack/BadgeComponent';
import { ClassPackComponent } from '../course/component/ClassPackComponent';
import { BookComponent } from './component/BookComponent';
import { InfomationComponent } from './component/InfomationComponent';
import { OpenClassComponent } from './component/OpenClassComponent';
import { SectionTitleComponent } from './component/SectionTitleComponent';
import { TeacherComponent } from './component/TeacherComponent';
type Props = {};
type State = {
  navData: Array<navDataBean>;
  appIndexData: Array<Datums>;
};
const width: number = 251;
// 宫格数据Bean
class navDataBean {
  icon: string = '';
  text: string = '';
}

class IndexScreen extends React.Component<Props, State> {
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
        {/* 搜索栏 */}
        <View style={styles.searchContainer}>
          <View style={styles.searchView} />
          <Image
            source={globalImages.module_main_task}
            style={styles.search_images}
          />
          <View>
            <Image
              source={globalImages.module_main_mail}
              style={styles.search_images}
            />
            <BadgeComponent type={'number'} text={'23'} />
          </View>
        </View>
        {/* ListView */}
        <ListView
          onFetch={() => {
            return new Promise(resolve => {
              setTimeout(() => {
                resolve(this.state.appIndexData);
              }, 1000);
            });
          }}
          resultCovertToList={res => {
            return res;
          }}
          renderItem={this.renderItem}
          ListHeaderComponent={this.listHeader}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.sectionHeader}>
              <SectionTitleComponent
                title={title.name}
                backgroundColor={'white'}
              />
            </View>
          )}
          ItemSeparatorComponent={() => (
            <View style={styles.list_separator}>
              <View style={styles.list_separator_line} />
            </View>
          )}
        />
      </View>
    );
  }

  // NavData是否有数据
  isNavData = () => {
    return this.state.navData.length > 0;
  };

  // 请求Nav数据
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

  // 请求AppIndex数据
  loadAppIndex = () => {
    MainApi.getAppIndex().then((res: any) => {
      res.map((el: any) => {
        this.state.appIndexData.push({
          title: el.channel_info,
          data: el.list,
        });
      });
      this.setState({});
    });
  };

  // AppIndexData是否有数据
  isAppIndexData = () => {
    return this.state.appIndexData.length > 0;
  };

  // 渲染listHeader
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
            />
          ) : (
            <View />
          )}
        </View>
        <View style={styles.openClass}>
          <SectionTitleComponent title="公开课" backgroundColor={'#F7F7F7'} />
          <FlatList
            renderScrollComponent={null}
            data={[{ id: '0' }, { id: '1' }]}
            renderItem={this.openClassRenderItem}
            keyExtractor={item => item.id}
            horizontal={true}
            style={styles.openclass_flatlist}
          />
        </View>
      </View>
    );
  };

  // 渲染Item
  renderItem = (item: any) => {
    console.log('renderItem=======================================>>>>');
    console.log(item);
    let appData: List = item.item;
    if (this.isAppIndexData()) {
      switch (item.section.title.id) {
        case 50:
          return (
            <View style={styles.listItem}>
              <ClassPackComponent
                img={{
                  uri: appData.cover_img,
                }}
                title={appData.name}
                originalPrice={appData.original_price}
                presentPrice={appData.sale_price}
                numOfPeople={appData.sales_num}
              />
            </View>
          );
        case 22:
          return (
            <View style={styles.listItem}>
              <BookComponent
                bookImg={appData.cover_img}
                bookName={appData.title}
                author={appData.name}
                introduction={
                  'dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd111111111111111111111111111111111'
                }
                originalPrice={19888}
                presentPrice={198}
              />
            </View>
          );

        case 12:
          return (
            <View style={styles.listItem}>
              <TeacherComponent
                teacherName={appData.teacher_name}
                levelName={appData.level_name}
                photo={appData.photo}
                introduction={appData.introduction}
              />
              <TeacherComponent
                teacherName={appData.teacher_name}
                levelName={appData.level_name}
                photo={appData.photo}
                introduction={appData.introduction}
              />
            </View>
          );

        case 67:
          return (
            <View style={styles.listItem}>
              <InfomationComponent
                img={appData.thumb_img}
                title={appData.description}
                time={appData.created_at}
                numOfPeople={123124}
              />
            </View>
          );
        default:
          return <View />;
      }
    } else {
      return <View />;
    }
  };

  // 渲染开放课Item
  openClassRenderItem = () => {
    return (
      <View style={styles.openClassContainer}>
        <OpenClassComponent
          title={'关于ZUK的数学猜想'}
          name={'顾未易'}
          time={'3月25日 10:00'}
          img={globalImages.module_main_bjy}
          state={true}
        />
      </View>
    );
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
    height: 35,
    backgroundColor: '#F0F0F0',
    borderRadius: 17.5,
    marginBottom: 4.5,
  },
  searchContainer: {
    paddingLeft: 18,
    paddingRight: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  search_images: {
    width: 23,
    height: 23,
  },
  nav: {
    height: 149,
  },
  openClass: {
    height: 181.5,
    backgroundColor: '#F7F7F7',
  },
  openClassContainer: {
    marginRight: 11.5,
  },
  coursesContainer: {
    backgroundColor: 'white',
    paddingLeft: 18,
    paddingRight: 18,
  },
  sectionHeader: {
    marginTop: 8,
  },
  listItem: {
    paddingLeft: 18,
    paddingRight: 18,
    backgroundColor: 'white',
    paddingBottom: 20,
  },
  list_separator: {
    height: 36,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  list_separator_line: {
    width: width,
    height: 0.5,
    backgroundColor: '#EDEDED',
    position: 'absolute',
    right: 18,
  },
  openclass_flatlist: {
    paddingLeft: 18,
  },
});

export const IndexScreenContainer = observer(IndexScreen);
