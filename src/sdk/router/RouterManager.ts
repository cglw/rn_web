import { NavigationContainerRef, StackActions } from '@react-navigation/native';
import { navigationRef } from './RootNavigation';

export class RouterManager {
  private static instance: RouterManager;
  private constructor() {}
  static getInstance() {
    if (!this.instance) {
      this.instance = new RouterManager();
    }
    return this.instance;
  }
  getNavigation(): NavigationContainerRef {
    return navigationRef.current;
  }
  push(name: string, params?: object | undefined) {
    this.getNavigation().dispatch(StackActions.push(name, params));
  }
  goBack() {
    if (this.getNavigation().canGoBack()) {
      this.getNavigation().goBack();
    }
  }
  canGoBack() {
    this.getNavigation().canGoBack();
  }
  replace(name: string, params?: object | undefined) {
    this.getNavigation().dispatch(StackActions.replace(name, params));
  }
  pop(count?: number) {
    this.getNavigation().dispatch(StackActions.pop(count));
  }
  popToTop() {
    this.getNavigation().dispatch(StackActions.popToTop());
  }
}
