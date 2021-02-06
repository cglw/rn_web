import { MenuData } from '@/module/module_common/component/menu/DropdownMenuWrapper';
import React from 'react';
import {
  CheckedInfo,
  DoubleSelectList,
} from '@/module/module_common/component/list/DoubleSelectList';
import { ContentCreatInterface } from '@/module/module_common/component/menu/ContentCreatInterface';

export class DoubleListContent implements ContentCreatInterface<CheckedInfo> {
  createView(data: MenuData<CheckedInfo>, onSelectCallBack: () => void): any {
    return (
      <DoubleSelectList
        listData={data.list}
        onClickRightItem={checkedInfo => {
          data.selectInfo.leftIndex = checkedInfo.leftIndex;
          data.selectInfo.rightIndex = checkedInfo.rightIndex;
          onSelectCallBack();
        }}
        checkLeftIndex={data.selectInfo.leftIndex}
        checkRightIndex={data.selectInfo.rightIndex}
      />
    );
  }

  selectText(data: MenuData<CheckedInfo>): string {
    const selectInfo = data.selectInfo;
    return selectInfo.leftIndex > -1 && selectInfo.rightIndex > -1
      ? data.list[selectInfo.leftIndex].children[selectInfo.rightIndex].text
      : '';
  }

  init(data: MenuData<CheckedInfo>): void {
    data.selectInfo = new CheckedInfo();
  }

  contentPosition(): string {
    return '';
  }

  isSort(): boolean {
    return false;
  }
}
