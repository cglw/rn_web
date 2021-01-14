import { MainScreen } from '../screen/MainScreen';
import { PersonScreen } from '../screen/main_page/my/PersonScreen';
import { IndexScreenContainer } from '../screen/main_page/index/IndexScreen';
import { OneToOneScreen } from '../screen/main_page/onetoone/OneToOneScreen';
import { PractiseScreen } from '../screen/main_page/practise/PractiseScreen';
import { CourseScreen } from '../screen/main_page/course/CourseScreen';

export default {
  home: {
    screen: MainScreen,
    path: 'home',
    screens: {
      Index: {
        path: 'index',
        screen: IndexScreenContainer,
      },
      Person: {
        path: 'person',
        screen: PersonScreen,
      },
      Course: {
        path: 'course',
        screen: CourseScreen,
      },
      Oto: {
        path: 'oto',
        screen: OneToOneScreen,
      },
      Practise: {
        path: 'practice',
        screen: PractiseScreen,
      },
    },
  },
};
