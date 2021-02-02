import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { PriceComponent } from '../../course/component/ClassPack/PriceComponent';

type Props = {
  bookImg?: string;
  bookName?: string;
  author?: string;
  introduction: string;
  originalPrice: number;
  presentPrice: number;
};

export class BookComponent extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <Image source={{ uri: this.props.bookImg }} style={styles.book_img} />
        <View style={styles.book_info_content}>
          <Text style={styles.book_title}>{this.props.bookName}</Text>
          <Text style={styles.author_name}>作者: {this.props.author}</Text>
          <Text style={styles.book_introduction} numberOfLines={2}>
            {this.props.introduction}
          </Text>
          <View style={styles.book_price}>
            <PriceComponent
              price={this.props.presentPrice}
              priceType={'present'}
            />
            <PriceComponent
              price={this.props.originalPrice}
              priceType={'original'}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  book_img: {
    width: 85,
    height: 119,
    marginRight: 18,
  },
  book_title: {
    color: '#333',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 1,
  },
  author_name: {
    fontSize: 13,
    color: '#666666',
  },
  book_introduction: {
    fontSize: 13,
    color: '#999',
  },
  book_info_content: {
    width: 237,
    justifyContent: 'space-between',
  },
  book_price: {
    flexDirection: 'row',
    marginBottom: 5,
  },
});
