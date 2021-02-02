import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  price: number;
  priceType: string;
};

export class PriceComponent extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    switch (this.props.priceType) {
      case 'original':
        return (
          <Text style={styles.old_price}>
            <View style={styles.midLine} />¥
            {(this.props.price / 100).toFixed(2)}
          </Text>
        );
      case 'present':
        return (
          <Text style={styles._price}>
            ¥
            <Text style={{ fontWeight: '700', fontSize: 16 }}>
              {(this.props.price / 100).toFixed(2).split('.')[0] + '.'}
            </Text>
            {(this.props.price / 100).toFixed(2).split('.')[1]}
          </Text>
        );
      default:
        return <Text style={styles._price}>免费</Text>;
    }
  }
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
  },
  old_price: {
    alignSelf: 'flex-end',
    color: '#999999',
    justifyContent: 'center',
    fontSize: 12,
  },
  _price: {
    color: '#FF2424',
    fontWeight: '700',
    fontSize: 12,
    alignSelf: 'flex-end',
  },
  midLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#999999',
    alignSelf: 'center',
    position: 'relative',
    top: 9,
  },
});
