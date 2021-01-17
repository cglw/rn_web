import { MainListStore } from './store/MainListStore';
import './res/index';
import './service/TestServiceImpl';
// import { autorun } from 'mobx';
globalStore.mainListStore = new MainListStore();
//
// autorun(() => {
//   console.log('autorun');
//   console.log('Energy level:' + globalStore.mainListStore.count);
//   // console.log('Energy level:' + globalStore.accountStore.isLogin);
// // });
// autorun();
export {};
