import * as React from 'react';
import { NavigationContainerRef } from '@react-navigation/native';

export const rootNavigationRef = React.createRef<NavigationContainerRef<any>>();
export const isRootNavigationReady = React.createRef<boolean>();

// USE THIS AS A LAST RESORT!
// useful to navigate from outside the navigation container
// used to open notification detail
export function navigateRoot(name: string, params: any) {
    rootNavigationRef.current?.navigate(name, params);
}
