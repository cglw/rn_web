// @flow
'use strict';

import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
type Props = {
  isNetError: boolean;
  errorText: string;
  onPress: () => void;
};

export default class ErrorView extends React.Component<Props> {
  static defaultProps = {
    isNetError: true,
    errorText: '',
    onPress: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.img}
          source={globalImages.module_common_ic_error}
        />
        <Text style={styles.contentText}>
          {this.props.isNetError
            ? 'mobileNetError'.itn()
            : this.props.errorText}
        </Text>
        {this.props.isNetError ? (
          <Text style={styles.tipText}>{'checkNet'.itn()}</Text>
        ) : null}
        <TouchableOpacity
          onPress={() => {
            console.info('press');
            this.props?.onPress();
          }}>
          <View style={styles.reloadBtn}>
            <Text style={styles.reloadText}>
              {globalStore.accountStore.isLogin
                ? 'login'.itn()
                : 'reload'.itn()}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  img: {
    width: 118,
    height: 138,
  },
  contentText: {
    fontSize: 16,
    marginTop: 26,
    color: globalColors.supportColor,
  },
  tipText: {
    fontSize: 12,
    marginTop: 12,
    color: '#C4C4C4',
  },

  reloadBtn: {
    marginTop: 25,
    width: 130,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: globalColors.mainColor,
  },
  reloadText: {
    fontSize: 15,
    textAlign: 'center',
    color: 'white',
  },

  netWorkResultView: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  netWorkResultText: {
    fontSize: 12,
    textAlign: 'center',
    alignSelf: 'center',
    color: '#C4C4C4',
  },
});
