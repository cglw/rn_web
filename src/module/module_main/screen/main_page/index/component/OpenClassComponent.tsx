import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
type Props = {
  title: string;
  name: string;
  state: boolean;
  time: string;
  img: any;
};

export class OpenClassComponent extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.infoCon}>
          <Text style={styles.title}>{this.props.title}</Text>
          <Text style={styles.name}>
            {this.props.name}

            {this.props.state ? (
              <Text style={styles.liveSign}>
                <Image
                  source={globalImages.module_main_m}
                  style={styles.small}
                />
                直播中
              </Text>
            ) : null}
          </Text>
          <Text style={styles.start}>{this.props.time}开始直播</Text>
        </View>
        <Image source={this.props.img} style={styles.images} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 18,
    flexDirection: 'row',
    backgroundColor: 'white',
    width: 294,
    height: 104,
    borderRadius: 5,
  },
  infoCon: {
    width: 190,
    height: 104,
    paddingTop: 14,
    paddingBottom: 14,
  },
  name: {
    fontSize: 13,
  },
  liveSign: {
    width: 59,
    height: 16,
    backgroundColor: '#FBC712',
    borderRadius: 100,
    textAlign: 'center',
    color: 'white',
    fontSize: 11,
  },
  small: {
    width: 9,
    height: 9,
  },
  start: {
    color: '#999999',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 19.5,
  },
  images: {
    width: 104,
    height: 104,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
});
