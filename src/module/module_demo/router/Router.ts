import { DemoScreen } from '../screen/DemoScreen';
import { DatePickerScreen } from '../screen/DatePickerScreen';
import { DropdownMenuDemo } from '@/module/module_demo/screen/DropdownMenuDemo';
import { ListDemoScreen } from '@/module/module_demo/screen/ListDemoScreen';
import { SimpleListDemoScreen } from '@/module/module_demo/screen/SimpleListDemoScreen';
import { SectionListDemoScreen } from '@/module/module_demo/screen/SectionListDemoScreen';
import { LoadStateDemoScreenContainer } from '@/module/module_demo/screen/LoadStateDemoScreen';
import { ListScreen } from '@/module/module_demo/screen/ListScreen';
export default {
  demos: {
    screen: DemoScreen,
    path: 'demos',
    title: '',
  },
  datePicker: {
    screen: DatePickerScreen,
    path: 'datePicker',
  },
  dropdown: {
    screen: DropdownMenuDemo,
    path: 'dropdown',
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
  list: {
    screen: ListScreen,
    path: 'list',
    title: '列表',
  },
};
