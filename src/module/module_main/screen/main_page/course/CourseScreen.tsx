import React from 'react';
import { Image, Text } from 'react-native';

export class CourseScreen extends React.Component {
  render() {
    return (
      <>
        <Text>课程</Text>
        <Image
          style={{ width: 100, height: 100 }}
          source={globalImages.module_login_course_ic_invalid2}
        />
      </>
    );
  }
}
