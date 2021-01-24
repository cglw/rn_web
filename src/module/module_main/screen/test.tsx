interface RootObject {
  code: number;
  msg: string;
  data: Data;
}

interface Data {
  index: Index[];
  style: Style[];
}

interface Style {
  id: number;
  name: string;
  check: number;
  style_img: string;
}

interface Index {
  name: string;
  url: string;
  nav_img: string;
  nav_img_checked: string;
  is_outer: number;
  sort: number;
  type: number;
  status: number;
  id: number;
  key: string;
}
