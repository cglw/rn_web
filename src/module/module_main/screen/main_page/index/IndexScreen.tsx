import ListView from '@/module/module_common/component/refresh/ListView';
import { MainApi } from '@/module/module_main/api/MainApi';
import { Datums, List } from '@/module/module_main/bean/AppIndexBean';
// import { BookBean } from '@/module/module_main/bean/BookBean';
import { Grid, Badge } from '@design';
import { observer } from 'mobx-react';
import React from 'react';
import { Image, StyleSheet, View, FlatList } from 'react-native';
// import { BadgeComponent } from '../../component/BadgeComponent';
import { ClassPackComponent } from '../course/component/ClassPackComponent';
import { BookView } from './component/BookView';
import { InfomationView } from './component/InfomationView';
import { OpenClassView } from './component/OpenClassView';
import { SectionTitleView } from './component/SectionTitleView';
import { TeacherView } from './component/TeacherView';
type Props = {};
type State = {
  navData: Array<navDataBean>;
  appIndexData: Array<Datums>;
};
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
        <View style={styles.search_container}>
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
            <View style={styles.search_badge}>
              <Badge text={12} />
            </View>
          </View>
        </View>
        {/* ListView */}
        <ListView
          enableLoadMore={false}
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
          ListHeaderComponent={this.renderListHeader}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.sectionHeader}>
              <SectionTitleView
                title={title.name}
                backgroundColor={'white'}
                hasMore={true}
              />
            </View>
          )}
          ItemSeparatorComponent={this.renderItemSeparator}
          renderSectionFooter={() => <View style={styles.section_footor} />}
          enableLoadMore={false}
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
  renderListHeader = () => {
    return (
      <View>
        <View>
          {this.isNavData() ? (
            <Grid
              // itemStyle={{ height: 74 }}
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
          <SectionTitleView
            title="公开课"
            backgroundColor={'#F7F7F7'}
            hasMore={false}
          />
          <FlatList
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
    let itemData: List = item.item;
    let type: number = item.section.title.type;
    if (this.isAppIndexData()) {
      return getItem(itemData, type);
    } else {
      return <View />;
    }
  };

  // 渲染开放课Item
  openClassRenderItem = () => {
    return (
      <View style={styles.openClassContainer}>
        <OpenClassView
          title={'关于ZUK的数学猜想'}
          anchorName={'顾未易'}
          startTime={'3月25日 10:00'}
          headPortrait={globalImages.module_main_bjy}
          state={true}
        />
      </View>
    );
  };

  // item分隔组件
  renderItemSeparator = (item: any) => {
    let type: number = item.section.title.type;
    return getItemSeparator(type);
  };
}

const TYPE_INFORMATION = 6;
const TYPE_CLASSPACK = 8;
const TYPE_COURSE = 1;
const TYPE_TEACHER = 3;

// 对不同类型的item渲染相应组件
function getItem(itemData: List, type: number) {
  // console.log('getItem===========================>>>>>>>>>>>>>>>>>>>');
  // let bookData: BookBean = itemData
  // console.log(itemData);
  switch (type) {
    case TYPE_INFORMATION:
      return (
        <View style={styles.listItem}>
          <InfomationView
            picture={itemData.thumb_img}
            title={itemData.description}
            time={itemData.created_at}
            numOfVisitors={123124}
          />
        </View>
      );
    case TYPE_CLASSPACK:
      return (
        <View style={styles.listItem}>
          <ClassPackComponent
            img={{
              uri: itemData.cover_img,
            }}
            title={itemData.name}
            originalPrice={itemData.original_price}
            presentPrice={itemData.sale_price}
            numOfEnrolment={itemData.sales_num}
          />
        </View>
      );
    case TYPE_COURSE:
      return (
        <View style={styles.listItem}>
          {/* <BookView
            // {...itemData}
            coverPhoto={itemData.cover_img}
            title={itemData.title}
            author={itemData.name}
            introduction={
              'dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd111111111111111111111111111111111'
            }
            originalPrice={19888}
            presentPrice={198}
          /> */}
        </View>
      );
    case TYPE_TEACHER:
      return (
        <View style={styles.listItem}>
          <TeacherView
            teacherName={itemData.teacher_name}
            levelName={itemData.level_name}
            photo={itemData.photo}
            introduction={itemData.introduction}
          />
        </View>
      );
    default:
      return <View />;
  }
}

// item分隔组件的样式分类
function getItemSeparator(type: number) {
  switch (type) {
    case TYPE_COURSE:
      return renderItemSeparator(36.5, 211.5);
    case TYPE_TEACHER:
      return renderItemSeparator(20.5, 251);
    case TYPE_INFORMATION:
      return renderItemSeparator(30.5, 212, 18);
    case TYPE_CLASSPACK:
      return renderItemSeparator(36.5, 211.5);
    default:
      return <View />;
  }
}

function renderItemSeparator(_height: number, _width: number, _left?: number) {
  return (
    <View style={[styles.list_separator, { height: _height }]}>
      <View
        style={[styles.list_separator_line, { width: _width, left: _left }]}
      />
    </View>
  );
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
    width: '80%',
    height: 35,
    backgroundColor: '#F0F0F0',
    borderRadius: 17.5,
    marginBottom: 4.5,
  },
  search_container: {
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
  },
  list_separator: {
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  list_separator_line: {
    height: 0.5,
    backgroundColor: '#EDEDED',
    position: 'absolute',
    right: 18,
  },
  openclass_flatlist: {
    paddingLeft: 18,
  },
  section_footor: {
    height: 20,
    backgroundColor: 'white',
  },
  search_badge: {
    // width: 20,
    // height: 12,
    position: 'absolute',
    // left: 16.5,
    // bottom: 14,
  },
});

export const IndexScreenContainer = observer(IndexScreen);
