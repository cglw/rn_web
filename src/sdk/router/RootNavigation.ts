import React from 'react';
// @ts-ignore
import { NavigationContainerRef } from '@react-navigation/core';
class ReadyRefWrapper {
  isReady: boolean;
  constructor() {
    this.isReady = false;
  }
}

export const isReadyRef = new ReadyRefWrapper();

export const navigationRef = React.createRef<NavigationContainerRef>();

export function navigate(name: string, params: object) {
  if (isReadyRef.isReady && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.navigate(name, params);
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}
