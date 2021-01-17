import React from 'react';
import { Image, Text } from 'react-native';
import { observer } from 'mobx-react';
import { autorun } from 'mobx';

export class CourseScreen extends React.Component {
  render() {
    return wrapWithSafe(
      <>
        <Text>课程</Text>
        {/*<Text>{globalStore.mainListStore.count}</Text>*/}
        <Text>{globalStore.mainListStore.total}</Text>
        <Text
          onPress={() => {
            console.info('change');
            globalStore.mainListStore.increment();
          }}>
          add
        </Text>
        <Image
          style={{ width: 100, height: 100 }}
          source={globalImages.module_login_course_ic_invalid2}
        />
      </>,
    );
  }
}
export const CourseScreenContainer = observer(CourseScreen);
