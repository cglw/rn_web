import { MenuData } from '@/module/module_common/component/menu/DropdownMenuWrapper';
import { SingleSelectList } from '@/module/module_common/component/list/SingleSelectList';
import React from 'react';
import { ContentCreatInterface } from '@/module/module_common/component/menu/ContentCreatInterface';

export class SingleListContent implements ContentCreatInterface<number> {
  constructor() {}
  createView(data: MenuData<number>, onSelectCallBack: () => void): any {
    return (
      <SingleSelectList
        data={data.list}
        selectIndex={data.selectInfo}
        onItemClick={(itemIndex: number) => {
          data.selectInfo = itemIndex;
          onSelectCallBack && onSelectCallBack();
        }}
      />
    );
  }

  selectText(data: MenuData<number>): string {
    return data.selectInfo > -1 ? data.list[data.selectInfo] : '';
  }

  init(data: MenuData<number>): void {
    data.selectInfo = -1;
  }

  contentPosition(): string {
    return '';
  }

  isSort(): boolean {
    return false;
  }
}
