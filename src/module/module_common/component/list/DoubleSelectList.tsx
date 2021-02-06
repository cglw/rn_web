import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, { useRef, useState } from 'react';

const ITEM_HEIGHT = 44;
const MAX_HEIGHT = 425;

export class CheckedInfo {
  leftIndex: number;
  rightIndex: number;

  constructor(leftIndex: number = -1, rightIndex: number = -1) {
    this.leftIndex = leftIndex;
    this.rightIndex = rightIndex;
  }

  isCheck(leftIndex: number, rightIndex: number) {
    return this.leftIndex === leftIndex && this.rightIndex === rightIndex;
  }
}

type Props = {
  listData: any;
  onClickRightItem: (checkedInfo: CheckedInfo) => void;
  onClickLeftItem?: (index: number) => void;
  checkLeftIndex: number;
  checkRightIndex: number;
};

/**
 * leftIndex 记录正在切换的  checkLeftIndex 记录以及选中的这个跟右边选中有关，这时候可以切换子
 * @param props
 * @constructor
 */
export const DoubleSelectList: React.FC<Props> = props => {
  const checkedInfoRef = useRef(
    new CheckedInfo(props.checkLeftIndex, props.checkRightIndex),
  );
  const [leftIndex, setLeftIndex] = useState(checkedInfoRef.current.leftIndex);
  const [rightIndex, setRightIndex] = useState(
    checkedInfoRef.current.rightIndex,
  );

  const realItemHeight = props.listData.length * ITEM_HEIGHT;
  const emptyItemHeight =
    realItemHeight >= MAX_HEIGHT
      ? 0
      : Math.max(ITEM_HEIGHT, MAX_HEIGHT - realItemHeight);

  function isOver(index: number) {
    return index === props.listData.length;
  }

  function _renderLeft(item: any, index: number): any {
    let color =
      leftIndex === index ? globalColors.mainColor : globalColors.titleColor;
    const viewContainerStyle = createStyle({
      height: isOver(index) ? emptyItemHeight : ITEM_HEIGHT,
      backgroundColor: leftIndex === index ? 'white' : '#f7f7f7',
      borderBottomRightRadius: index === leftIndex - 1 ? 10 : 0,
      borderTopRightRadius: index === leftIndex + 1 ? 10 : 0,
    });
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          //过滤掉没用的
          if (isOver(index)) {
            return;
          }
          setLeftIndex(index);
          props.onClickLeftItem && props.onClickLeftItem(index);
        }}>
        <View style={[styles.left_item_container, viewContainerStyle]}>
          <Text style={{ ...styles.text, color }}>{item.text}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  function _renderRight(item: any, index: number) {
    console.info('renderRight');
    let color =
      leftIndex === checkedInfoRef.current.leftIndex && rightIndex === index
        ? globalColors.mainColor
        : globalColors.titleColor;
    return (
      <TouchableOpacity
        onPress={() => {
          checkedInfoRef.current.leftIndex = leftIndex;
          checkedInfoRef.current.rightIndex = index;
          setRightIndex(index);
          props.onClickRightItem(checkedInfoRef.current);
        }}>
        <View style={styles.right_item_container}>
          <Text style={{ ...styles.text, color }}>{item.text}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList<any>
        showsVerticalScrollIndicator={false}
        //数据1 为了占位
        data={[...props.listData, 1]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => _renderLeft(item, index)}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        style={styles.right_container}
        data={props.listData[leftIndex < 0 ? 0 : leftIndex].children}
        renderItem={({ item, index }) => _renderRight(item, index)}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    overflow: 'hidden',
    flexDirection: 'row',
    height: MAX_HEIGHT,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  right_container: { flex: 1 },
  left_item_container: {
    flexDirection: 'row',
    paddingStart: 18,
    alignItems: 'center',
  },
  right_item_container: {
    paddingStart: 18,
    alignItems: 'center',
    justifyContent: 'center',
    height: ITEM_HEIGHT,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 14,
  },
});
