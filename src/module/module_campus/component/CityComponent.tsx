import React from 'react';
import { Text } from 'react-native';

type Props = {
  city: string;
};

export class CityComponent extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <Text
        style={{
          marginLeft: 15,
          marginTop: 16,
          marginBottom: 12,
          color: '#333333',
          fontSize: 14,
          lineHeight: 17,
        }}>
        {this.props.city}
      </Text>
    );
  }
}
