import { MainScreenContainer } from '../screen/MainScreen';
import { PersonScreen } from '../screen/main_page/my/PersonScreen';
import { IndexScreenContainer } from '../screen/main_page/index/IndexScreen';
import { OneToOneScreen } from '../screen/main_page/onetoone/OneToOneScreen';
import { PractiseScreenContainer } from '../screen/main_page/practise/PractiseScreen';
import { CourseScreenContainer } from '../screen/main_page/course/CourseScreen';
import { ListDemoScreen } from '../screen/ListDemoScreen';
import { SectionListDemoScreen } from '../screen/SectionListDemoScreen';
import { LoadStateDemoScreenContainer } from '../screen/LoadStateDemoScreen';
import { SimpleListDemoScreen } from '../screen/SimpleListDemoScreen';

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
  demo: {
    screen: ListDemoScreen,
    path: 'demo',
    title: 'Demo',
  },
  simple: {
    screen: SimpleListDemoScreen,
    path: 'simple',
    title: '简单列表',
  },
  section: {
    screen: SectionListDemoScreen,
    path: 'section',
    title: '多样式',
  },
  load: {
    screen: LoadStateDemoScreenContainer,
    path: 'load',
    title: '加载',
  },
};
