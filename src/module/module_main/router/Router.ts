import { MainScreen } from '../screen/MainScreen';
import { PersonScreen } from '../screen/main_page/my/PersonScreen';
import { IndexScreenContainer } from '../screen/main_page/index/IndexScreen';
import { OneToOneScreen } from '../screen/main_page/onetoone/OneToOneScreen';
import { PractiseScreenContainer } from '../screen/main_page/practise/PractiseScreen';
import { CourseScreenContainer } from '../screen/main_page/course/CourseScreen';
import { ListDemoScreen } from '../screen/ListDemoScreen';
import { SimpleListDemoScreenContainer } from '../screen/SimpleListDemoScreen';
import { SectionListDemoScreen } from '../screen/SectionListDemoScreen';

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
        screen: CourseScreenContainer,
      },
      Oto: {
        path: 'oto',
        screen: OneToOneScreen,
      },
      Practise: {
        path: 'practice',
        screen: PractiseScreenContainer,
      },
    },
  },
  demo: {
    screen: ListDemoScreen,
    path: 'demo',
  },
  simple: {
    screen: SimpleListDemoScreenContainer,
    path: 'simple',
  },
  section: {
    screen: SectionListDemoScreen,
    path: 'section',
  },
};
