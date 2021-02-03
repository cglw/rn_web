import { ImageSourcePropType } from 'react-native';

export class ClassPackBean {
  img: ImageSourcePropType = require('');
  title?: string = '';
  originalPrice?: number;
  presentPrice?: number;
  numOfEnrolment?: number = 0;
}

export class PriceBean {
  originalPrice?: number;
  presentPrice?: number;
}
