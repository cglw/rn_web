import { ContentCreatInterface } from '@/module/module_common/component/menu/ContentCreatInterface';
import { SORT_STATUS } from '@/module/module_common/component/menu/MenuTab';
import { MenuData } from '@/module/module_common/component/menu/DropdownMenuWrapper';
export class SortContent implements ContentCreatInterface<SORT_STATUS> {
  contentPosition(): string {
    return '';
  }

  createView(data: MenuData<SORT_STATUS>, onSelectCallBack: () => void) {
    if (
      data.selectInfo === SORT_STATUS.INIT ||
      data.selectInfo === SORT_STATUS.UP
    ) {
      data.selectInfo = SORT_STATUS.DOWN;
    } else {
      data.selectInfo = SORT_STATUS.UP;
    }
    onSelectCallBack();
    return null;
  }

  init(data: MenuData<SORT_STATUS>): void {
    data.selectInfo = SORT_STATUS.INIT;
  }

  isSort(): boolean {
    return true;
  }

  selectText(data: MenuData<SORT_STATUS>): string {
    return data.selectInfo === SORT_STATUS.INIT ? '' : data.title;
  }
}
