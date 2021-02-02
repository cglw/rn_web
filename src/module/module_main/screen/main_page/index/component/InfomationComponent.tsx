import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

type Props = {
  title?: string;
  time?: string;
  numOfPeople: number;
  img?: string;
};

export class InfomationComponent extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{ justifyContent: 'space-between', marginRight: 18, flex: 1 }}>
          <Text style={styles.title} numberOfLines={2}>
            {this.props.title}
          </Text>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.text}>{this.props.time}</Text>
            <Text style={styles.text}>{this.props.numOfPeople}人浏览</Text>
          </View>
        </View>
        <Image source={{ uri: this.props.img }} style={styles.img} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: '#333',
    fontSize: 15,
    fontWeight: '600',
  },
  img: {
    width: 109,
    height: 72.5,
  },
  text: {
    color: '#999',
    fontSize: 12,
  },
});
