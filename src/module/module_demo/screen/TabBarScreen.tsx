import {
  Badge,
  Button,
  Card,
  Checkbox,
  Grid,
  InputItem,
  List,
  Radio,
  SearchBar,
  Stepper,
  Switch,
  TabBar,
  TextareaItem,
} from '@ant-design/react-native';
import { ListView } from 'antd-mobile';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DemoApi } from '../api/DemoApi';
import { Data } from '../bean/DemoBean';
import { PaginationComponent } from './PaginationComponent';
// import { SegmentedComponent } from './SegmentedComponent';

type Props = {};
type State = {
  phone: string;
  value: any;
  part1Value: number;
  checked: boolean;
  dataSource: any;
};
class TabBarScreen extends React.Component<Props, State> {
  bottomList = observable.object(
    {
      index: new Data(),
      get indexData() {
        return this.index;
      },
      get name() {
        return this.index.length > 0 ? this.index[0].name : null;
      },
      setIndex(index: any) {
        this.index = index;
      },
    },
    {
      setIndex: action,
    },
  );
  selectedTab = observable.box('myTab');
  phone = observable.box('');
  constructor(props: Props) {
    super(props);

    const getSectionData = (dataBlob: any, sectionID: any) =>
      dataBlob[sectionID];
    const getRowData = (dataBlob: any, sectionID: any, rowID: any) =>
      dataBlob[rowID];

    const dataSource = new ListView.DataSource({
      getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1: any, row2: any) => row1 !== row2,
      sectionHeaderHasChanged: (s1: any, s2: any) => s1 !== s2,
    });
    this.state = {
      phone: '',
      value: [],
      part1Value: 1,
      checked: false,
      dataSource,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="red"
          barTintColor="yellow">
          <TabBar.Item
            title={this.bottomList.name}
            icon={globalImages.module_common_ic_error}
            iconStyle={{ width: 20, height: 20 }}
            selected={this.selectedTab.get() === 'myTab'}
            onPress={() => this.selectedTab.set('myTab')}>
            {this.renderContent(this.bottomList.name)}
          </TabBar.Item>
          <TabBar.Item
            title={'tea'}
            icon={globalImages.module_common_ic_error}
            selected={this.selectedTab.get() === 'teaTab'}
            onPress={() => this.selectedTab.set('teaTab')}>
            {
              <View style={styles.container}>
                <ListView
                  style={{ height: 300 }}
                  dataSource={this.state.dataSource}
                  renderSectionHeader={(sectionData, sectionID) => (
                    <Text>
                      {sectionID}:{sectionData}
                    </Text>
                  )}
                  renderRow={this.row}
                />
              </View>
            }
          </TabBar.Item>
        </TabBar>
      </View>
    );
  }

  loadData = () => {
    DemoApi.getNav().then(res => {
      this.bottomList.setIndex(res.index);
    });
  };

  row = (rowID: any) => {
    return (
      <View>
        <Text>{rowID}</Text>
      </View>
    );
  };

  renderContent(tab: string) {
    return (
      <View style={styles.container}>
        <Text>{tab}</Text>
        <PaginationComponent />
        {/* <SegmentedComponent /> */}
        <Button type={'warning'}>警告</Button>
        <Checkbox
          checked={true}
          style={{ color: 'red' }}
          // disabled
          onChange={() => {
            console.log('ede');
          }}>
          CCCCCWSD
        </Checkbox>
        <List renderHeader={'基本'}>
          <InputItem
            extra="元"
            placeholder="请输入"
            placeholderTextColor="#ccc"
            clear
            error>
            输入框
          </InputItem>
          <InputItem
            defaultValue=""
            clear
            placeholder="自动获取光标"
            autoFocus={true}
            labelNumber={6}>
            自动获取焦点
          </InputItem>
          <InputItem clear type="bankCard">
            银行卡
          </InputItem>
          <InputItem
            clear
            type="phone"
            value={this.state.phone}
            onChange={this.onChange}>
            电话
          </InputItem>
          <List.Item
            extra={
              <Switch
                checked={this.state.checked}
                onChange={this.onSwitchChange}
              />
            }>
            滑动开关
          </List.Item>
          <List.Item>21314123</List.Item>
          <List.Item
            // style={{ width: '80%' }}
            extra={
              <Stepper
                key="0"
                max={10}
                min={1}
                defaultValue={3}
                readOnly={false}
                onChange={() => {}}
                style={{
                  width: '100%',
                  minWidth: '100px',
                  backgroundColor: 'red',
                }}
              />
            }>
            readOnly: true
          </List.Item>
        </List>
        {/* <PickerView
          onChange={value => {
            this.setState({
              value,
            });
          }}
          value={this.state.value}
          data={seasons}
          cascade={false}
        /> */}
        <Switch checked={this.state.checked} onChange={this.onSwitchChange} />

        <Radio
          checked={this.state.part1Value === 1}
          onChange={event => {
            if (event.target.checked) {
              this.setState({ part1Value: 1 });
            }
          }}
          style={{}}>
          12312366
        </Radio>
        <Radio
          checked={this.state.part1Value === 2}
          onChange={event => {
            if (event.target.checked) {
              this.setState({ part1Value: 2 });
            }
          }}
          style={{ alignSelf: 'flex-end' }}>
          45645666
        </Radio>
        <SearchBar
          value={this.state.value}
          placeholder="搜索"
          onSubmit={value => alert(value)}
          // onCancel={this.clear}
          // onChange={this.onChange}
          showCancelButton
        />
        <TextareaItem
          rows={4}
          placeholder="高度自适应"
          autoHeight
          style={{ paddingVertical: 5 }}
        />
        <Badge text="new">
          <View
            style={{
              width: 52,
              height: 52,
              backgroundColor: 'rgba(255, 140, 101, 0.15)',
            }}
          />
        </Badge>
        <Card>
          <Card.Header
            title="This is title"
            thumbStyle={{ width: 30, height: 30 }}
            thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
            extra="this is extra"
          />
          <Card.Body>
            <View style={{ height: 42 }}>
              <Text style={{ marginLeft: 16 }}>Card Content</Text>
            </View>
          </Card.Body>
          <Card.Footer content="footer content" extra="footer extra content" />
        </Card>
        {/* <Grid
          data={}
          columnNum={3}
          isCarousel
          onPress={(_el, index) => alert(index)}
        /> */}
      </View>
    );
  }

  onChange = (value: string) => {
    this.setState({
      phone: value,
    });
  };
  onSwitchChange = (value: boolean) => {
    this.setState({
      checked: value,
    });
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerHorizontal: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
  },
  wrapper: {
    backgroundColor: '#fff',
  },
});

export const TabBarScreenContainer = observer(TabBarScreen);
