export class Data {
  index: Array<Index> = [];
}

export class Index {
  name: string = '';
  url: string = '';
  nav_img: string = '';
  nav_img_checked: string = '';
  is_outer: number = 0;
  sort: number = 0;
  type: number = 0;
  status: number = 0;
  id: number = 0;
  key: string = '';
}

// export interface Index {
//   name: string;
//   url: string;
//   nav_img: string;
//   nav_img_checked: string;
//   is_outer: number;
//   sort: number;
//   type: number;
//   status: number;
//   id: number;
//   key: string;
// }
