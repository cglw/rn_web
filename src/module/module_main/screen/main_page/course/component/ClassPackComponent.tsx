import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { NumOfEnrolmentView } from './classpack/NumOfEnrolmentView';
import { SignView } from './classpack/SignView';
import { PriceView } from './classpack/PriceView';
import { ClassPackBean } from '@/module/module_main/bean/ClassPackBean';
// import { BadgeComponent } from '../../../component/BadgeComponent';

export const ClassPackComponent: React.FC<ClassPackBean> = (
  props: ClassPackBean,
) => {
  return (
    <View style={styles.container}>
      <View>
        <SignView value={'点播课ke'} />
        <Image
          style={{
            width: 109,
            height: 64,
            borderRadius: 4,
          }}
          source={props.img}
        />
      </View>
      <View style={styles.info_view}>
        <Text numberOfLines={2} style={styles.info_title}>
          {/* <BadgeComponent /> */}
          {props.title}
        </Text>
        <View>
          <PriceView originalPrice={props.originalPrice} />
          <View style={styles.info_bottom}>
            {props.numOfEnrolment === undefined ? (
              <NumOfEnrolmentView numOfPeople={0} />
            ) : (
              <NumOfEnrolmentView numOfPeople={props.numOfEnrolment} />
            )}
            <PriceView presentPrice={props.presentPrice} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  info_view: {
    flex: 1,
    height: 73,
    marginLeft: 18,
    justifyContent: 'space-between',
  },
  info_title: {
    height: 44,
    fontSize: 16,
    fontWeight: '700',
  },
  info_bottom: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
});
