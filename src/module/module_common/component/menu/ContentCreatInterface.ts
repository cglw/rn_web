import { MenuData } from '@/module/module_common/component/menu/DropdownMenuWrapper';

export interface ContentCreatInterface<T> {
  /**
   * 初始化一些信息，比如可以初始化选中为空的信息
   * @param data
   */
  init(data: MenuData<T>): void;

  /**
   * 创建内容view
   * @param data
   * @param onSelectCallBack
   */
  createView(data: MenuData<T>, onSelectCallBack: () => void): any;

  /**
   * 设置什么情况下为选中,为了告诉menuTab 什么时候选中
   * @param data
   */
  selectText(data: MenuData<T>): string;

  /**
   * 内容view所在的位置
   */
  contentPosition(): string;

  isSort(): boolean;
}
