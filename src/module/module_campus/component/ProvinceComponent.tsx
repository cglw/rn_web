import { Text, View } from 'react-native';

import React from 'react';

type Props = {
  province: string;
};

export class ProvinceComponent extends React.Component<Props> {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <View
        style={{
          height: 44,
          backgroundColor: '#F7F7F7',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: 16,
            marginLeft: 15,
            lineHeight: 22.5,
            fontWeight: '600',
          }}>
          {this.props.province}
        </Text>
      </View>
    );
  }
}
