import React from 'react';
import { Image, Text } from 'react-native';
import { observer } from 'mobx-react';
import { ClassPackComponent } from './component/ClassPackComponent';
// import { autorun } from 'mobx';

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

        <ClassPackComponent
          img={globalImages.module_login_course_ic_invalid2}
          // img={{
          //   uri: 'http://127.0.0.1:9090/static/course_ic_invalid2.4a194.png',
          // }}
          title={
            '厦门校区的寒假七天教你吃透高考第一轮冲击班好的吼吼吼吼吼吼吼吼吼吼吼吼吼吼吼吼'
          }
          originalPrice={99890}
          presentPrice={9890}
          numOfPeople={17436}
          classClick={() => {
            // eslint-disable-next-line no-alert
            alert(111);
          }}
        />
      </>,
    );
  }
}
export const CourseScreenContainer = observer(CourseScreen);
