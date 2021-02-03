export class SectionTitleBean {
  title: string = '';
  backgroundColor: string = 'white';
  hasMore: boolean = true;
}

export class OpenClassBean {
  title: string = '';
  anchorName: string = '';
  state: boolean = true;
  startTime: string = '';
  headPortrait: any = '';
}

export class InfomationBean {
  title?: string = '';
  time?: string = '';
  numOfVisitors: number = 0;
  picture?: string = '';
}
