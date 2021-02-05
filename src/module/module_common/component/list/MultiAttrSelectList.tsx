import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';
import React, { useState } from 'react';

type ActionProps<T> = {
  onResetCallBack: () => void;
  onConfirmCallBack: (data: T) => void;
};
type CommonProps = {
  data: any;
  itemLeftRightMargin?: number;
  itemSpace?: number;
  columns?: number;
  itemTopMargin?: number;
  contentWidth?: number;
};

type ChildProps = {
  parentIndex?: number;
  checkIndex: number;
  onItemSelect: (index: number) => void;
};

type CheckProps = {
  selectIndex: Array<number>;
};
const BottomView: React.FC<ActionProps<any>> = props => {
  return (
    <View style={styles.bottom}>
      <TouchableOpacity
        onPress={props?.onResetCallBack}
        activeOpacity={1}
        style={styles.reset_touch}>
        <View>
          <Text style={styles.reset_text}>{'reset'.itn()}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={props?.onConfirmCallBack}
        activeOpacity={1}
        style={styles.confirm_touch}>
        <View>
          <Text style={styles.confirm_text}>{'confirm'.itn()}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const ChildItem: React.FC<CommonProps & ChildProps> = props => {
  let [checkIndex, setCheckIndex] = useState(props.checkIndex);

  const {
    contentWidth = 0,
    itemLeftRightMargin = 0,
    itemSpace = 0,
    columns = 0,
    parentIndex = 0,
    itemTopMargin = 0,
  } = props;

  console.info(parentIndex);
  const itemWidth =
    (contentWidth - 2 * itemLeftRightMargin - itemSpace * (columns - 1)) /
    columns;
  const container = createStyle({
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: itemLeftRightMargin,
    marginRight: itemLeftRightMargin,
  });
  return (
    <View style={container}>
      {props.data.map((item: any, index: number) => {
        let isCheck = checkIndex === index;
        return (
          <TouchableOpacity
            key={index}
            activeOpacity={1}
            onPress={() => {
              console.info('render=>');
              const checkIndex = isCheck ? -1 : index;
              setCheckIndex(checkIndex);
              props.onItemSelect(checkIndex);
            }}>
            <View
              style={[
                styles.attr_item,
                createStyle({
                  width: itemWidth,
                  marginTop: itemTopMargin,
                  marginLeft: index % columns > 0 ? props.itemSpace : 0,
                  backgroundColor: isCheck ? 'red' : 'grey',
                }),
              ]}>
              <Text style={styles.text}>{item.text}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export const MultiAttrSelectList: React.FC<
  ActionProps<Array<number>> & CommonProps & CheckProps
> = props => {
  console.info('render');

  let containerStyle = createStyle({
    height: '100%',
    width: props.contentWidth,
  });
  let selectIndexArray: Array<number>;
  if (props.selectIndex && props.selectIndex.length === props.data.length) {
    selectIndexArray = props.selectIndex;
  } else {
    selectIndexArray = new Array(props.data.length).fill(-1);
  }
  console.info('selectIndexArray');
  console.info(selectIndexArray);
  return (
    <View style={containerStyle}>
      <FlatList
        style={styles.list}
        keyExtractor={(item, index) => index.toString()}
        data={props.data}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        renderItem={({ item, index }) => (
          <View>
            <Text style={styles.title}>{item.text}</Text>
            <ChildItem
              {...props}
              checkIndex={
                selectIndexArray[index] === undefined
                  ? -1
                  : selectIndexArray[index]
              }
              onItemSelect={itemIndex => {
                selectIndexArray[index] = itemIndex;
                console.info('selectIndexArray===>');
                console.info(selectIndexArray);
              }}
              parentIndex={index}
              data={props.data[index].children}
            />
          </View>
        )}
      />
      <View style={styles.bottom_line} />
      <BottomView
        onResetCallBack={props.onResetCallBack}
        onConfirmCallBack={() => props.onConfirmCallBack(selectIndexArray)}
      />
    </View>
  );
};
MultiAttrSelectList.defaultProps = {
  contentWidth: 300,
  itemLeftRightMargin: 18,
  itemSpace: 6,
  columns: 2,
  itemTopMargin: 10,
};
const styles = StyleSheet.create({
  reset_text: {
    textAlign: 'center',
    color: globalColors.titleColor,
  },
  confirm_text: {
    textAlign: 'center',
    color: 'white',
  },
  reset_touch: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
    borderBottomLeftRadius: 10,
  },
  bottom: {
    flexDirection: 'row',
    height: 44,
  },
  confirm_touch: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 10,
    flex: 1,
    backgroundColor: globalColors.mainColor,
  },
  bottom_line: {
    backgroundColor: '#e6e6e6',
    height: 1,
  },
  title: {
    marginLeft: 18,
    fontSize: 14,
    color: globalColors.supportColor,
  },
  attr_item: {
    borderRadius: 4,
    marginTop: 10,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 12,
    paddingBottom: 30,
  },
  sep: {
    height: 10,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 14,
  },
});
