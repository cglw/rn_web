import { Text, View } from 'react-native';

import React from 'react';

type Props = {
  district: string;
  school: string;
  isChecked: boolean;
  test: string;
};

export class CampusComponent extends React.Component<Props> {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <View
        style={[
          {
            height: 44,
            justifyContent: 'center',
            borderWidth: 0.5,
            borderColor: '#E6E6E6',
            marginLeft: 15,
            marginRight: 15,
            borderRadius: 5,
            marginBottom: 12,
          },
        ]}>
        <Text
          style={{
            fontSize: 16,
            marginLeft: 12,
            lineHeight: 22.5,
            color: '#999999',
          }}>
          {`[${this.props.district}]`}
          <Text
            style={{
              fontSize: 16,
              lineHeight: 22.5,
              color: '#333333',
            }}>
            {this.props.school}
          </Text>
        </Text>

        <Text>{this.props.isChecked ? 'true' : 'false'}</Text>
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   bgColor: {
//     backgroundColor: '#FC5623',
//   },
// });
