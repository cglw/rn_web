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
          <Text style={styles.title} numberOfLines={1}>
            {this.props.title}
          </Text>
          <View>
            <Text style={styles.name}>
              {this.props.name}

              {this.props.state ? (
                <Text style={styles.liveSign}>
                  <Image
                    source={globalImages.module_main_m}
                    style={styles.small}
                  />
                  {' 直播中'}
                </Text>
              ) : null}
            </Text>
            <Text style={styles.start}>{this.props.time}开始直播</Text>
          </View>
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
    justifyContent: 'space-between',
  },
  infoCon: {
    height: 104,
    paddingTop: 14,
    paddingBottom: 14,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 13,
    color: '#333333',
    justifyContent: 'center',
  },
  liveSign: {
    height: 16,
    backgroundColor: '#FBC712',
    borderRadius: 100,
    textAlign: 'center',
    color: 'white',
    fontSize: 11,
    paddingLeft: 7,
    paddingRight: 9,
    paddingTop: 1,
    paddingBottom: 1,
    marginLeft: 5,
  },
  small: {
    width: 9,
    height: 9,
  },
  start: {
    color: '#999999',
    marginTop: 4.5,
  },
  title: {
    width: 150,
    fontSize: 15,
    fontWeight: '600',
    // marginBottom: 19.5,
    // overflow: 'hidden',
  },
  images: {
    width: 104,
    height: 104,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
});
