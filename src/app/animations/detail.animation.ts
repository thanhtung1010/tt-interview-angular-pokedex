import { animate, state, style, transition, trigger } from "@angular/animations";

const detailEnterTransition = transition(':enter', [
  style({
    left: '0',
    transform: 'translate(-100%, -50%)',
  }),
  animate('.3s ease', style({
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }))
]);
export const detailFloatIn = trigger('detailFloatIn', [detailEnterTransition]);

const detailLeaveTransition = transition(':leave', [
  style({
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }),
  animate('.3s ease', style({
    left: '0',
    transform: 'translate(-100%, -50%)',
  }))
]);
export const detailFloatOut = trigger('detailFloatOut', [detailLeaveTransition]);

export const detailFloatInOut = trigger('detailFloatInOut', [
  state('open', style({
    transform: 'translate(0, 0)',
  })),
  state('close', style({
    transform: 'translate(-100%, -0)',
  })),
  transition('open => close', [animate('1s ease-in')]),
  transition('close => open', [animate('1s ease-out')]),
]);
