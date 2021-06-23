import {trigger, style, animate, transition, state } from '@angular/animations';

const defaultStyles = {
  position: 'absolute',
  top: 0,
  width: '100%',
  height: '100%',
  zIndex: 600,
  overflowX: 'hidden',
}

export const routeTransitionAnimations = [
  trigger('stateTrigger', [
    state('mobileShow', style({
      ...defaultStyles,
      left: 0,
    })),
    transition('void => mobileShow', [
      style({
        ...defaultStyles,
        left: '100%',
      }),
      animate('.25s ease-in')
    ]),
    transition('mobileHide => mobileShow', [
      style({
        ...defaultStyles,
        left: '100%',
      }),
      animate('.25s ease-in')
    ]),
    state('mobileHide', style({
      ...defaultStyles,
      left: '100%',
    })),
    transition('mobileShow => mobileHide', [
      style({
        ...defaultStyles,
        left: 0,
      }),
      animate('.125s ease-out')
    ]),
  ])
];
