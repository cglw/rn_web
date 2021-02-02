import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ImageSourcePropType,
} from 'react-native';
import { NumOfPeopleComponent } from './ClassPack/NumOfPeopleComponent';
import { SignComponent } from './ClassPack/SignComponent';
import { PriceComponent } from './ClassPack/PriceComponent';
import { BadgeComponent } from './ClassPack/BadgeComponent';

type Props = {
  img: ImageSourcePropType;
  title?: string;
  originalPrice?: number;
  presentPrice?: number;
  numOfPeople?: number;
  classClick?: any;
};

export class ClassPackComponent extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      // <TouchableOpacity
      //   activeOpacity={0.5}
      //   onPress={() => {
      //     this.props.classClick();
      //   }}>
      <View style={styles.container}>
        <View>
          <SignComponent value={'点播课ke'} />
          <Image
            style={{
              width: 109,
              height: 64,
              borderRadius: 4,
            }}
            source={this.props.img}
          />
        </View>
        <View style={styles.info}>
          <Text numberOfLines={2} style={styles.title}>
            <BadgeComponent />
            {this.props.title}
          </Text>
          <View>
            {this.props.originalPrice === undefined ? (
              <Text />
            ) : (
              <PriceComponent
                price={this.props.originalPrice}
                priceType={'original'}
              />
            )}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
              }}>
              {this.props.numOfPeople === undefined ? (
                <NumOfPeopleComponent numOfPeople={0} />
              ) : (
                <NumOfPeopleComponent numOfPeople={this.props.numOfPeople} />
              )}
              {this.props.presentPrice === undefined ? null : (
                <PriceComponent
                  price={this.props.presentPrice}
                  priceType={'present'}
                />
              )}
            </View>
          </View>
        </View>
      </View>
      // </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  info: {
    flex: 1,
    height: 73,
    marginLeft: 18,
    justifyContent: 'space-between',
  },
  title: {
    height: 44,
    fontSize: 16,
    fontWeight: '700',
  },
});
