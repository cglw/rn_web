import { Pagination, WhiteSpace } from '@ant-design/react-native';
import React from 'react';
import { View } from 'react-native';

type Props = {};

export class PaginationComponent extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <View>
        <Pagination
          total={5}
          current={1}
          locale={locale}
          style={{ backgroundColor: 'red' }}
        />
        <WhiteSpace size="lg" />
        <Pagination mode="pointer" total={5} current={5} locale={locale} />
      </View>
    );
  }
}

const locale = {
  prevText: '上一步',
  nextText: '下一步',
};
