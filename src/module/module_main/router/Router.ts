import { MainScreen } from '../screen/MainScreen';
import { MyScreen } from '../screen/main_page/my/MyScreen';

export default {
  index: {
    screen: MainScreen,
    path: 'home',
    screens: {
      index: 'index',
      person: 'person',
      course: 'course',
      oto: 'oto',
      practice: 'practice',
    },
  },
  person: {
    screen: MyScreen,
    path: '/person',
  },
};
