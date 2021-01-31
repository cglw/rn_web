export class Datums {
  channel_info: Channelinfo = new Channelinfo();
  list: Array<List> = [];
}

export class List {
  id?: number;
  name?: string;
  pack_num?: number;
  sales_base?: number;
  sales_num?: number;
  is_recommend?: number;
  sale_price?: number;
  cover_img?: string;
  original_price?: number;
  type?: number;
  sign_type?: number;
  sign_start_time?: number;
  sign_end_time?: number;
  dispatch_type?: number;
  dispatch_start_time?: number;
  dispatch_end_time?: number;
  title?: string;
  price?: number;
  course_type?: number;
  course_classify_id?: number;
  start_play_date?: number;
  end_play_date?: number;
  underlined_price?: number;
  total_periods?: number;
  marketing_language?: string;
  discount?: string;
  is_show_discount?: number;
  is_discount?: number;
  has_buy?: number;
  is_vip?: number;
  is_has_coupon?: number;
  teachers_list?: Teacherslist[];
  is_join_spell?: number;
  teacher_id?: number;
  teacher_name?: string;
  teacher_avatar?: string;
  photo?: string;
  introduction?: string;
  is_oto_teacher?: number;
  level_name?: string;
}

export class Teacherslist {
  id: number = 0;
  teacher_avatar: string = '';
  teacher_name: string = '';
  course_basis_id: number = 0;
  marketing_language: string = '';
}

export class Channelinfo {
  id: number = 0;
  name: string = '';
  type: number = 0;
  sort: number = 0;
  key: string = '';
  show_more: number = 0;
  show_more_url: number = 0;
}
