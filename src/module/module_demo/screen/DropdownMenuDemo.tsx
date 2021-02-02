import { View, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { DropdownMenu } from '@/module/module_common/component/menu/DropdownMenu';
import { MenuTabView } from '@/module/module_common/component/menu/MenuTab';

type Props = {};

export class DropdownMenuDemo extends Component<Props, any> {
  render() {
    return wrapWithSafe(
      <View style={styles.container}>
        <DropdownMenu
          tabs={['test', 'test2']}
          renderTab={(index, isChecked, data) => (
            <MenuTabView isChecked={isChecked} text={data} />
          )}
          renderContent={(index: number) => {
            console.info(index);
            return index === 0 ? this.renderA() : this.renderB();
          }}
        />
      </View>,
    );
  }
  renderA() {
    return <View style={{ height: 200, backgroundColor: 'red' }} />;
  }
  renderB() {
    return <View style={{ height: 300, backgroundColor: 'blue' }} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
