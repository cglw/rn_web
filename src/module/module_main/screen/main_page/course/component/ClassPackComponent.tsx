import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';
import { NumOfPeopleComponent } from './ClassPack/NumOfPeopleComponent';
import { OtoSignComponent } from './ClassPack/OtoSignComponent';
import { PriceComponent } from './ClassPack/PriceComponent';

type Props = {
  img: ImageSourcePropType;
  title: string;
  originalPrice: number;
  presentPrice: number;
  numOfPeople: number;
  classClick: any;
};

export class ClassPackComponent extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          this.props.classClick();
        }}>
        <View style={styles.container}>
          <View>
            <OtoSignComponent />
            <Image
              style={{
                width: 124,
                height: 83,
                borderRadius: 4,
              }}
              source={this.props.img}
            />
          </View>
          <View style={styles.info}>
            <Text numberOfLines={2} style={styles.title}>
              {this.props.title}
            </Text>
            <View>
              <PriceComponent
                price={this.props.originalPrice}
                priceType={'original'}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                }}>
                <NumOfPeopleComponent numOfPeople={this.props.numOfPeople} />
                <PriceComponent
                  price={this.props.presentPrice}
                  priceType={'present'}
                />
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // height: 115,
    backgroundColor: 'white',
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    paddingTop: 16,
    flexDirection: 'row',
  },
  info: {
    flex: 1,
    height: 83,
    marginLeft: 17,
  },
  title: {
    height: 44,
    fontSize: 16,
    fontWeight: '700',
  },
});
