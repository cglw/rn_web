import React, { useRef, useState } from 'react';
import { DropdownMenu } from '@/module/module_common/component/menu/DropdownMenu';
import { MenuTabView } from '@/module/module_common/component/menu/MenuTab';
import { SingleListContent } from '@/module/module_common/component/menu/content/SingleListContent';
import { DoubleListContent } from '@/module/module_common/component/menu/content/DoubleListContent';
import { MultiAttrListContent } from '@/module/module_common/component/menu/content/MultiAttrListContent';
import { SortContent } from '@/module/module_common/component/menu/content/SortContent';

export type MenuData<T> = {
  tabType: 'single' | 'double' | 'multi' | 'sort';
  title: string;
  list?: any;
  selectInfo: T;
};
//注册的字典
const registerTabMap = {
  single: SingleListContent,
  double: DoubleListContent,
  multi: MultiAttrListContent,
  sort: SortContent,
};
export type MenuDataProps = {
  data: MenuData<any>[];
  onSelectCallBack: (selectedInfo: any) => void;
};

export const DropdownMenuWrapper: React.FC<MenuDataProps> = props => {
  const menuView = useRef<any>();
  const data: MenuData<any>[] = props.data;
  const contentMap = useRef<any>({});
  const [positions] = useState(
    data.map(item => getContentCreateInstance(item).contentPosition()),
  );
  function updateSelectInfo() {
    return data.map((item, index) => getSelectText(index));
  }
  const [selectVal, setSelectVal] = useState(updateSelectInfo());
  function selectCallBack() {
    setSelectVal(updateSelectInfo());
    props?.onSelectCallBack(data.map(item => item.selectInfo));
  }
  function getContentCreateInstance(menuData: MenuData<any>) {
    let tabType = menuData.tabType;
    let res = contentMap.current[tabType]
      ? contentMap.current[tabType]
      : new registerTabMap[tabType]();
    contentMap.current[tabType] = res;
    return res;
  }

  function renderContentViewWithFilter(
    index: number,
    filter: boolean = true,
  ): any {
    let contentCreate = getContentCreateInstance(data[index]);
    if (data[index].selectInfo === undefined) {
      contentCreate.init(data[index]);
    }
    if (filter && contentCreate.isSort()) {
      return null;
    }
    return contentCreate.createView(data[index], () => {
      menuView.current.openOrClosePanel(index);
      selectCallBack();
    });
  }
  function renderContentView(index: number): any {
    return renderContentViewWithFilter(index, true);
  }
  function getSelectText(index: number): string {
    return getContentCreateInstance(data[index]).selectText(data[index]);
  }
  return (
    <DropdownMenu
      contentPositions={positions}
      ref={ref => (menuView.current = ref)}
      tabs={data.map(item => item.title)}
      renderTab={(index, isChecked, text) => (
        <MenuTabView
          isSort={getContentCreateInstance(data[index]).isSort()}
          sortStatus={data[index].selectInfo}
          selectedValue={selectVal[index]}
          isChecked={isChecked}
          text={text}
        />
      )}
      renderContent={renderContentView}
      onTabPressCallBack={index => {
        if (getContentCreateInstance(data[index]).isSort()) {
          renderContentViewWithFilter(index, false);
        }
      }}
    />
  );
};
