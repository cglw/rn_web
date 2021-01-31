import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Badge, Carousel, Banner } from '@design';
// import BasicCarouselExample from '@ant-design/react-native/es/carousel/demo/basic';
// import { AntDesignTestScreen } from './AntDesignTestScreen';
// import ViewPager from '@react-native-community/viewpager';

type State = {
  tabIndex: number;
};
export class DemoBannerScreen extends Component<{}, State> {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      tabIndex: 0,
    };
  }

  getStyle(index: number) {
    console.info(index);
    return styles.containerHorizontalSelect;
  }
  render() {
    // let style = styles.containerHorizontal;
    return wrapWithSafe(
      <View
        style={{
          flex: 1,
          // 'background-image': 'linear-gradient(-90deg, red, yellow)',
        }}>
        <View style={{ backgroundColor: 'red', width: 100, height: 100 }}>
          <View style={{ backgroundColor: 'blue', width: 200, height: 100 }} />
        </View>

        <Badge text={'3'} />
        <Text>6666</Text>
        <Banner
          autoplayInterval={5000}
          dotActiveStyle={{
            backgroundColor: 'red',
            width: 20,
            height: 6,
            borderRadius: 6,
          }}
          style={{ height: 200 }}
          infinite={true}>
          <View style={[this.getStyle(0), { backgroundColor: 'red' }]}>
            <Text>Carousel 1</Text>
          </View>
          <View style={[this.getStyle(1), { backgroundColor: 'blue' }]}>
            <Text>Carousel 2</Text>
          </View>
          <View style={[this.getStyle(2), { backgroundColor: 'yellow' }]}>
            <Text>Carousel 3</Text>
          </View>
          <View style={[this.getStyle(3), { backgroundColor: 'aqua' }]}>
            <Text>Carousel 4</Text>
          </View>
          <View style={[this.getStyle(4), { backgroundColor: 'fuchsia' }]}>
            <Text>Carousel 5</Text>
          </View>
        </Banner>

        <Banner
          autoplayInterval={5000}
          dotActiveStyle={{
            backgroundColor: 'red',
            width: 20,
            height: 6,
            borderRadius: 6,
          }}
          style={{ height: 200 }}
          infinite={true}
          bannerImages={[
            {
              uri:
                'http://attachments.gfan.net.cn/forum/attachments2/201402/05/211339r5eizavo2g5efuar.jpg.thumb.jpg',
            },
            {
              uri:
                'http://attachments.gfan.net.cn/forum/attachments2/201402/05/211342pkd8axiibj5axizi.jpg.thumb.jpg',
            },
            {
              uri:
                'http://attachments.gfan.net.cn/forum/attachments2/201402/05/2113441e4dw5zvv49jkdow.jpg.thumb.jpg',
            },
          ]}
          onPress={(index: number) => alert('you pressed index is : ' + index)}
        />
      </View>,
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    // backgroundColor: 'red',
    width: '100%',
    height: 250,
  },
  viewPager: {
    flex: 1,
  },
  containerHorizontal: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  containerHorizontalSelect: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: '100%',
  },
});
