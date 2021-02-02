import React from 'react';
import { Image, Text, View } from 'react-native';
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
          // img={globalImages.module_login_course_ic_invalid2}
          img={{
            uri: 'http://127.0.0.1:9090/static/course_ic_invalid2.4a194.png',
          }}
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
        <View
          style={{
            flexDirection: 'row',
            height: 100,
            padding: 20,
          }}>
          <View style={{ backgroundColor: 'blue', flex: 0.3 }} />
          <View style={{ backgroundColor: 'red', flex: 0.5 }} />
          <Text>Hello World!</Text>
        </View>
        <View
          style={{
            height: 100,
            backgroundImage: 'linear-gradient(to right, #FF8552, #FF526F)',
          }}
        />
        <View
          style={{
            width: 0,
            height: 0,
            borderTopWidth: 70,
            borderLeftWidth: 60,
            borderTopColor: '#fff',
            borderLeftColor: 'red',
          }}
        />
      </>,
    );
  }
}
export const CourseScreenContainer = observer(CourseScreen);
