import { MenuData } from '@/module/module_common/component/menu/DropdownMenuWrapper';
import React from 'react';
import { MultiAttrSelectList } from '@/module/module_common/component/list/MultiAttrSelectList';
import { ContentCreatInterface } from '@/module/module_common/component/menu/ContentCreatInterface';

export class MultiAttrListContent implements ContentCreatInterface<number[]> {
  createView(data: MenuData<number[]>, onSelectCallBack: () => void): any {
    return (
      <MultiAttrSelectList
        data={data.list}
        contentWidth={300}
        onResetCallBack={() => {
          data.selectInfo = [];
          onSelectCallBack();
        }}
        onConfirmCallBack={selects => {
          data.selectInfo = selects;
          onSelectCallBack();
        }}
        selectIndex={data.selectInfo}
      />
    );
  }

  selectText(data: MenuData<number[]>): string {
    return data.selectInfo.length > 0 && data.selectInfo[0] > -1
      ? 'filter'.itn()
      : '';
  }

  init(data: MenuData<number[]>): void {
    data.selectInfo = [];
  }

  contentPosition(): string {
    return 'right';
  }

  isSort(): boolean {
    return false;
  }
}
