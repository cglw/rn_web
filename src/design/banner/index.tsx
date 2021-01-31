import { BetterBanner as Banner } from './BetterBanner';
import React from 'react';
import { Props } from '@/design/banner/Props';
const BannerImpl: React.FC<Props> = props => {
  const { infinite, autoplayInterval, autoplay, ...rest } = props;
  return (
    <Banner
      scrollInterval={autoplayInterval}
      isAutoScroll={autoplay}
      isSeamlessScroll={infinite}
      bannerComponents={props.children}
      {...rest}
    />
  );
};

export default BannerImpl;
