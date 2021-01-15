import './extensions/index';
import './res/index';
import './i18n/i18n';
import { RouterManager } from '../../sdk/router/RouterManager';
import { RootStore } from './store/RootStore';
globalService = {};
globalRouter = RouterManager.getInstance();
globalStore = new RootStore();
globalStore.start();
