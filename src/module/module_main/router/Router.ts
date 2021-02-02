import { MainScreenContainer } from '../screen/MainScreen';
import { PersonScreen } from '../screen/main_page/my/PersonScreen';
import { OneToOneScreen } from '../screen/main_page/onetoone/OneToOneScreen';
import { PractiseScreenContainer } from '../screen/main_page/practise/PractiseScreen';
import { CourseScreenContainer } from '../screen/main_page/course/CourseScreen';
import { IndexScreenContainer } from '@/module/module_main/screen/main_page/index/IndexScreen';

export default {
  home: {
    screen: MainScreenContainer,
    path: 'home',
    title: '主页',
    screens: {
      index: {
        path: 'index',
        screen: IndexScreenContainer,
      },
      person: {
        path: 'person',
        screen: PersonScreen,
      },
      course: {
        path: 'course',
        screen: CourseScreenContainer,
      },
      oto: {
        path: 'oto',
        screen: OneToOneScreen,
      },
      practise: {
        path: 'practice',
        screen: PractiseScreenContainer,
      },
    },
  },
};
