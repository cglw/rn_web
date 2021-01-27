import { TabBarScreenContainer } from './../screen/TabBarScreen';
import { DemoScreen } from '../screen/DemoScreen';
import { DatePickerScreen } from '../screen/DatePickerScreen';
// import { TabsScreen } from '../screen/TabsScreen';
export default {
  demos: {
    screen: DemoScreen,
    path: 'demos',
  },
  tabBar: {
    screen: TabBarScreenContainer,
    path: 'tabBar',
  },
  // tabs: {
  //   screen: TabsScreen,
  //   path: 'tabs',
  // },
  datePicker: {
    screen: DatePickerScreen,
    path: 'datePicker',
  },
};
