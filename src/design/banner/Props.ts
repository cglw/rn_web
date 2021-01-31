import { ViewStyle } from 'react-native';

export interface Props {
  bannerImages?: Array<any>;
  infinite?: boolean;
  onPress?: (index: number) => void | undefined;
  autoplay?: boolean;
  dots?: boolean;
  style?: ViewStyle;
  dotStyle?: ViewStyle;
  dotActiveStyle?: ViewStyle;
  autoplayInterval?: number;
  children?: any;
}
